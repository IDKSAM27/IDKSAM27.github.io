import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Calendar } from 'lucide-react';

export default function HeatmapCalendar({ records }) {
  const option = useMemo(() => {
    if (!records || records.length === 0) return {};

    const heatmapData = records
      .filter(r => r.date && typeof r.darshan_count === 'number')
      .map(r => [r.date, r.darshan_count]);

    const years = Array.from(new Set(records.map(r => r.date.split('-')[0]))).sort();
    const latestYear = years.length > 0 ? years[years.length - 1] : '2024';

    return {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        formatter: (params) => {
          return `${params.value[0]}<br/><b>Darshan Count:</b> ${params.value[1] ? params.value[1].toLocaleString('en-IN') : 'N/A'}`;
        },
        backgroundColor: '#2A2E35',
        borderColor: '#FDE047',
        textStyle: { color: '#E2E8F0', fontSize: 11 },
      },
      visualMap: {
        min: 40000,
        max: 95000,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: 0,
        inRange: {
          color: ['#2A2E35', '#4E5C58', '#BFD8D2', '#FDE047'],
        },
        textStyle: { color: '#94A3B8', fontSize: 10 },
      },
      calendar: {
        top: 60,
        left: 40,
        right: 20,
        cellSize: ['auto', 13],
        range: latestYear,
        itemStyle: {
          borderWidth: 1.5,
          borderColor: '#212121',
          color: '#1A2421',
        },
        yearLabel: { show: true, color: '#FDE047', fontSize: 12 },
        monthLabel: { color: '#94A3B8', fontSize: 10 },
        dayLabel: { color: '#64748B', fontSize: 9 },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: heatmapData,
      },
    };
  }, [records]);

  return (
    <div className="portfolio-card p-4 sm:p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-[#BFD8D2]" strokeWidth={1.5} />
        <h3 className="text-base font-bold font-heading text-white">
          Daily Darshan Density Heatmap
        </h3>
      </div>
      <div className="w-full h-[220px] overflow-x-auto">
        <ReactECharts option={option} style={{ height: '100%', minWidth: '700px' }} />
      </div>
    </div>
  );
}
