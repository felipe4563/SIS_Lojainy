import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Admin from './pages/Administrador/AdminLayouts';
import Vendedor from './pages/Vendedor/VendedorLayouts';
import ProtectedRoute from './components/ProtectRoute';

function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login" element={<Login />} />

      {/* Privado */}
      <Route
        path="/Administrador"
        element={
          <ProtectedRoute roles={[1]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Vendedor"
        element={
          <ProtectedRoute roles={[2]}>
            <Vendedor />
          </ProtectedRoute>
        }
      />
      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
