import { Listing, ListingCategory, MaterialCondition, CompatibilityResult } from '@/types';

export interface BuyerRequirement {
  category: ListingCategory;
  targetQuantity: number;
  unit: string;
  maxBudgetPerUnit: number;
  preferredCity?: string;
  preferredCondition?: MaterialCondition;
}

// Nearby industrial clusters in NCR & Northern India region
const REGION_CLUSTERS: Record<string, string[]> = {
  Delhi: ['Delhi', 'Noida', 'Ghaziabad', 'Faridabad', 'Gurugram'],
  Noida: ['Noida', 'Delhi', 'Ghaziabad', 'Greater Noida', 'Faridabad'],
  Ghaziabad: ['Ghaziabad', 'Noida', 'Delhi', 'Meerut', 'Faridabad'],
  Faridabad: ['Faridabad', 'Delhi', 'Gurugram', 'Noida'],
  Kanpur: ['Kanpur', 'Lucknow', 'Unnao'],
  Lucknow: ['Lucknow', 'Kanpur', 'Barabanki'],
  Agra: ['Agra', 'Mathura', 'Firozabad', 'Aligarh'],
  Mathura: ['Mathura', 'Agra', 'Bharatpur', 'Palwal'],
};

export function calculateCompatibilityScore(
  listing: Listing,
  requirement: BuyerRequirement
): CompatibilityResult {
  let score = 0;
  const reasons: string[] = [];

  // 1. Material Category Match (Weight: 35 points)
  if (listing.category === requirement.category) {
    score += 35;
    reasons.push(`Exact category match: ${listing.category}`);
  } else {
    // If not matching category, compatibility is heavily penalized
    return {
      score: 10,
      matchingReasons: [`Category mismatch (Listing is ${listing.category}, needed ${requirement.category})`],
      listing,
    };
  }

  // 2. Quantity Availability (Weight: 25 points)
  if (listing.unit === requirement.unit) {
    if (listing.quantity >= requirement.targetQuantity) {
      score += 25;
      reasons.push(
        `Sufficient volume available (${listing.quantity.toLocaleString('en-IN')} ${listing.unit} exceeds requirement of ${requirement.targetQuantity.toLocaleString('en-IN')} ${requirement.unit})`
      );
    } else {
      const ratio = listing.quantity / requirement.targetQuantity;
      const partialPoints = Math.round(ratio * 20);
      score += partialPoints;
      reasons.push(
        `Partial volume available (${listing.quantity.toLocaleString('en-IN')} ${listing.unit} fulfills ${Math.round(ratio * 100)}% of requested volume)`
      );
    }
  } else {
    // Different unit comparison
    score += 10;
    reasons.push(`Compatible unit conversion: ${listing.quantity} ${listing.unit}`);
  }

  // 3. Price Alignment (Weight: 20 points)
  if (requirement.maxBudgetPerUnit > 0) {
    if (listing.pricePerUnit <= requirement.maxBudgetPerUnit) {
      score += 20;
      const savings = Math.round(
        ((requirement.maxBudgetPerUnit - listing.pricePerUnit) / requirement.maxBudgetPerUnit) * 100
      );
      if (savings > 0) {
        reasons.push(`Priced ${savings}% below your maximum budget (₹${listing.pricePerUnit}/${listing.unit})`);
      } else {
        reasons.push(`Price matches your exact target budget (₹${listing.pricePerUnit}/${listing.unit})`);
      }
    } else {
      const overpct = (listing.pricePerUnit - requirement.maxBudgetPerUnit) / requirement.maxBudgetPerUnit;
      if (overpct <= 0.15 && listing.negotiable) {
        score += 12;
        reasons.push(`Priced slightly above budget (₹${listing.pricePerUnit}), but seller marked price as negotiable`);
      } else if (overpct <= 0.25) {
        score += 6;
        reasons.push(`Price is ₹${listing.pricePerUnit}/${listing.unit} (${Math.round(overpct * 100)}% above budget limit)`);
      } else {
        reasons.push(`Price exceeds budget threshold significantly`);
      }
    }
  } else {
    score += 15;
    reasons.push(`Standard commercial quotation at ₹${listing.pricePerUnit}/${listing.unit}`);
  }

  // 4. Geographic Proximity (Weight: 10 points)
  if (requirement.preferredCity) {
    const pref = requirement.preferredCity.trim().toLowerCase();
    const lCity = listing.city.trim().toLowerCase();

    if (pref === lCity) {
      score += 10;
      reasons.push(`Direct city match in ${listing.city} (optimal transport costs)`);
    } else {
      const cluster = REGION_CLUSTERS[requirement.preferredCity] || [];
      const isCluster = cluster.some((c) => c.toLowerCase() === lCity);
      if (isCluster) {
        score += 7;
        reasons.push(`Nearby NCR/Regional logistics corridor (${listing.city} to ${requirement.preferredCity})`);
      } else {
        score += 3;
        reasons.push(`Inter-state transit required from ${listing.city}`);
      }
    }
  } else {
    score += 7;
    reasons.push(`Dispatched from verified hub in ${listing.city}`);
  }

  // 5. Material Condition & Verification Bonus (Weight: 10 points)
  if (requirement.preferredCondition) {
    if (listing.condition === requirement.preferredCondition) {
      score += 5;
      reasons.push(`Matches preferred condition: ${listing.condition}`);
    } else {
      score += 2;
    }
  } else {
    score += 5;
  }

  if (listing.sellerVerified) {
    score += 5;
    reasons.push(`Verified supplier with KYC and audited GST compliance`);
  }

  // Cap at 100
  score = Math.min(100, Math.max(0, score));

  return {
    score,
    matchingReasons: reasons,
    listing,
  };
}

export function findSmartMatches(
  requirement: BuyerRequirement,
  listings: Listing[]
): CompatibilityResult[] {
  return listings
    .filter((l) => l.status === 'active')
    .map((l) => calculateCompatibilityScore(l, requirement))
    .sort((a, b) => b.score - a.score);
}
