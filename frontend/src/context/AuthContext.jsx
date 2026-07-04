import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import authApi from '../services/authApi.js';
import { setAuthToken, setUnauthorizedHandler } from '../services/axiosInstance.js';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'stockflow_token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
    setAuthToken(null);
    setUser(null);
  }, []);

  const applySession = useCallback((newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
    setAuthToken(newToken);
    setUser(newUser);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => logout());
  }, [logout]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      setAuthToken(token);
      try {
        const me = await authApi.getMe();
        setUser(me);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (credentials) => {
      const { token: newToken, user: newUser } = await authApi.login(credentials);
      applySession(newToken, newUser);
      return newUser;
    },
    [applySession]
  );

  const signup = useCallback(
    async (payload) => {
      const { token: newToken, user: newUser } = await authApi.signup(payload);
      applySession(newToken, newUser);
      return newUser;
    },
    [applySession]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
