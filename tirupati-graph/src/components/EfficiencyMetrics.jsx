import React, { useMemo } from 'react';
import { Gauge, HeartHandshake, Coins, Clock, Sparkles } from 'lucide-react';

export default function EfficiencyMetrics({ records }) {
  const metrics = useMemo(() => {
    if (!records || records.length === 0) return null;

    let totalHundi = 0, totalDarshanForHundi = 0;
    let totalLaddu = 0, totalDarshanForLaddu = 0;
    let totalWaitHours = 0, validWaitCount = 0;
    let totalTonsures = 0, totalDarshanForTonsures = 0;

    records.forEach(r => {
      if (typeof r.hundi_revenue_cr === 'number' && typeof r.darshan_count === 'number' && r.darshan_count > 0) {
        totalHundi += r.hundi_revenue_cr * 10000000;
        totalDarshanForHundi += r.darshan_count;
      }
      if (typeof r.laddu_sales_lac === 'number' && typeof r.darshan_count === 'number' && r.darshan_count > 0) {
        totalLaddu += r.laddu_sales_lac * 100000;
        totalDarshanForLaddu += r.darshan_count;
      }
      if (typeof r.approx_wait_hours === 'number') {
        totalWaitHours += r.approx_wait_hours;
        validWaitCount++;
      }
      if (typeof r.tonsures === 'number' && typeof r.darshan_count === 'number' && r.darshan_count > 0) {
        totalTonsures += r.tonsures;
        totalDarshanForTonsures += r.darshan_count;
      }
    });

    const hundiPerDevotee = totalDarshanForHundi > 0 ? (totalHundi / totalDarshanForHundi).toFixed(2) : '0';
    const ladduPerDevotee = totalDarshanForLaddu > 0 ? (totalLaddu / totalDarshanForLaddu).toFixed(2) : '0';
    const tonsurePercentage = totalDarshanForTonsures > 0 ? ((totalTonsures / totalDarshanForTonsures) * 100).toFixed(1) : '0';
    const avgWait = validWaitCount > 0 ? (totalWaitHours / validWaitCount).toFixed(1) : '0';

    return {
      hundiPerDevotee,
      ladduPerDevotee,
      tonsurePercentage,
      avgWait,
    };
  }, [records]);

  if (!metrics) return null;

  return (
    <div className="portfolio-card p-4 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <Gauge className="w-5 h-5 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
        <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white">
          Per-Devotee Operational Efficiency Ratios
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Hundi per Devotee */}
        <div className="bg-[#E7CCCC]/30 dark:bg-[#2A2E35]/70 border border-[#E7CCCC] dark:border-[#FDE047]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <span>Avg Hundi per Devotee</span>
            <Coins className="w-4 h-4 text-amber-700 dark:text-[#FDE047]" strokeWidth={1.5} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            ₹ {metrics.hundiPerDevotee}
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Direct offering contribution per pilgrim</p>
        </div>

        {/* Laddu per Devotee */}
        <div className="bg-[#A2C4F2]/30 dark:bg-[#243447]/70 border border-[#A2C4F2] dark:border-[#A2C4F2]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <span>Avg Laddus per Pilgrim</span>
            <Sparkles className="w-4 h-4 text-blue-700 dark:text-[#A2C4F2]" strokeWidth={1.5} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            {metrics.ladduPerDevotee} Units
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Prasadam distribution efficiency</p>
        </div>

        {/* Tonsure Ratio */}
        <div className="bg-[#E7CCCC]/40 dark:bg-[#3B2F3E]/70 border border-[#E7CCCC] dark:border-[#E7CCCC]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <span>Tonsure (Kalyanakatta) %</span>
            <HeartHandshake className="w-4 h-4 text-rose-700 dark:text-[#E7CCCC]" strokeWidth={1.5} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            {metrics.tonsurePercentage}%
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Pilgrims offering hair tonsure</p>
        </div>

        {/* Queue Wait Time */}
        <div className="bg-[#BFD8D2]/40 dark:bg-[#1A2421]/70 border border-[#BFD8D2] dark:border-[#BFD8D2]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <span>Avg Queue Wait Time</span>
            <Clock className="w-4 h-4 text-teal-800 dark:text-[#BFD8D2]" strokeWidth={1.5} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            {metrics.avgWait} Hours
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Compartment clearance duration</p>
        </div>

      </div>
    </div>
  );
}

