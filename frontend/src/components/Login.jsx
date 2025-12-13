import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { login } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';

// Componente del Logo
const Logo = () => (
  <div className="flex flex-col items-center justify-center">
    <img 
      src="/logo.png" 
      alt="Boutique Lojainy Logo"
      className="w-16 h-16 sm:w-35 sm:h-35 object-contain mb-2"
    />
  </div>
);

const Login = () => {
  const [identificador, setIdentificador] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUsuario, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await login(identificador, password);
      setUsuario(data.usuario);
      setToken(data.token);

      // Redirigir según rol
      switch (data.usuario.id_rol) {
        case 1: // administrador
          navigate('/Administrador');
          break;
        case 2: // vendedor
          navigate('/Vendedor');
          break;
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      
      {/* Fondos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-24 bg-gradient-to-r from-amber-400 via-blue-400 to-rose-500 opacity-10 rotate-45 transform rounded-lg"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-32 bg-gradient-to-r from-amber-400 via-blue-400 to-rose-500 opacity-5 rotate-12 transform rounded-lg"></div>
        <div className="absolute bottom-1/4 -left-20 w-48 h-28 bg-gradient-to-r from-amber-400 via-blue-400 to-rose-500 opacity-5 -rotate-12 transform rounded-lg"></div>
        <div className="absolute bottom-10 right-10 opacity-5">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-rose-300 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-10 left-1/4 opacity-5">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-900 to-rose-800 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Header con barra de colores */}
          <div className="relative h-2 bg-gradient-to-r from-amber-500 via-blue-500 to-rose-600"></div>

          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <div className="text-center mb-6 sm:mb-8">
              <Logo />
              <div className="mt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bienvenido</h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Ingrese sus credenciales para continuar</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center space-x-2 sm:space-x-3 animate-fade-in">
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-700 text-xs sm:text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Identificador */}
              <div>
                <label htmlFor="identificador" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  CI o Correo
                </label>
                <input
                  id="identificador"
                  type="text"
                  value={identificador}
                  onChange={(e) => setIdentificador(e.target.value)}
                  required
                  className="block w-full pl-3 pr-4 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base shadow-sm"
                  placeholder="ejemplo@lojainy.com"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-3 pr-4 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base shadow-sm"
                  placeholder="Ingrese su contraseña"
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 via-blue-500 to-rose-600 text-white py-3 sm:py-4 px-4 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-lg hover:from-amber-600 hover:via-blue-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? 'Iniciando sesión...' : 'Ingresar al Sistema'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
              © 2025 <span className="font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Boutique Lojainy</span>. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
