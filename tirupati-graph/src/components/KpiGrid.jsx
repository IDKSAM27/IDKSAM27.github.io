import React, { useMemo } from 'react';
import { Users, IndianRupee, Cookie, Clock } from 'lucide-react';

export default function KpiGrid({ records }) {
  const stats = useMemo(() => {
    if (!records || records.length === 0) return null;

    const validDarshan = records.filter(r => typeof r.darshan_count === 'number');
    const validHundi = records.filter(r => typeof r.hundi_revenue_cr === 'number');
    const validLaddu = records.filter(r => typeof r.laddu_sales_lac === 'number');
    const validWait = records.filter(r => typeof r.approx_wait_hours === 'number');

    const totalDarshan = validDarshan.reduce((acc, r) => acc + r.darshan_count, 0);
    const avgDarshan = validDarshan.length > 0 ? Math.round(totalDarshan / validDarshan.length) : 0;

    const totalHundi = validHundi.reduce((acc, r) => acc + r.hundi_revenue_cr, 0);
    const avgHundi = validHundi.length > 0 ? (totalHundi / validHundi.length).toFixed(2) : '0.00';

    const totalLaddu = validLaddu.reduce((acc, r) => acc + r.laddu_sales_lac, 0);
    const avgLaddu = validLaddu.length > 0 ? (totalLaddu / validLaddu.length).toFixed(2) : '0.00';

    const avgWaitHours = validWait.length > 0 ? (validWait.reduce((acc, r) => acc + r.approx_wait_hours, 0) / validWait.length).toFixed(1) : '0.0';

    return {
      totalDarshan,
      avgDarshan,
      totalHundi,
      avgHundi,
      totalLaddu,
      avgLaddu,
      avgWaitHours,
      count: records.length,
    };
  }, [records]);

  if (!stats) return null;

  const cards = [
    {
      title: 'Total Darshan Attendees',
      value: stats.totalDarshan.toLocaleString('en-IN'),
      subtitle: `Avg: ${stats.avgDarshan.toLocaleString('en-IN')} / day`,
      icon: Users,
      bgColor: 'bg-[#BFD8D2]/40 dark:bg-[#2A2E35]',
      accentColor: 'text-[#2C4A43] dark:text-[#BFD8D2]',
      borderColor: 'border-[#BFD8D2] dark:border-[#BFD8D2]/20',
    },
    {
      title: 'Hundi Offering Revenue',
      value: `₹ ${stats.totalHundi.toFixed(2)} Cr`,
      subtitle: `Avg: ₹ ${stats.avgHundi} Cr / day`,
      icon: IndianRupee,
      bgColor: 'bg-[#E7CCCC]/40 dark:bg-[#3B2F3E]',
      accentColor: 'text-[#5C3A3A] dark:text-[#FDE047]',
      borderColor: 'border-[#E7CCCC] dark:border-[#FDE047]/20',
    },
    {
      title: 'Laddu Prasadams Sold',
      value: `${stats.totalLaddu.toFixed(2)} Lakhs`,
      subtitle: `Avg: ${stats.avgLaddu} Lakhs / day`,
      icon: Cookie,
      bgColor: 'bg-[#A2C4F2]/40 dark:bg-[#243447]',
      accentColor: 'text-[#1E3A64] dark:text-[#A2C4F2]',
      borderColor: 'border-[#A2C4F2] dark:border-[#A2C4F2]/20',
    },
    {
      title: 'Avg Compartment Wait Time',
      value: `${stats.avgWaitHours} Hours`,
      subtitle: 'Estimated queue duration',
      icon: Clock,
      bgColor: 'bg-[#E2ECE9]/70 dark:bg-[#1A2421]',
      accentColor: 'text-[#2C4A43] dark:text-[#E2ECE9]',
      borderColor: 'border-[#BFD8D2] dark:border-[#E2ECE9]/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`${card.bgColor} ${card.borderColor} border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl bg-white/70 dark:bg-slate-900/40 ${card.accentColor}`}>
                <IconComponent className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-sans tracking-wide text-slate-900 dark:text-white">
                {card.value}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-body">
                {card.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

