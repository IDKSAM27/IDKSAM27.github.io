import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import KpiGrid from './components/KpiGrid';
import FilterToolbar from './components/FilterToolbar';
import MainGraph from './components/MainGraph';
import HeatmapCalendar from './components/HeatmapCalendar';
import EfficiencyMetrics from './components/EfficiencyMetrics';
import DataTable from './components/DataTable';
import { AlertCircle } from 'lucide-react';

export default function App() {
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

  const latestRecord = allRecords.length > 0 ? allRecords[allRecords.length - 1] : null;

  return (
    <div className="min-h-screen bg-[#212121] text-slate-100 font-sans flex flex-col antialiased">
      
      {/* Navigation Header */}
      <Header
        totalRecords={allRecords.length}
        latestRecord={latestRecord}
        onExportCSV={handleExportCSV}
        onRefresh={fetchRecords}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] portfolio-card rounded-2xl p-12 space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#FDE047]/30 border-t-[#FDE047] animate-spin"></div>
            <p className="text-xs font-semibold text-[#FDE047] animate-pulse font-heading tracking-wide">
              Loading Tirupati Daily Dataset (790+ Records)...
            </p>
          </div>
        ) : error ? (
          <div className="portfolio-card border-rose-500/30 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-white font-heading">Failed to Load Dataset</h3>
            <p className="text-xs text-rose-300 font-mono">{error}</p>
            <button
              onClick={fetchRecords}
              className="px-4 py-2 bg-[#2A2E35] hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* KPI Summary Grid */}
            <KpiGrid records={filteredRecords} />

            {/* Filter Toolbar */}
            <FilterToolbar
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              primaryMetric={primaryMetric}
              setPrimaryMetric={setPrimaryMetric}
              secondaryMetric={secondaryMetric}
              setSecondaryMetric={setSecondaryMetric}
              presetRange={presetRange}
              setPresetRange={setPresetRange}
              smoothing={smoothing}
              setSmoothing={setSmoothing}
              dayFilter={dayFilter}
              setDayFilter={setDayFilter}
              availableYears={availableYears}
              onResetFilters={handleResetFilters}
            />

            {/* Main Interactive Visualizer */}
            <MainGraph
              records={filteredRecords}
              primaryMetric={primaryMetric}
              secondaryMetric={secondaryMetric}
              smoothing={smoothing}
            />

            {/* Heatmap & Ratios Grid */}
            <div className="grid grid-cols-1 gap-6">
              <HeatmapCalendar records={allRecords} />
              <EfficiencyMetrics records={filteredRecords} />
            </div>

            {/* Detailed Ledger Table */}
            <DataTable records={filteredRecords} onExportCSV={handleExportCSV} />
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#212121]/90 py-6 px-4 text-center text-xs text-slate-400 space-y-1">
        <p className="font-heading font-medium text-slate-300">
          Tirupati (TTD) Daily Records Analytics • Portfolio Project
        </p>
        <p className="text-[11px] text-slate-500">
          Source Data: Official TTD News Portal (<a href="https://news.tirumala.org/category/darshan/" target="_blank" rel="noreferrer" className="underline hover:text-[#FDE047]">news.tirumala.org</a>)
        </p>
      </footer>

    </div>
  );
}
