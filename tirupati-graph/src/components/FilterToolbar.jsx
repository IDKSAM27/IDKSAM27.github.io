import React from 'react';
import { SlidersHorizontal, RotateCcw, Calendar, BarChart2 } from 'lucide-react';

export default function FilterToolbar({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  primaryMetric,
  setPrimaryMetric,
  secondaryMetric,
  setSecondaryMetric,
  presetRange,
  setPresetRange,
  smoothing,
  setSmoothing,
  dayFilter,
  setDayFilter,
  availableYears,
  onResetFilters,
}) {
  const months = [
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

  const metricsOptions = [
    { value: 'darshan_count', label: 'Darshan Count' },
    { value: 'hundi_revenue_cr', label: 'Hundi Revenue (Cr ₹)' },
    { value: 'laddu_sales_lac', label: 'Laddu Sales (Lakhs)' },
    { value: 'tonsures', label: 'Tonsures (Kalyanakatta)' },
    { value: 'annaprasadam_lac', label: 'Annaprasadam Meals (Lakhs)' },
    { value: 'ashwini_patients', label: 'Ashwini Medical Patients' },
    { value: 'waiting_compartments', label: 'Waiting Compartments' },
    { value: 'approx_wait_hours', label: 'Approx Wait Time (Hours)' },
  ];

  const presets = [
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last 1 Year' },
  ];

  return (
    <div className="portfolio-card p-4 sm:p-5 space-y-4 shadow-sm">
      
      {/* Top row: Section Header & Preset shortcuts */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
          <SlidersHorizontal className="w-4 h-4 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
          <h2 className="text-sm font-bold font-heading tracking-normal uppercase text-slate-900 dark:text-slate-100">
            Interactive Controls & Filters
          </h2>
        </div>

        {/* Preset Quick Range Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map(p => (
            <button
              key={p.value}
              onClick={() => setPresetRange(p.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                presetRange === p.value
                  ? 'bg-[#4E5C58] text-white dark:bg-[#FDE047] dark:text-[#020617] font-bold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}

          <button
            onClick={onResetFilters}
            className="ml-2 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 dark:bg-slate-800 dark:hover:bg-rose-900/40 dark:text-slate-400 dark:hover:text-rose-300 text-xs font-medium border border-slate-300 dark:border-slate-700 transition-colors flex items-center space-x-1"
            title="Reset to default view"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Grid of Control Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Year Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-[#3D6B5E] dark:text-[#BFD8D2]" strokeWidth={1.5} />
            <span>Year</span>
          </label>
          <select
            value={selectedYear}
            onChange={e => {
              setSelectedYear(e.target.value);
              setPresetRange('all');
            }}
            className="w-full bg-slate-50 dark:bg-[#1E2228] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E5C58]/30 dark:focus:ring-[#FDE047]/30 transition-all cursor-pointer"
          >
            <option value="all">All Available Years</option>
            {availableYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={e => {
              setSelectedMonth(e.target.value);
              setPresetRange('all');
            }}
            className="w-full bg-slate-50 dark:bg-[#1E2228] border border-slate-300 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E5C58]/30 dark:focus:ring-[#FDE047]/30 transition-all cursor-pointer"
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Primary Metric Axis */}
        <div>
          <label className="block text-[11px] font-semibold text-[#3D6B5E] dark:text-[#FDE047] mb-1 flex items-center space-x-1">
            <BarChart2 className="w-3 h-3" strokeWidth={1.5} />
            <span>Primary Metric (Left Axis)</span>
          </label>
          <select
            value={primaryMetric}
            onChange={e => setPrimaryMetric(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#1E2228] border border-[#3D6B5E]/40 dark:border-[#FDE047]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3D6B5E]/30 dark:focus:ring-[#FDE047]/30 transition-all cursor-pointer"
          >
            {metricsOptions.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Secondary Metric Axis */}
        <div>
          <label className="block text-[11px] font-semibold text-[#1D4ED8] dark:text-[#A2C4F2] mb-1 flex items-center space-x-1">
            <BarChart2 className="w-3 h-3" strokeWidth={1.5} />
            <span>Secondary Metric (Right Axis)</span>
          </label>
          <select
            value={secondaryMetric}
            onChange={e => setSecondaryMetric(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#1E2228] border border-[#1D4ED8]/40 dark:border-[#A2C4F2]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 dark:focus:ring-[#A2C4F2]/30 transition-all cursor-pointer"
          >
            <option value="none">None (Single Axis)</option>
            {metricsOptions.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Sub-row: Day Type & Smoothing */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200 dark:border-slate-800/60 text-xs">
        
        {/* Day of Week Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Day Filter:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-300 dark:bg-[#2A2E35] dark:border-slate-700">
            {['all', 'weekday', 'weekend'].map(d => (
              <button
                key={d}
                onClick={() => setDayFilter(d)}
                className={`px-2.5 py-1 text-[11px] rounded-md capitalize transition-colors ${
                  dayFilter === d
                    ? 'bg-[#4E5C58] text-white dark:bg-[#4E5C58] dark:text-[#FDE047] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Moving Average Smoothing */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Trend Smoothing:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-300 dark:bg-[#2A2E35] dark:border-slate-700">
            {[
              { id: 'none', name: 'Raw' },
              { id: '7d', name: '7-Day MA' },
              { id: '30d', name: '30-Day MA' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSmoothing(s.id)}
                className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                  smoothing === s.id
                    ? 'bg-[#4E5C58] text-white dark:bg-[#4E5C58] dark:text-[#FDE047] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

