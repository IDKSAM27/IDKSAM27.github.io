import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { Users, IndianRupee, Cookie, Clock, SlidersHorizontal, RotateCcw, Calendar, BarChart2, TrendingUp, Maximize2, Table, Search, ChevronLeft, ChevronRight, ExternalLink, Download, Activity, RefreshCw, Layers, Gauge, Coins, Sparkles, HeartHandshake, AlertCircle } from 'lucide-react';

// Dynamic import of ECharts for Next.js SSR compatibility
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

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

export function getDayOfWeek(dateStr) {
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

export function formatDateWithDay(dateStr) {
  if (!dateStr) return '';
  const day = getDayOfWeek(dateStr);
  return day ? `${dateStr} (${day})` : dateStr;
}

const MONTH_OPTIONS = [
  { value: 'all', label: 'All Months' },
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function TtdPage() {
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  // Filters State
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [primaryMetric, setPrimaryMetric] = useState('darshan_count');
  const [secondaryMetric, setSecondaryMetric] = useState('hundi_revenue_cr');
  const [presetRange, setPresetRange] = useState('all');
  const [smoothing, setSmoothing] = useState('none');
  const [dayFilter, setDayFilter] = useState('all');
  const [heatmapYear, setHeatmapYear] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/data/tirupati_daily_records.json');
      if (!res.ok) throw new Error(`HTTP ${res.status} failed to fetch records JSON`);
      const data = await res.json();
      setAllRecords(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const availableYears = useMemo(() => {
    const yearsSet = new Set();
    allRecords.forEach(r => {
      if (r.date) yearsSet.add(r.date.split('-')[0]);
    });
    return Array.from(yearsSet).sort().reverse();
  }, [allRecords]);

  const heatmapAvailableYears = useMemo(() => {
    return Array.from(new Set(allRecords.map(r => r.date ? r.date.split('-')[0] : ''))).filter(Boolean).sort();
  }, [allRecords]);

  const activeHeatmapYear = heatmapYear || (heatmapAvailableYears.length > 0 ? heatmapAvailableYears[heatmapAvailableYears.length - 1] : '2026');

  const filteredRecords = useMemo(() => {
    let result = [...allRecords];

    if (presetRange !== 'all') {
      const days = presetRange === '7d' ? 7 : presetRange === '30d' ? 30 : presetRange === '90d' ? 90 : 365;
      result = result.slice(-days);
    } else {
      if (selectedYear !== 'all') {
        result = result.filter(r => r.date.startsWith(selectedYear));
      }
      if (selectedMonth !== 'all') {
        result = result.filter(r => {
          const parts = r.date.split('-');
          return parts.length >= 2 && parts[1] === selectedMonth;
        });
      }
    }

    if (dayFilter !== 'all') {
      result = result.filter(r => {
        const d = new Date(r.date).getDay();
        const isWeekend = d === 0 || d === 6;
        return dayFilter === 'weekend' ? isWeekend : !isWeekend;
      });
    }

    return result;
  }, [allRecords, selectedYear, selectedMonth, presetRange, dayFilter]);

  const handleResetFilters = () => {
    setSelectedYear('all');
    setSelectedMonth('all');
    setPrimaryMetric('darshan_count');
    setSecondaryMetric('hundi_revenue_cr');
    setPresetRange('all');
    setSmoothing('none');
    setDayFilter('all');
    setHeatmapYear('');
  };

  const handleExportCSV = () => {
    if (!filteredRecords || filteredRecords.length === 0) return;

    const headers = ['Date', 'Day_Of_Week', 'Darshan_Count', 'Hundi_Revenue_Cr', 'Tonsures', 'Laddu_Sales_Lac', 'Annaprasadam_Lac', 'Ashwini_Patients', 'Waiting_Compartments', 'Approx_Wait_Hours', 'Title', 'Link'];
    const rows = filteredRecords.map(r => [
      r.date,
      getDayOfWeek(r.date),
      r.darshan_count || '',
      r.hundi_revenue_cr || '',
      r.tonsures || '',
      r.laddu_sales_lac || '',
      r.annaprasadam_lac || '',
      r.ashwini_patients || '',
      r.waiting_compartments || '',
      r.approx_wait_hours || '',
      `"${(r.title || '').replace(/"/g, '""')}"`,
      r.link || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tirupati_daily_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = useMemo(() => {
    if (!filteredRecords || filteredRecords.length === 0) return null;
    const validDarshan = filteredRecords.filter(r => typeof r.darshan_count === 'number');
    const validHundi = filteredRecords.filter(r => typeof r.hundi_revenue_cr === 'number');
    const validLaddu = filteredRecords.filter(r => typeof r.laddu_sales_lac === 'number');
    const validWait = filteredRecords.filter(r => typeof r.approx_wait_hours === 'number');

    const totalDarshan = validDarshan.reduce((acc, r) => acc + r.darshan_count, 0);
    const avgDarshan = validDarshan.length > 0 ? Math.round(totalDarshan / validDarshan.length) : 0;

    const totalHundi = validHundi.reduce((acc, r) => acc + r.hundi_revenue_cr, 0);
    const avgHundi = validHundi.length > 0 ? (totalHundi / validHundi.length).toFixed(2) : '0.00';

    const totalLaddu = validLaddu.reduce((acc, r) => acc + r.laddu_sales_lac, 0);
    const avgLaddu = validLaddu.length > 0 ? (totalLaddu / validLaddu.length).toFixed(2) : '0.00';

    const avgWaitHours = validWait.length > 0 ? (validWait.reduce((acc, r) => acc + r.approx_wait_hours, 0) / validWait.length).toFixed(1) : '0.0';

    return { totalDarshan, avgDarshan, totalHundi, avgHundi, totalLaddu, avgLaddu, avgWaitHours };
  }, [filteredRecords]);

  // ECharts main graph options
  const graphOption = useMemo(() => {
    if (!filteredRecords || filteredRecords.length === 0) return {};
    const dates = filteredRecords.map(r => r.date);

    const primaryColor = isDark ? '#FDE047' : '#3D6B5E';
    const secondaryColor = isDark ? '#A2C4F2' : '#2563EB';
    const primaryAreaColor = isDark ? 'rgba(253, 224, 71, 0.25)' : 'rgba(61, 107, 94, 0.22)';
    const textColor = isDark ? '#E2E8F0' : '#1E293B';
    const subtextColor = isDark ? '#94A3B8' : '#475569';

    const calculateMA = (dataList, key, windowSize) => {
      return dataList.map((val, idx) => {
        if (idx < windowSize - 1) return val[key] != null ? val[key] : null;
        let sum = 0, count = 0;
        for (let i = idx - windowSize + 1; i <= idx; i++) {
          if (dataList[i] && typeof dataList[i][key] === 'number') {
            sum += dataList[i][key];
            count++;
          }
        }
        return count > 0 ? Number((sum / count).toFixed(2)) : null;
      });
    };

    let primaryValues = filteredRecords.map(r => typeof r[primaryMetric] === 'number' ? r[primaryMetric] : null);
    let secondaryValues = secondaryMetric !== 'none'
      ? filteredRecords.map(r => typeof r[secondaryMetric] === 'number' ? r[secondaryMetric] : null)
      : null;

    if (smoothing === '7d') {
      primaryValues = calculateMA(filteredRecords, primaryMetric, 7);
      if (secondaryMetric !== 'none') secondaryValues = calculateMA(filteredRecords, secondaryMetric, 7);
    } else if (smoothing === '30d') {
      primaryValues = calculateMA(filteredRecords, primaryMetric, 30);
      if (secondaryMetric !== 'none') secondaryValues = calculateMA(filteredRecords, secondaryMetric, 30);
    }

    const series = [
      {
        name: METRIC_LABELS[primaryMetric] || primaryMetric,
        type: 'line',
        yAxisIndex: 0,
        data: primaryValues,
        smooth: true,
        showSymbol: filteredRecords.length < 40,
        symbolSize: 6,
        lineStyle: { width: 2.5, color: primaryColor },
        itemStyle: { color: primaryColor },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
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
        showSymbol: filteredRecords.length < 40,
        symbolSize: 6,
        lineStyle: { width: 2, color: secondaryColor, type: 'dashed' },
        itemStyle: { color: secondaryColor },
      });
    }

    const yAxis = [
      {
        type: 'value',
        name: METRIC_LABELS[primaryMetric] || primaryMetric,
        nameTextStyle: { color: primaryColor, fontSize: 11, fontWeight: '600', align: 'left', padding: [0, 0, 8, 0] },
        axisLine: { lineStyle: { color: primaryColor } },
        splitLine: { lineStyle: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)' } },
        axisLabel: { color: subtextColor, fontSize: 10 },
      },
    ];

    if (secondaryMetric !== 'none') {
      yAxis.push({
        type: 'value',
        name: METRIC_LABELS[secondaryMetric] || secondaryMetric,
        nameTextStyle: { color: secondaryColor, fontSize: 11, fontWeight: '600', align: 'right', padding: [0, 0, 8, 0] },
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
        axisPointer: { type: 'cross', crossStyle: { color: primaryColor } },
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
        left: 20,
        right: secondaryMetric !== 'none' ? 45 : 20,
        bottom: 80,
        top: 60,
        containLabel: true,
      },
      dataZoom: [
        { type: 'inside', start: 0, end: 100 },
        {
          type: 'slider',
          start: 0,
          end: 100,
          bottom: 12,
          height: 26,
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
        axisLabel: { color: subtextColor, fontSize: 10, margin: 12 },
      },
      yAxis,
      series,
    };
  }, [filteredRecords, primaryMetric, secondaryMetric, smoothing, isDark]);

  // Heatmap Calendar Option
  const heatmapOption = useMemo(() => {
    if (!allRecords || allRecords.length === 0) return {};
    const heatmapData = allRecords
      .filter(r => r.date && typeof r.darshan_count === 'number')
      .map(r => [r.date, r.darshan_count]);

    const textColor = isDark ? '#E2E8F0' : '#1E293B';
    const subtextColor = isDark ? '#94A3B8' : '#475569';

    return {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        formatter: (params) => `${formatDateWithDay(params.value[0])}<br/><b>Darshan Count:</b> ${params.value[1] ? params.value[1].toLocaleString('en-IN') : 'N/A'}`,
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
        top: -8,
        inRange: {
          color: isDark
            ? ['#2A2E35', '#4E5C58', '#BFD8D2', '#FDE047']
            : ['#E2ECE9', '#BFD8D2', '#4E5C58', '#1E293B']
        },
        textStyle: { color: subtextColor, fontSize: 10 },
      },
      calendar: {
        top: 80,
        left: 65,
        right: 30,
        cellSize: ['auto', 13],
        range: activeHeatmapYear,
        itemStyle: {
          borderWidth: 1.5,
          borderColor: isDark ? '#212121' : '#F9F6F1',
          color: isDark ? '#1A2421' : '#E2ECE9'
        },
        yearLabel: { show: true, color: isDark ? '#FDE047' : '#3D6B5E', fontSize: 12 },
        monthLabel: { color: subtextColor, fontSize: 10 },
        dayLabel: { color: isDark ? '#64748B' : '#64748B', fontSize: 9 },
      },
      series: { type: 'heatmap', coordinateSystem: 'calendar', data: heatmapData },
    };
  }, [allRecords, isDark, activeHeatmapYear]);

  // Table pagination & search
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const tableData = useMemo(() => {
    if (!filteredRecords) return [];
    if (!searchTerm.trim()) return filteredRecords;
    const term = searchTerm.toLowerCase();
    return filteredRecords.filter(r =>
      (r.date && r.date.toLowerCase().includes(term)) ||
      (r.title && r.title.toLowerCase().includes(term)) ||
      (getDayOfWeek(r.date).toLowerCase().includes(term))
    );
  }, [filteredRecords, searchTerm]);

  const totalPages = Math.ceil(tableData.length / pageSize) || 1;
  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [tableData, currentPage]);

  const latestRecord = allRecords.length > 0 ? allRecords[allRecords.length - 1] : null;

  return (
    <div className="flex flex-col min-h-screen bg-hero-1-light dark:bg-hero-1-dark text-text-light dark:text-text-dark font-sans transition-colors duration-200">
      <Seo title="Tirupati (TTD) Daily Records Analytics | Portfolio" description="Interactive analytics dashboard for Tirumala Tirupati Devasthanams (TTD) daily pilgrim records, hundi revenue, laddu sales, and wait time dynamics." />

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        
        {/* Sub-Header Title Bar - Left Border Removed per Request */}
        <div className="bg-white/90 dark:bg-[#2A2E35]/70 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
              <h1 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 dark:text-white tracking-normal">
                Tirupati (TTD) Daily Analytics Engine
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-body">
              Exploratory time-series engine tracking 790+ official daily records published by TTD news portal.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right text-xs text-slate-600 dark:text-slate-300 hidden sm:block">
              <div className="font-semibold text-slate-900 dark:text-white">{allRecords.length} Historical Days</div>
              {latestRecord && <div className="text-slate-500 dark:text-slate-400">Latest: {formatDateWithDay(latestRecord.date)}</div>}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-[#4E5C58] hover:bg-[#3d4845] text-white dark:bg-[#FDE047] dark:hover:bg-yellow-300 dark:text-[#020617] font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Download className="w-4 h-4" strokeWidth={2} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[350px] bg-white/90 dark:bg-[#2A2E35]/70 border border-slate-200 dark:border-white/10 rounded-2xl p-12 space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-full border-2 border-[#4E5C58]/30 dark:border-[#FDE047]/30 border-t-[#4E5C58] dark:border-t-[#FDE047] animate-spin"></div>
            <p className="text-xs font-semibold text-[#4E5C58] dark:text-[#FDE047] animate-pulse font-sans tracking-wide">
              Fetching TTD Historical Dataset (790+ Days)...
            </p>
          </div>
        ) : error ? (
          <div className="bg-white/90 dark:bg-[#2A2E35]/70 border border-rose-500/30 rounded-2xl p-8 text-center space-y-3 shadow-sm">
            <AlertCircle className="w-8 h-8 text-rose-500 dark:text-rose-400 mx-auto" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Failed to Load Dataset</h3>
            <p className="text-xs text-rose-600 dark:text-rose-300 font-mono">{error}</p>
            <button
              onClick={fetchRecords}
              className="px-4 py-2 bg-slate-100 dark:bg-[#2A2E35] hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* KPI Cards - Numbers spaced out with font-sans font-bold tracking-wide */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#BFD8D2]/40 dark:bg-[#2A2E35] border border-[#BFD8D2] dark:border-[#BFD8D2]/20 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Total Darshan Attendees</span>
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/40 text-[#2C4A43] dark:text-[#BFD8D2]">
                      <Users className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-sans tracking-wide text-slate-900 dark:text-white">{stats.totalDarshan.toLocaleString('en-IN')}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Avg: {stats.avgDarshan.toLocaleString('en-IN')} / day</div>
                </div>

                <div className="bg-[#E7CCCC]/40 dark:bg-[#3B2F3E] border border-[#E7CCCC] dark:border-[#FDE047]/20 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Hundi Revenue</span>
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/40 text-[#5C3A3A] dark:text-[#FDE047]">
                      <IndianRupee className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-sans tracking-wide text-slate-900 dark:text-white">₹ {stats.totalHundi.toFixed(2)} Cr</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Avg: ₹ {stats.avgHundi} Cr / day</div>
                </div>

                <div className="bg-[#A2C4F2]/40 dark:bg-[#243447] border border-[#A2C4F2] dark:border-[#A2C4F2]/20 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Laddu Prasadams Sold</span>
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/40 text-[#1E3A64] dark:text-[#A2C4F2]">
                      <Cookie className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-sans tracking-wide text-slate-900 dark:text-white">{stats.totalLaddu.toFixed(2)} Lakhs</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Avg: {stats.avgLaddu} Lakhs / day</div>
                </div>

                <div className="bg-[#E2ECE9]/70 dark:bg-[#1A2421] border border-[#BFD8D2] dark:border-[#E2ECE9]/20 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Avg Queue Wait Time</span>
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/40 text-[#2C4A43] dark:text-[#E2ECE9]">
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-sans tracking-wide text-slate-900 dark:text-white">{stats.avgWaitHours} Hours</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Estimated compartment wait</div>
                </div>
              </div>
            )}

            {/* Filter Toolbar with Modern Dropdown UI & Full Month Names */}
            <div className="bg-white/90 dark:bg-[#2A2E35]/70 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <SlidersHorizontal className="w-4 h-4 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
                  <h2 className="text-xs font-bold font-sans uppercase text-slate-900 dark:text-slate-100 tracking-normal">Controls & Parameters</h2>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { value: 'all', label: 'All Time' },
                    { value: '7d', label: '7D' },
                    { value: '30d', label: '30D' },
                    { value: '90d', label: '90D' },
                    { value: '1y', label: '1Y' },
                  ].map(p => (
                    <button
                      key={p.value}
                      onClick={() => setPresetRange(p.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        presetRange === p.value
                          ? 'bg-[#4E5C58] text-white dark:bg-[#FDE047] dark:text-[#020617] font-bold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                  <button
                    onClick={handleResetFilters}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 dark:bg-slate-800 dark:hover:bg-rose-900/40 dark:text-slate-400 dark:hover:text-rose-300 text-xs font-medium border border-slate-300 dark:border-slate-700 flex items-center space-x-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={e => { setSelectedYear(e.target.value); setPresetRange('all'); }}
                    className="w-full bg-slate-50 dark:bg-[#1E2228] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E5C58]/30 dark:focus:ring-[#FDE047]/30 transition-all cursor-pointer"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={e => { setSelectedMonth(e.target.value); setPresetRange('all'); }}
                    className="w-full bg-slate-50 dark:bg-[#1E2228] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E5C58]/30 dark:focus:ring-[#FDE047]/30 transition-all cursor-pointer"
                  >
                    {MONTH_OPTIONS.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#3D6B5E] dark:text-[#FDE047] mb-1">Primary Metric</label>
                  <select
                    value={primaryMetric}
                    onChange={e => setPrimaryMetric(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#1E2228] border border-[#3D6B5E]/40 dark:border-[#FDE047]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3D6B5E]/30 dark:focus:ring-[#FDE047]/30 transition-all cursor-pointer"
                  >
                    {Object.entries(METRIC_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1D4ED8] dark:text-[#A2C4F2] mb-1">Secondary Metric</label>
                  <select
                    value={secondaryMetric}
                    onChange={e => setSecondaryMetric(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#1E2228] border border-[#1D4ED8]/40 dark:border-[#A2C4F2]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 dark:focus:ring-[#A2C4F2]/30 transition-all cursor-pointer"
                  >
                    <option value="none">None (Single Axis)</option>
                    {Object.entries(METRIC_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Main Interactive Graph */}
            <div className="bg-white/90 dark:bg-[#2A2E35]/70 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
                  <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white">Time-Series Dynamics</h3>
                </div>
              </div>
              <div className="w-full h-[400px]">
                {filteredRecords.length > 0 ? (
                  <ReactECharts option={graphOption} style={{ height: '100%', width: '100%' }} />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 text-xs">No records found.</div>
                )}
              </div>
            </div>

            {/* Heatmap Calendar */}
            <div className="bg-white/90 dark:bg-[#2A2E35]/70 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#3D6B5E] dark:text-[#BFD8D2]" strokeWidth={1.5} />
                  <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white">Daily Density Calendar Heatmap</h3>
                </div>
                {heatmapAvailableYears.length > 0 && (
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Year:</span>
                    <select
                      value={activeHeatmapYear}
                      onChange={e => setHeatmapYear(e.target.value)}
                      className="bg-[#4E5C58] text-white dark:bg-[#FDE047] dark:text-[#020617] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-transparent shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4E5C58]/40 dark:focus:ring-[#FDE047]/40 transition-all cursor-pointer"
                    >
                      {heatmapAvailableYears.map(y => (
                        <option key={y} value={y} className="bg-white text-slate-900 dark:bg-[#2A2E35] dark:text-white font-medium">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="w-full h-[250px] overflow-x-auto">
                <ReactECharts option={heatmapOption} style={{ height: '100%', minWidth: '700px' }} />
              </div>
            </div>

            {/* Ledger Table */}
            <div className="bg-white/90 dark:bg-[#2A2E35]/70 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Table className="w-5 h-5 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
                  <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white">Ledger Data ({tableData.length})</h3>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Search records or day..."
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-50 dark:bg-[#2A2E35] border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#4E5C58] dark:focus:border-[#FDE047]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-[#2A2E35]/80 text-slate-700 dark:text-slate-300 font-bold font-sans border-b border-slate-200 dark:border-slate-800">
                      <th className="p-3">Date (Day)</th>
                      <th className="p-3">Darshan</th>
                      <th className="p-3">Hundi (Cr)</th>
                      <th className="p-3">Laddu (L)</th>
                      <th className="p-3">Tonsures</th>
                      <th className="p-3">Wait Hrs</th>
                      <th className="p-3">Bulletin Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-body">
                    {pageRecords.length > 0 ? (
                      pageRecords.map((r, i) => {
                        const dayName = getDayOfWeek(r.date);
                        return (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#2A2E35]/40 text-slate-800 dark:text-slate-200 transition-colors">
                            <td className="p-3 font-semibold text-[#3D6B5E] dark:text-[#FDE047] whitespace-nowrap">
                              {r.date} <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 ml-1">({dayName})</span>
                            </td>
                            <td className="p-3 font-mono">{r.darshan_count ? r.darshan_count.toLocaleString('en-IN') : '-'}</td>
                            <td className="p-3 font-mono text-emerald-700 dark:text-[#BFD8D2]">{r.hundi_revenue_cr != null ? `₹ ${r.hundi_revenue_cr}` : '-'}</td>
                            <td className="p-3 font-mono text-blue-700 dark:text-[#A2C4F2]">{r.laddu_sales_lac != null ? r.laddu_sales_lac : '-'}</td>
                            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{r.tonsures ? r.tonsures.toLocaleString('en-IN') : '-'}</td>
                            <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{r.approx_wait_hours != null ? `${r.approx_wait_hours} hrs` : '-'}</td>
                            <td className="p-3 max-w-xs truncate">
                              {r.link ? (
                                <a href={r.link} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-[#3D6B5E] dark:text-slate-400 dark:hover:text-[#FDE047] inline-flex items-center space-x-1 truncate">
                                  <span className="truncate">{r.title || 'Official Bulletin'}</span>
                                  <ExternalLink className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                                </a>
                              ) : '-'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr><td colSpan={7} className="p-8 text-center text-slate-500">No records found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
                <div>Page {currentPage} of {totalPages}</div>
                <div className="flex items-center space-x-2">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 dark:bg-[#2A2E35] dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 disabled:opacity-40">
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 dark:bg-[#2A2E35] dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 disabled:opacity-40">
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}


