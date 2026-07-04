import { useContext, useCallback } from 'react';
import ToastContext from '../context/ToastContext.jsx';

const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');

  const success = useCallback((msg, duration) => ctx.addToast('success', msg, duration), [ctx]);
  const error = useCallback((msg, duration) => ctx.addToast('error', msg, duration), [ctx]);

  return { success, error, toasts: ctx.toasts, remove: ctx.removeToast };
};

export default useToast;
