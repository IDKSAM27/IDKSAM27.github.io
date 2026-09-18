import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Calendar } from 'lucide-react';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDayOfWeek(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const dateObj = new Date(year, month, day);
      return DAY_NAMES[dateObj.getDay()] || '';
    }
  }
  return '';
}

function formatDateWithDay(dateStr) {
  if (!dateStr) return '';
  const day = getDayOfWeek(dateStr);
  return day ? `${dateStr} (${day})` : dateStr;
}

export default function HeatmapCalendar({ records }) {
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  const option = useMemo(() => {
    if (!records || records.length === 0) return {};

    const heatmapData = records
      .filter(r => r.date && typeof r.darshan_count === 'number')
      .map(r => [r.date, r.darshan_count]);

    const years = Array.from(new Set(records.map(r => r.date.split('-')[0]))).sort();
    const latestYear = years.length > 0 ? years[years.length - 1] : '2024';

    const textColor = isDark ? '#E2E8F0' : '#1E293B';
    const subtextColor = isDark ? '#94A3B8' : '#475569';

    return {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        formatter: (params) => {
          return `${formatDateWithDay(params.value[0])}<br/><b>Darshan Count:</b> ${params.value[1] ? params.value[1].toLocaleString('en-IN') : 'N/A'}`;
        },
        backgroundColor: isDark ? '#2A2E35' : '#FFFFFF',
        borderColor: isDark ? '#FDE047' : '#3D6B5E',
        textStyle: { color: textColor, fontSize: 11 },
        shadowBlur: 8,
        shadowColor: 'rgba(0,0,0,0.1)',
      },
      visualMap: {
        min: 40000,
        max: 95000,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: 0,
        inRange: {
          color: isDark
            ? ['#2A2E35', '#4E5C58', '#BFD8D2', '#FDE047']
            : ['#E2ECE9', '#BFD8D2', '#4E5C58', '#1E293B']
        },
        textStyle: { color: subtextColor, fontSize: 10 },
      },
      calendar: {
        top: 60,
        left: 40,
        right: 20,
        cellSize: ['auto', 13],
        range: latestYear,
        itemStyle: {
          borderWidth: 1.5,
          borderColor: isDark ? '#212121' : '#F9F6F1',
          color: isDark ? '#1A2421' : '#E2ECE9',
        },
        yearLabel: { show: true, color: isDark ? '#FDE047' : '#3D6B5E', fontSize: 12 },
        monthLabel: { color: subtextColor, fontSize: 10 },
        dayLabel: { color: isDark ? '#64748B' : '#64748B', fontSize: 9 },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: heatmapData,
      },
    };
  }, [records, isDark]);

  return (
    <div className="portfolio-card p-4 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-[#3D6B5E] dark:text-[#BFD8D2]" strokeWidth={1.5} />
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
          Daily Darshan Density Heatmap
        </h3>
      </div>
      <div className="w-full h-[220px] overflow-x-auto">
        <ReactECharts option={option} style={{ height: '100%', minWidth: '700px' }} />
      </div>
    </div>
  );
}

