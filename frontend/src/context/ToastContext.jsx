import { createContext, useCallback, useState } from 'react';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, duration = 4000) => {
    const id = Date.now() + Math.random();
    const t = { id, type, message };
    setToasts((s) => [...s, t]);
    if (duration > 0) {
      setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => setToasts((s) => s.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
