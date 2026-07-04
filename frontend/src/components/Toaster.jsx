import { useContext } from 'react';
import ToastContext from '../context/ToastContext.jsx';

const ToastItem = ({ toast, onClose }) => {
  const color = toast.type === 'success' ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-alert-50 text-alert-700 border-alert-200';
  return (
    <div className={`mb-2 w-full max-w-sm rounded-md border px-3 py-2 ${color}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm">{toast.message}</div>
        <button className="ml-2 text-xs font-semibold" onClick={() => onClose(toast.id)}>Dismiss</button>
      </div>
    </div>
  );
};

const Toaster = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={removeToast} />
      ))}
    </div>
  );
};

export default Toaster;
