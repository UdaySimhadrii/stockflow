const LoadingSpinner = ({ label = 'Loading…' }) => (
  <div className="flex items-center gap-3 text-sm text-muted">
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
    {label}
  </div>
);

export default LoadingSpinner;
