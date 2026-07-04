const FormInput = ({ label, error, hint, id, className = '', ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      )}
      <input id={id} className="field-input" {...props} />
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 text-xs text-alert-600">{error}</p>}
    </div>
  );
};

export default FormInput;
