import { useEffect, useState, useCallback } from 'react';
import dashboardApi from '../services/dashboardApi.js';
import SummaryCard from '../components/SummaryCard.jsx';
import LowStockTable from '../components/LowStockTable.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import useAuth from '../hooks/useAuth.js';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await dashboardApi.getSummary();
      setSummary(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load the dashboard.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Welcome{user?.name ? `, ${user.name}` : ''}
      </h1>
      <p className="mt-1 text-sm text-muted">Here's how {user?.organization?.name || 'your store'} looks today.</p>

      <div className="mt-6">
        {isLoading && <LoadingSpinner label="Loading dashboard…" />}
        {!isLoading && error && <ErrorBanner message={error} onRetry={load} />}
      </div>

      {!isLoading && !error && summary && (
        <div className="mt-2 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard label="Total products" value={summary.totalProducts} />
            <SummaryCard label="Units on hand" value={summary.totalQuantityOnHand} />
            <SummaryCard label="Low stock items" value={summary.lowStockCount} accent="alert" />
          </div>

          <LowStockTable items={summary.lowStockItems} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
