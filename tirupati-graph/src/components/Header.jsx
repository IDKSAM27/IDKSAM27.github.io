import React from 'react';
import { Activity, Download, RefreshCw, Layers } from 'lucide-react';

export default function Header({ totalRecords, latestRecord, onExportCSV, onRefresh }) {
  return (
    <header className="sticky top-0 z-40 bg-[#212121]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#2A2E35] border border-[#FDE047]/30 flex items-center justify-center text-[#FDE047] shadow-sm">
            <Activity className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold text-slate-100 font-heading tracking-tight">
                TIRUPATI GRAPH
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-[#4E5C58]/30 text-[#FDE047] border border-[#FDE047]/20">
                Live Data
              </span>
            </div>
            <p className="text-xs text-slate-400 font-body">
              TTD Tirumala Daily Records & Operational Metrics Engine
            </p>
          </div>
        </div>

        {/* Status Indicators & Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#2A2E35]/80 border border-slate-800 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-[#FDE047]" strokeWidth={1.5} />
            <span>{totalRecords} Records</span>
            {latestRecord && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Latest: {latestRecord.date}</span>
              </>
            )}
          </div>

          <button
            onClick={onRefresh}
            className="p-2 rounded-lg bg-[#2A2E35] hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-xs flex items-center space-x-1.5"
            title="Refresh dataset"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FDE047]" strokeWidth={1.5} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 rounded-lg bg-[#FDE047] hover:bg-yellow-300 text-[#020617] font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-md shadow-yellow-500/10"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Export CSV</span>
          </button>

        </div>

      </div>
    </header>
  );
}
