const SummaryCard = ({ label, value, accent = 'brand' }) => {
  const accentClasses = {
    brand: 'bg-brand-50 text-brand-700',
    alert: 'bg-alert-50 text-alert-700',
    ink: 'bg-ink-50 text-ink',
  };

  const displayValue = value ?? 0;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink">{displayValue}</p>
        </div>
        <div className={`ml-4 flex h-12 w-12 items-center justify-center rounded-lg ${accentClasses[accent]}`}>
          <span className="font-semibold">{displayValue}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
