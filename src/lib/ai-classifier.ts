import { ListingCategory, MaterialCondition, ListingUnit } from '@/types';

export interface ClassificationSuggestion {
  category: ListingCategory;
  materialName: string;
  suggestedTitle: string;
  suggestedDescription: string;
  suggestedCondition: MaterialCondition;
  suggestedUnit: ListingUnit;
  defaultPriceRange: { min: number; max: number };
  detectedFeatures: string[];
  confidence: number;
}

// Rule-based demonstration classifier mapping based on image characteristics / file name / user hints
export const PRESET_IMAGE_SAMPLES = [
  {
    label: 'PET Plastic Flakes',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    type: 'plastic_pet',
  },
  {
    label: 'Baled OCC Cardboard',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    type: 'cardboard',
  },
  {
    label: 'Aluminium Scrap Trims',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    type: 'aluminium',
  },
  {
    label: 'Heat-Treated Wooden Pallets',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    type: 'wood',
  },
  {
    label: 'Combed Cotton Textile Fabric',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    type: 'textile',
  },
  {
    label: 'Electrolytic Copper Wire',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    type: 'copper',
  },
];

export function classifyWasteImage(
  imageHint: string,
  fileName?: string
): ClassificationSuggestion {
  const query = `${imageHint} ${fileName || ''}`.toLowerCase();

  if (query.includes('cardboard') || query.includes('carton') || query.includes('kraft') || query.includes('occ')) {
    return {
      category: 'Cardboard',
      materialName: 'Corrugated Kraft Boxes (OCC 95/5)',
      suggestedTitle: 'Industrial Baled OCC Cardboard Boxes',
      suggestedDescription:
        'Mechanically baled post-industrial kraft corrugated containers. Low moisture content (< 12%), bundled with steel straps. Suitable for direct repulping and packaging mills.',
      suggestedCondition: 'Baled',
      suggestedUnit: 't',
      defaultPriceRange: { min: 11000, max: 14500 },
      detectedFeatures: ['Brown cellulose fiber', 'High-density baled layers', 'Low contamination index'],
      confidence: 0.94,
    };
  }

  if (query.includes('aluminium') || query.includes('aluminum') || query.includes('6063') || query.includes('profile')) {
    return {
      category: 'Metal',
      materialName: 'Aluminium 6063 Extrusion Scrap',
      suggestedTitle: 'Clean Mill-Finish Aluminium 6063 Scrap Offcuts',
      suggestedDescription:
        'Clean alloy extrusion scrap from architectural sections. Free from thermal break plastic, iron fasteners, or paint coatings. High metallurgical recovery rate > 92%.',
      suggestedCondition: 'Raw Scrap',
      suggestedUnit: 'kg',
      defaultPriceRange: { min: 145, max: 165 },
      detectedFeatures: ['Metallic luster', 'Extrusion profile geometry', 'Non-ferrous alloy signature'],
      confidence: 0.92,
    };
  }

  if (query.includes('copper') || query.includes('wire') || query.includes('berry') || query.includes('candy')) {
    return {
      category: 'Metal',
      materialName: 'Electrolytic Copper Wire Scrap (Berry Grade)',
      suggestedTitle: 'Bright Bare 99.9% Electrolytic Copper Wire Scrap',
      suggestedDescription:
        'High-conductivity electrical copper wire scrap stripped from coils and transformers. Free from varnish, oil, or tinning. 99.9% Cu content.',
      suggestedCondition: 'Processed / Sorted',
      suggestedUnit: 'kg',
      defaultPriceRange: { min: 640, max: 690 },
      detectedFeatures: ['High-luster reddish tone', 'Uniform wire gauge strands', 'Unalloyed copper trace'],
      confidence: 0.96,
    };
  }

  if (query.includes('pallet') || query.includes('wood') || query.includes('timber') || query.includes('plank')) {
    return {
      category: 'Wood',
      materialName: 'ISPM-15 Heat Treated Wooden Pallets',
      suggestedTitle: 'Heavy-Duty 4-Way Entry Wooden Euro Pallets (1200x1000mm)',
      suggestedDescription:
        'Standard warehouse grade wooden pallets. Heat treated and pest-free. All stringers and top boards intact. Tested load capacity 1,200 kg dynamic.',
      suggestedCondition: 'Processed / Sorted',
      suggestedUnit: 'pcs',
      defaultPriceRange: { min: 180, max: 220 },
      detectedFeatures: ['Planed timber slats', 'Standard pallet block configuration', 'Clean ISPM-15 mark'],
      confidence: 0.91,
    };
  }

  if (query.includes('textile') || query.includes('cotton') || query.includes('fabric') || query.includes('yarn')) {
    return {
      category: 'Textile',
      materialName: '100% Combed Cotton Clip Waste',
      suggestedTitle: 'Pure White & Pastel Combed Cotton Yarn Clips',
      suggestedDescription:
        'Garment export facility cuttings and selvage trims. Free of synthetic polyester blending or chemical sizing. Ideal for regenerated yarn and handmade paper production.',
      suggestedCondition: 'Baled',
      suggestedUnit: 'kg',
      defaultPriceRange: { min: 20, max: 28 },
      detectedFeatures: ['Fibrous textile weave', 'Light coloration', 'Zero synthetic polymer glint'],
      confidence: 0.89,
    };
  }

  // Default fallback to Plastic PET / polymer
  return {
    category: 'Plastic',
    materialName: 'Post-Industrial Hot-Washed PET Flakes',
    suggestedTitle: 'Clear Hot-Washed PET Flakes (High Intrinsic Viscosity)',
    suggestedDescription:
      'Industrial grade PET flakes washed and sorted from transparent bottles and pre-forms. Moisture content < 1.0%, PVC < 50 ppm. Ready for fiber spinning or sheet extrusion.',
    suggestedCondition: 'Granules / Shredded',
    suggestedUnit: 'kg',
    defaultPriceRange: { min: 35, max: 42 },
    detectedFeatures: ['Transparent polymer fragments', 'Flake geometry', 'Low color hue variability'],
    confidence: 0.95,
  };
}
