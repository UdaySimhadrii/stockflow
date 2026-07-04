import { useState, useEffect } from 'react';
import settingsApi from '../services/settingsApi.js';
import useToast from '../hooks/useToast.js';
import FormInput from '../components/FormInput.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Settings = () => {
  const [threshold, setThreshold] = useState('5');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  useEffect(() => {
    settingsApi
      .get()
      .then((s) => setThreshold(String(s.defaultLowStockThreshold)))
      .catch((err) => setError(err.response?.data?.message || 'Could not load settings.'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);
    try {
      const updated = await settingsApi.update({ defaultLowStockThreshold: Number(threshold) });
      setThreshold(String(updated.defaultLowStockThreshold));
      toast.success('Settings saved');
      setSuccess(true);
    } catch (err) {
      const message = err.response?.data?.message || 'Could not save settings.';
      toast.error(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading settings…" />;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
      <p className="mt-1 text-sm text-muted">Control how StockFlow flags low stock across your catalog.</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4 card">
        <ErrorBanner message={error} />
        {success && (
          <div className="rounded-lg border border-brand-300 bg-brand-50 px-4 py-3 text-sm text-brand-700">
            Settings saved.
          </div>
        )}

        <FormInput
          id="threshold"
          name="threshold"
          type="number"
          min="0"
          label="Default low stock threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          hint="Used for any product that doesn't have its own threshold set."
          required
        />

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
