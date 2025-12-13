import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Si no hay sesión activa, redirige al login
  if (!token || !usuario) return <Navigate to="/login" replace />;

  // Validar roles
  if (roles && !roles.includes(usuario.id_rol)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
