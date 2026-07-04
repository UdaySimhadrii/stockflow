const ErrorBanner = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-alert-300 bg-alert-50 px-4 py-3 text-sm text-alert-600">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="whitespace-nowrap font-semibold underline underline-offset-2">
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
