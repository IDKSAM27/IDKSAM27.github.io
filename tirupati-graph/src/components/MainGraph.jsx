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

export default function MainGraph({ records, primaryMetric, secondaryMetric, smoothing }) {

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
          color: '#FDE047',
        },
        itemStyle: {
          color: '#FDE047',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(253, 224, 71, 0.25)' },
              { offset: 1, color: 'rgba(253, 224, 71, 0.00)' },
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
          color: '#A2C4F2',
          type: 'dashed',
        },
        itemStyle: {
          color: '#A2C4F2',
        },
      });
    }

    const yAxis = [
      {
        type: 'value',
        name: METRIC_LABELS[primaryMetric] || primaryMetric,
        nameTextStyle: { color: '#FDE047', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(253, 224, 71, 0.3)' } },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
        axisLabel: { color: '#94A3B8', fontSize: 10 },
      },
    ];

    if (secondaryMetric !== 'none') {
      yAxis.push({
        type: 'value',
        name: METRIC_LABELS[secondaryMetric] || secondaryMetric,
        nameTextStyle: { color: '#A2C4F2', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(162, 196, 242, 0.3)' } },
        splitLine: { show: false },
        axisLabel: { color: '#94A3B8', fontSize: 10 },
      });
    }

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#2A2E35',
        borderColor: 'rgba(253, 224, 71, 0.3)',
        borderWidth: 1,
        textStyle: { color: '#E2E8F0', fontSize: 12 },
        axisPointer: {
          type: 'cross',
          crossStyle: { color: '#FDE047' },
        },
      },
      legend: {
        data: series.map(s => s.name),
        textStyle: { color: '#E2E8F0', fontSize: 11 },
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
          backgroundColor: 'rgba(33, 33, 33, 0.6)',
          fillerColor: 'rgba(253, 224, 71, 0.15)',
          handleStyle: { color: '#FDE047' },
          textStyle: { color: '#94A3B8' },
        },
      ],
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#475569' } },
        axisLabel: { color: '#94A3B8', fontSize: 10 },
      },
      yAxis: yAxis,
      series: series,
    };
  }, [records, primaryMetric, secondaryMetric, smoothing]);

  return (
    <div className="portfolio-card p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#FDE047]" strokeWidth={1.5} />
          <h3 className="text-base font-bold font-heading text-white">
            Primary Time-Series Trajectory
          </h3>
        </div>
        <div className="text-xs text-slate-400 flex items-center space-x-1">
          <Maximize2 className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
          <span className="hidden sm:inline">Pinch / Scroll to Zoom</span>
        </div>
      </div>

      <div className="w-full h-[380px] sm:h-[440px]">
        {records && records.length > 0 ? (
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            theme="dark"
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
