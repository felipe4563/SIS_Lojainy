import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Cargar datos al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const tokenGuardado = localStorage.getItem('token');
    
    if (usuarioGuardado && tokenGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
        setToken(tokenGuardado);
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        localStorage.clear();
      }
    }
    setCargando(false);
  }, []);

  // Sincronizar token con localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Sincronizar usuario con localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  const login = useCallback((userData, authToken) => {
    setUsuario(userData);
    setToken(authToken);
  }, []);

  const logout = useCallback(() => {
    // 1. Limpiar estado
    setUsuario(null);
    setToken(null);
    
    // 2. Limpiar localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    
    // 3. Redirigir al login
    navigate('/login', { replace: true });
    
    // 4. Forzar limpieza completa (opcional pero seguro)
    setTimeout(() => {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }, 100);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      token, 
      cargando,
      login, 
      logout,
      setUsuario,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};