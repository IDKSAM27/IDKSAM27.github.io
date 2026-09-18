import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
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

export default function TtdPage() {
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [primaryMetric, setPrimaryMetric] = useState('darshan_count');
  const [secondaryMetric, setSecondaryMetric] = useState('hundi_revenue_cr');
  const [presetRange, setPresetRange] = useState('all');
  const [smoothing, setSmoothing] = useState('none');
  const [dayFilter, setDayFilter] = useState('all');

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
  };

  const handleExportCSV = () => {
    if (!filteredRecords || filteredRecords.length === 0) return;

    const headers = ['Date', 'Darshan_Count', 'Hundi_Revenue_Cr', 'Tonsures', 'Laddu_Sales_Lac', 'Annaprasadam_Lac', 'Ashwini_Patients', 'Waiting_Compartments', 'Approx_Wait_Hours', 'Title', 'Link'];
    const rows = filteredRecords.map(r => [
      r.date,
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
        lineStyle: { width: 2.5, color: '#FDE047' },
        itemStyle: { color: '#FDE047' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
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
        showSymbol: filteredRecords.length < 40,
        symbolSize: 6,
        lineStyle: { width: 2, color: '#A2C4F2', type: 'dashed' },
        itemStyle: { color: '#A2C4F2' },
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
        axisPointer: { type: 'cross', crossStyle: { color: '#FDE047' } },
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
        { type: 'inside', start: 0, end: 100 },
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
      yAxis,
      series,
    };
  }, [filteredRecords, primaryMetric, secondaryMetric, smoothing]);

  // Heatmap Calendar Option
  const heatmapOption = useMemo(() => {
    if (!allRecords || allRecords.length === 0) return {};
    const heatmapData = allRecords
      .filter(r => r.date && typeof r.darshan_count === 'number')
      .map(r => [r.date, r.darshan_count]);

    const years = Array.from(new Set(allRecords.map(r => r.date.split('-')[0]))).sort();
    const latestYear = years.length > 0 ? years[years.length - 1] : '2024';

    return {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        formatter: (params) => `${params.value[0]}<br/><b>Darshan Count:</b> ${params.value[1] ? params.value[1].toLocaleString('en-IN') : 'N/A'}`,
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
        inRange: { color: ['#2A2E35', '#4E5C58', '#BFD8D2', '#FDE047'] },
        textStyle: { color: '#94A3B8', fontSize: 10 },
      },
      calendar: {
        top: 60,
        left: 40,
        right: 20,
        cellSize: ['auto', 13],
        range: latestYear,
        itemStyle: { borderWidth: 1.5, borderColor: '#212121', color: '#1A2421' },
        yearLabel: { show: true, color: '#FDE047', fontSize: 12 },
        monthLabel: { color: '#94A3B8', fontSize: 10 },
        dayLabel: { color: '#64748B', fontSize: 9 },
      },
      series: { type: 'heatmap', coordinateSystem: 'calendar', data: heatmapData },
    };
  }, [allRecords]);

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
      (r.title && r.title.toLowerCase().includes(term))
    );
  }, [filteredRecords, searchTerm]);

  const totalPages = Math.ceil(tableData.length / pageSize) || 1;
  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [tableData, currentPage]);

  const latestRecord = allRecords.length > 0 ? allRecords[allRecords.length - 1] : null;

  return (
    <div className="flex flex-col min-h-screen bg-hero-1-light dark:bg-hero-1-dark text-text-light dark:text-text-dark font-sans">
      <Seo title="Tirupati (TTD) Daily Records Analytics | Portfolio" description="Interactive analytics dashboard for Tirumala Tirupati Devasthanams (TTD) daily pilgrim records, hundi revenue, laddu sales, and wait time dynamics." />

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        
        {/* Sub-Header Title Bar */}
        <div className="portfolio-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-[#FDE047]">
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-[#FDE047]" strokeWidth={1.5} />
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                Tirupati (TTD) Daily Analytics Engine
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-body">
              Exploratory time-series engine tracking 790+ official daily records published by TTD news portal.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right text-xs text-slate-300 hidden sm:block">
              <div className="font-semibold text-white">{allRecords.length} Historical Days</div>
              {latestRecord && <div className="text-slate-400">Latest: {latestRecord.date}</div>}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-[#FDE047] hover:bg-yellow-300 text-[#020617] font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md shadow-yellow-500/10"
            >
              <Download className="w-4 h-4" strokeWidth={2} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[350px] portfolio-card rounded-2xl p-12 space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#FDE047]/30 border-t-[#FDE047] animate-spin"></div>
            <p className="text-xs font-semibold text-[#FDE047] animate-pulse font-heading tracking-wide">
              Fetching TTD Historical Dataset (790+ Days)...
            </p>
          </div>
        ) : error ? (
          <div className="portfolio-card border-rose-500/30 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-white font-heading">Failed to Load Dataset</h3>
            <p className="text-xs text-rose-300 font-mono">{error}</p>
            <button
              onClick={fetchRecords}
              className="px-4 py-2 bg-[#2A2E35] hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#2A2E35] border border-[#BFD8D2]/20 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-300 uppercase">Total Darshan Attendees</span>
                    <div className="p-2 rounded-xl bg-slate-900/40 text-[#BFD8D2]">
                      <Users className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold font-heading text-white">{stats.totalDarshan.toLocaleString('en-IN')}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Avg: {stats.avgDarshan.toLocaleString('en-IN')} / day</div>
                </div>

                <div className="bg-[#3B2F3E] border border-[#FDE047]/20 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-300 uppercase">Hundi Revenue</span>
                    <div className="p-2 rounded-xl bg-slate-900/40 text-[#FDE047]">
                      <IndianRupee className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold font-heading text-white">₹ {stats.totalHundi.toFixed(2)} Cr</div>
                  <div className="text-[11px] text-slate-400 mt-1">Avg: ₹ {stats.avgHundi} Cr / day</div>
                </div>

                <div className="bg-[#243447] border border-[#A2C4F2]/20 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-300 uppercase">Laddu Prasadams Sold</span>
                    <div className="p-2 rounded-xl bg-slate-900/40 text-[#A2C4F2]">
                      <Cookie className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold font-heading text-white">{stats.totalLaddu.toFixed(2)} Lakhs</div>
                  <div className="text-[11px] text-slate-400 mt-1">Avg: {stats.avgLaddu} Lakhs / day</div>
                </div>

                <div className="bg-[#1A2421] border border-[#E2ECE9]/20 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-300 uppercase">Avg Queue Wait Time</span>
                    <div className="p-2 rounded-xl bg-slate-900/40 text-[#E2ECE9]">
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold font-heading text-white">{stats.avgWaitHours} Hours</div>
                  <div className="text-[11px] text-slate-400 mt-1">Estimated compartment wait</div>
                </div>
              </div>
            )}

            {/* Filter Toolbar */}
            <div className="portfolio-card p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-slate-200">
                  <SlidersHorizontal className="w-4 h-4 text-[#FDE047]" strokeWidth={1.5} />
                  <h2 className="text-xs font-bold font-heading uppercase text-slate-100">Controls & Parameters</h2>
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
                        presetRange === p.value ? 'bg-[#FDE047] text-[#020617] font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                  <button
                    onClick={handleResetFilters}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 text-xs font-medium border border-slate-700 flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={e => { setSelectedYear(e.target.value); setPresetRange('all'); }}
                    className="w-full bg-[#2A2E35] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FDE047]"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={e => { setSelectedMonth(e.target.value); setPresetRange('all'); }}
                    className="w-full bg-[#2A2E35] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FDE047]"
                  >
                    <option value="all">All Months</option>
                    {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#FDE047] mb-1">Primary Metric</label>
                  <select
                    value={primaryMetric}
                    onChange={e => setPrimaryMetric(e.target.value)}
                    className="w-full bg-[#2A2E35] border border-[#FDE047]/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FDE047]"
                  >
                    {Object.entries(METRIC_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#A2C4F2] mb-1">Secondary Metric</label>
                  <select
                    value={secondaryMetric}
                    onChange={e => setSecondaryMetric(e.target.value)}
                    className="w-full bg-[#2A2E35] border border-[#A2C4F2]/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#A2C4F2]"
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
            <div className="portfolio-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#FDE047]" strokeWidth={1.5} />
                  <h3 className="text-base font-bold font-heading text-white">Time-Series Dynamics</h3>
                </div>
              </div>
              <div className="w-full h-[400px]">
                {filteredRecords.length > 0 ? (
                  <ReactECharts option={graphOption} style={{ height: '100%', width: '100%' }} theme="dark" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 text-xs">No records found.</div>
                )}
              </div>
            </div>

            {/* Heatmap Calendar */}
            <div className="portfolio-card p-5 space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#BFD8D2]" strokeWidth={1.5} />
                <h3 className="text-base font-bold font-heading text-white">Daily Density Calendar Heatmap</h3>
              </div>
              <div className="w-full h-[220px] overflow-x-auto">
                <ReactECharts option={heatmapOption} style={{ height: '100%', minWidth: '700px' }} />
              </div>
            </div>

            {/* Ledger Table */}
            <div className="portfolio-card p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Table className="w-5 h-5 text-[#FDE047]" strokeWidth={1.5} />
                  <h3 className="text-base font-bold font-heading text-white">Ledger Data ({tableData.length})</h3>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-[#2A2E35] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FDE047]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#2A2E35]/80 text-slate-300 font-heading border-b border-slate-800">
                      <th className="p-3">Date</th>
                      <th className="p-3">Darshan</th>
                      <th className="p-3">Hundi (Cr)</th>
                      <th className="p-3">Laddu (L)</th>
                      <th className="p-3">Tonsures</th>
                      <th className="p-3">Wait Hrs</th>
                      <th className="p-3">Bulletin Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-body">
                    {pageRecords.length > 0 ? (
                      pageRecords.map((r, i) => (
                        <tr key={i} className="hover:bg-[#2A2E35]/40 text-slate-200">
                          <td className="p-3 font-semibold text-[#FDE047] whitespace-nowrap">{r.date}</td>
                          <td className="p-3 font-mono">{r.darshan_count ? r.darshan_count.toLocaleString('en-IN') : '-'}</td>
                          <td className="p-3 font-mono text-[#BFD8D2]">{r.hundi_revenue_cr != null ? `₹ ${r.hundi_revenue_cr}` : '-'}</td>
                          <td className="p-3 font-mono text-[#A2C4F2]">{r.laddu_sales_lac != null ? r.laddu_sales_lac : '-'}</td>
                          <td className="p-3 font-mono text-slate-400">{r.tonsures ? r.tonsures.toLocaleString('en-IN') : '-'}</td>
                          <td className="p-3 font-mono text-slate-300">{r.approx_wait_hours != null ? `${r.approx_wait_hours} hrs` : '-'}</td>
                          <td className="p-3 max-w-xs truncate">
                            {r.link ? (
                              <a href={r.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#FDE047] inline-flex items-center space-x-1 truncate">
                                <span className="truncate">{r.title || 'Official Bulletin'}</span>
                                <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                              </a>
                            ) : '-'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={7} className="p-8 text-center text-slate-500">No records found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <div>Page {currentPage} of {totalPages}</div>
                <div className="flex items-center space-x-2">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded-lg bg-[#2A2E35] disabled:opacity-40 border border-slate-700">
                    <ChevronLeft className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </button>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded-lg bg-[#2A2E35] disabled:opacity-40 border border-slate-700">
                    <ChevronRight className="w-4 h-4 text-white" strokeWidth={1.5} />
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
