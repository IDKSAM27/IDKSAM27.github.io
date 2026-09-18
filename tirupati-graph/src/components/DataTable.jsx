import React, { useState, useMemo } from 'react';
import { Table, Search, ChevronLeft, ChevronRight, ExternalLink, Download } from 'lucide-react';

export default function DataTable({ records, onExportCSV }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const filteredData = useMemo(() => {
    if (!records) return [];
    if (!searchTerm.trim()) return records;
    const term = searchTerm.toLowerCase();
    return records.filter(r =>
      (r.date && r.date.toLowerCase().includes(term)) ||
      (r.title && r.title.toLowerCase().includes(term))
    );
  }, [records, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  return (
    <div className="portfolio-card p-4 sm:p-6 space-y-4">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Table className="w-5 h-5 text-[#FDE047]" strokeWidth={1.5} />
          <h3 className="text-base font-bold font-heading text-white">
            Daily Ledger Database ({filteredData.length} Records)
          </h3>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search date or title..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#2A2E35] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FDE047]"
            />
          </div>

          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 rounded-xl bg-[#2A2E35] hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-[#FDE047] flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#2A2E35]/80 text-slate-300 font-heading border-b border-slate-800">
              <th className="p-3">Date</th>
              <th className="p-3">Darshan Count</th>
              <th className="p-3">Hundi Revenue</th>
              <th className="p-3">Laddu Sales</th>
              <th className="p-3">Tonsures</th>
              <th className="p-3">Wait Hours</th>
              <th className="p-3">Source Bulletin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-body">
            {pageRecords.length > 0 ? (
              pageRecords.map((r, i) => (
                <tr key={i} className="hover:bg-[#2A2E35]/40 transition-colors text-slate-200">
                  <td className="p-3 font-semibold text-[#FDE047] whitespace-nowrap">{r.date}</td>
                  <td className="p-3 font-mono">{r.darshan_count ? r.darshan_count.toLocaleString('en-IN') : '-'}</td>
                  <td className="p-3 font-mono text-[#BFD8D2]">{r.hundi_revenue_cr != null ? `₹ ${r.hundi_revenue_cr} Cr` : '-'}</td>
                  <td className="p-3 font-mono text-[#A2C4F2]">{r.laddu_sales_lac != null ? `${r.laddu_sales_lac} L` : '-'}</td>
                  <td className="p-3 font-mono text-slate-400">{r.tonsures ? r.tonsures.toLocaleString('en-IN') : '-'}</td>
                  <td className="p-3 font-mono text-slate-300">{r.approx_wait_hours != null ? `${r.approx_wait_hours} hrs` : '-'}</td>
                  <td className="p-3 max-w-xs truncate">
                    {r.link ? (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-[#FDE047] inline-flex items-center space-x-1 truncate"
                      >
                        <span className="truncate">{r.title || 'Official Post'}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                      </a>
                    ) : (
                      <span className="text-slate-500">{r.title || '-'}</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                  No records found matching your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
        <div>
          Showing {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} records
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-1.5 rounded-lg bg-[#2A2E35] hover:bg-slate-700 disabled:opacity-40 border border-slate-700"
          >
            <ChevronLeft className="w-4 h-4 text-white" strokeWidth={1.5} />
          </button>
          <span className="font-semibold text-slate-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-1.5 rounded-lg bg-[#2A2E35] hover:bg-slate-700 disabled:opacity-40 border border-slate-700"
          >
            <ChevronRight className="w-4 h-4 text-white" strokeWidth={1.5} />
          </button>
        </div>
      </div>

    </div>
  );
}
