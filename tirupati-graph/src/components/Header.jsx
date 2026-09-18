import React from 'react';
import { Activity, Download, RefreshCw, Layers } from 'lucide-react';

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

export default function Header({ totalRecords, latestRecord, onExportCSV, onRefresh }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#212121]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#2A2E35] border border-[#4E5C58]/30 dark:border-[#FDE047]/30 flex items-center justify-center text-[#4E5C58] dark:text-[#FDE047] shadow-sm">
            <Activity className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 font-heading tracking-tight">
                TIRUPATI GRAPH
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-[#4E5C58]/10 text-[#4E5C58] border border-[#4E5C58]/20 dark:bg-[#4E5C58]/30 dark:text-[#FDE047] dark:border-[#FDE047]/20">
                Live Data
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
              TTD Tirumala Daily Records & Operational Metrics Engine
            </p>
          </div>
        </div>

        {/* Status Indicators & Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#2A2E35]/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
            <Layers className="w-3.5 h-3.5 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
            <span>{totalRecords} Records</span>
            {latestRecord && (
              <>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-slate-500 dark:text-slate-400">Latest: {formatDateWithDay(latestRecord.date)}</span>
              </>
            )}
          </div>

          <button
            onClick={onRefresh}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#2A2E35] dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700/60 transition-colors text-xs flex items-center space-x-1.5"
            title="Refresh dataset"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#4E5C58] dark:text-[#FDE047]" strokeWidth={1.5} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 rounded-lg bg-[#4E5C58] hover:bg-[#3d4845] text-white dark:bg-[#FDE047] dark:hover:bg-yellow-300 dark:text-[#020617] font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Export CSV</span>
          </button>

        </div>

      </div>
    </header>
  );
}

