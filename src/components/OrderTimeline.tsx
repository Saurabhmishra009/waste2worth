'use client';

import React from 'react';
import { OrderStatus, OrderTrackingStep } from '@/types';
import { Check, Clock, Truck, PackageCheck, AlertCircle, CalendarClock, ShieldCheck } from 'lucide-react';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  trackingHistory?: OrderTrackingStep[];
}

const ORDER_STAGES: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'Pending', label: 'Requested', icon: Clock },
  { status: 'Negotiation', label: 'Agreed Rate', icon: Check },
  { status: 'Accepted', label: 'Confirmed', icon: ShieldCheck },
  { status: 'Pickup Scheduled', label: 'Pickup Ready', icon: CalendarClock },
  { status: 'In Transit', label: 'In Transit', icon: Truck },
  { status: 'Delivered', label: 'Delivered', icon: PackageCheck },
  { status: 'Completed', label: 'Completed', icon: Check },
];

export default function OrderTimeline({ currentStatus, trackingHistory }: OrderTimelineProps) {
  const isCancelled = currentStatus === 'Cancelled';

  const currentIndex = ORDER_STAGES.findIndex((s) => s.status === currentStatus);

  if (isCancelled) {
    return (
      <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-red-800 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
        <div>
          <p className="font-bold text-sm">Order Cancelled</p>
          <p className="text-xs text-red-700">This transaction was cancelled by mutual consent or supplier notification.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Horizontal timeline on desktop / wrap on mobile */}
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 w-full z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#10B981] transition-all duration-500 z-0"
          style={{
            width: `${Math.min(100, Math.max(0, (currentIndex / (ORDER_STAGES.length - 1)) * 100))}%`,
          }}
        />

        {ORDER_STAGES.map((stage, idx) => {
          const isPassed = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.status} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-[#14532D] text-white ring-4 ring-[#10B981]/30 scale-110 shadow-md'
                    : isPassed
                    ? 'bg-[#10B981] text-white'
                    : 'bg-white text-gray-400 border-2 border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1.5 font-medium text-center hidden md:block max-w-[80px] ${
                  isCurrent ? 'font-bold text-[#14532D]' : isPassed ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tracking logs */}
      {trackingHistory && trackingHistory.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Disaster-Proof Activity Log
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {trackingHistory.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-gray-900">{step.status}</strong>
                    <span className="text-[10px] text-gray-400">
                      {new Date(step.timestamp).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-0.5">{step.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
