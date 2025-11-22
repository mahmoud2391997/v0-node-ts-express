'use client'

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin-layout';

const AuditLogPage = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [entity, setEntity] = useState('');
  const [action, setAction] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });
  const [limit, setLimit] = useState(50);
  const [entities, setEntities] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchAuditLogs = useCallback(async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(entity && { entity }),
        ...(action && { action }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });

      const res = await fetch(`/api/audits?${params}`);
      if (!res.ok) {
        throw new Error('Failed to fetch audit logs');
      }
      const data = await res.json();
      setAuditLogs(data.audits || []);
      setPagination(data.pagination || { total: 0, pages: 0 });
      setPage(pageNum);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, entity, action, startDate, endDate, limit]);

  useEffect(() => {
    fetchAuditLogs(1);
  }, []);

  useEffect(() => {
    const uniqueEntities = Array.from(new Set(auditLogs.map(log => log.entity)));
    const uniqueActions = Array.from(new Set(auditLogs.map(log => log.action)));
    setEntities(uniqueEntities as string[]);
    setActions(uniqueActions as string[]);
  }, [auditLogs]);

  const handleFilter = () => {
    fetchAuditLogs(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setEntity('');
    setAction('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const params = new URLSearchParams({
        format: 'csv',
        ...(search && { search }),
        ...(entity && { entity }),
        ...(action && { action }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        limit: '999999'
      });

      const res = await fetch(`/api/audits?${params}`);
      if (!res.ok) {
        throw new Error('Failed to export logs');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteOldLogs = async () => {
    if (!window.confirm('Delete audit logs older than 30 days? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      const res = await fetch('/api/audits?days=30', { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete old logs');
      }
      const data = await res.json();
      setError(null);
      await fetchAuditLogs(1);
      alert(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'update':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search (User ID or Entity ID)</label>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Entity</label>
              <select
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Entities</option>
                {entities.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Actions</option>
                {actions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Results Per Page</label>
              <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="250">250</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleFilter}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Clear Filters
            </button>
            <button
              onClick={handleDeleteOldLogs}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete Logs > 30 Days'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
          <strong>Error: </strong>{error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading audit logs...</p>
        </div>
      ) : auditLogs.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No audit logs found</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Entity</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Entity ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {auditLogs.map((log: any) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{log.userId === 'system' ? '⚙️ System' : log.userId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionBadgeColor(log.action)}`}>
                          {log.action.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">{log.entity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 font-mono">{log.entityId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, pagination.total)} of {pagination.total} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fetchAuditLogs(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = Math.max(1, page - 2) + i;
                if (pageNum > pagination.pages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchAuditLogs(pageNum)}
                    className={`px-4 py-2 rounded-lg transition ${
                      pageNum === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => fetchAuditLogs(page + 1)}
                disabled={page === pagination.pages}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      </div>
    </AdminLayout>
  );
};

export default AuditLogPage;
