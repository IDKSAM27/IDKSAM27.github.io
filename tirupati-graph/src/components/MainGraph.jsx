import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { TrendingUp, Maximize2 } from 'lucide-react';

const METRIC_LABELS = {
  darshan_count: 'Darshan Count',
  hundi_revenue_cr: 'Hundi Revenue (Cr ₹)',
  laddu_sales_lac: 'Laddu Sales (Lakhs)',
  tonsures: 'Tonsures',
  annaprasadam_lac: 'Annaprasadam Meals (Lakhs)',
  ashwini_patients: 'Ashwini Patients',
  waiting_compartments: 'Waiting Compartments',
  approx_wait_hours: 'Approx Wait Time (Hours)',
};

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

export default function MainGraph({ records, primaryMetric, secondaryMetric, smoothing }) {

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  // Function to calculate Moving Average
  const calculateMA = (dataList, key, windowSize) => {
    return dataList.map((val, idx) => {
      if (idx < windowSize - 1) {
        return val[key] != null ? val[key] : null;
      }
      let sum = 0;
      let count = 0;
      for (let i = idx - windowSize + 1; i <= idx; i++) {
        if (dataList[i] && typeof dataList[i][key] === 'number') {
          sum += dataList[i][key];
          count++;
        }
      }
      return count > 0 ? Number((sum / count).toFixed(2)) : null;
    });
  };

  const option = useMemo(() => {
    if (!records || records.length === 0) return {};

    const dates = records.map(r => r.date);

    const primaryColor = isDark ? '#FDE047' : '#3D6B5E';
    const secondaryColor = isDark ? '#A2C4F2' : '#2563EB';
    const primaryAreaColor = isDark ? 'rgba(253, 224, 71, 0.25)' : 'rgba(61, 107, 94, 0.22)';
    const textColor = isDark ? '#E2E8F0' : '#1E293B';
    const subtextColor = isDark ? '#94A3B8' : '#475569';

    let primaryValues = records.map(r => typeof r[primaryMetric] === 'number' ? r[primaryMetric] : null);
    let secondaryValues = secondaryMetric !== 'none'
      ? records.map(r => typeof r[secondaryMetric] === 'number' ? r[secondaryMetric] : null)
      : null;

    if (smoothing === '7d') {
      primaryValues = calculateMA(records, primaryMetric, 7);
      if (secondaryMetric !== 'none') {
        secondaryValues = calculateMA(records, secondaryMetric, 7);
      }
    } else if (smoothing === '30d') {
      primaryValues = calculateMA(records, primaryMetric, 30);
      if (secondaryMetric !== 'none') {
        secondaryValues = calculateMA(records, secondaryMetric, 30);
      }
    }

    const series = [
      {
        name: METRIC_LABELS[primaryMetric] || primaryMetric,
        type: 'line',
        yAxisIndex: 0,
        data: primaryValues,
        smooth: true,
        showSymbol: records.length < 40,
        symbolSize: 6,
        lineStyle: {
          width: 2.5,
          color: primaryColor,
        },
        itemStyle: {
          color: primaryColor,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: primaryAreaColor },
              { offset: 1, color: 'rgba(0, 0, 0, 0.00)' },
            ],
          },
        },
      },
    ];

    if (secondaryMetric !== 'none' && secondaryValues) {
      series.push({
        name: METRIC_LABELS[secondaryMetric] || secondaryMetric,
        type: 'line',
        yAxisIndex: 1,
        data: secondaryValues,
        smooth: true,
        showSymbol: records.length < 40,
        symbolSize: 6,
        lineStyle: {
          width: 2,
          color: secondaryColor,
          type: 'dashed',
        },
        itemStyle: {
          color: secondaryColor,
        },
      });
    }

    const yAxis = [
      {
        type: 'value',
        name: METRIC_LABELS[primaryMetric] || primaryMetric,
        nameTextStyle: { color: primaryColor, fontSize: 11, fontWeight: '600' },
        axisLine: { lineStyle: { color: primaryColor } },
        splitLine: { lineStyle: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)' } },
        axisLabel: { color: subtextColor, fontSize: 10 },
      },
    ];

    if (secondaryMetric !== 'none') {
      yAxis.push({
        type: 'value',
        name: METRIC_LABELS[secondaryMetric] || secondaryMetric,
        nameTextStyle: { color: secondaryColor, fontSize: 11, fontWeight: '600' },
        axisLine: { lineStyle: { color: secondaryColor } },
        splitLine: { show: false },
        axisLabel: { color: subtextColor, fontSize: 10 },
      });
    }

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? '#2A2E35' : '#FFFFFF',
        borderColor: isDark ? 'rgba(253, 224, 71, 0.3)' : 'rgba(61, 107, 94, 0.4)',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.15)',
        textStyle: { color: textColor, fontSize: 12 },
        axisPointer: {
          type: 'cross',
          crossStyle: { color: primaryColor },
        },
        formatter: (params) => {
          if (!params || params.length === 0) return '';
          const dateStr = params[0].name;
          const formattedDate = formatDateWithDay(dateStr);
          let res = `<div style="font-weight:bold;margin-bottom:6px;border-bottom:1px solid ${isDark ? '#475569' : '#E2E8F0'};padding-bottom:3px;color:${textColor};">${formattedDate}</div>`;
          params.forEach(p => {
            res += `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:3px;font-size:11px;">
              <span style="color:${subtextColor};">${p.marker} ${p.seriesName}:</span>
              <strong style="color:${textColor};">${p.value != null ? p.value.toLocaleString('en-IN') : '-'}</strong>
            </div>`;
          });
          return res;
        }
      },
      legend: {
        data: series.map(s => s.name),
        textStyle: { color: textColor, fontSize: 11 },
        top: 0,
      },
      grid: {
        left: '3%',
        right: secondaryMetric !== 'none' ? '4%' : '3%',
        bottom: '12%',
        top: '12%',
        containLabel: true,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          borderColor: 'transparent',
          backgroundColor: isDark ? 'rgba(33, 33, 33, 0.6)' : 'rgba(241, 245, 249, 0.8)',
          fillerColor: isDark ? 'rgba(253, 224, 71, 0.15)' : 'rgba(61, 107, 94, 0.15)',
          handleStyle: { color: primaryColor },
          textStyle: { color: subtextColor },
        },
      ],
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#CBD5E1' } },
        axisLabel: { color: subtextColor, fontSize: 10 },
      },
      yAxis: yAxis,
      series: series,
    };
  }, [records, primaryMetric, secondaryMetric, smoothing, isDark]);

  return (
    <div className="portfolio-card p-4 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Primary Time-Series Trajectory
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
          <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Pinch / Scroll to Zoom</span>
        </div>
      </div>

      <div className="w-full h-[380px] sm:h-[440px]">
        {records && records.length > 0 ? (
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-xs">
            No record data found matching current filter parameters.
          </div>
        )}
      </div>
    </div>
  );
}

