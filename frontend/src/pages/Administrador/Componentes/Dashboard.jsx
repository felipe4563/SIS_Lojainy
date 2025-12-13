import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { obtenerDashboardAvanzado } from "../../../services/dashboard.js";

// Configuración de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Opciones responsivas para gráficos
const responsiveChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 12
        },
        maxRotation: 45,
        minRotation: 0
      }
    },
    y: {
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

// Opciones específicas para gráficos circulares
const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        font: {
          size: 12
        }
      }
    }
  }
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totales: {},
    ventasPorDia: [],
    productosMasVendidos: [],
    ventasPorMetodo: [],
    stockBajo: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      setLoading(true);
      const data = await obtenerDashboardAvanzado();
      setDashboard(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar dashboard:", err);
      setError("Error al cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  };

  // Datos para gráfica de ventas por día
  const dataVentasDia = {
    labels: dashboard.ventasPorDia.map(v => v.dia),
    datasets: [
      {
        label: "Ventas Bs",
        data: dashboard.ventasPorDia.map(v => v.monto_total),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  };

  // Datos para gráfica de productos más vendidos
  const dataProductosVendidos = {
    labels: dashboard.productosMasVendidos.map(p => p.producto),
    datasets: [
      {
        label: "Cantidad vendida",
        data: dashboard.productosMasVendidos.map(p => p.cantidad_vendida),
        backgroundColor: "#10b981",
        borderColor: "#0da271",
        borderWidth: 1
      }
    ]
  };

  // Datos para gráfico de ventas por método de pago
  const dataMetodoPago = {
    labels: dashboard.ventasPorMetodo.map(v => v.metodo_pago),
    datasets: [
      {
        label: "Monto Bs",
        data: dashboard.ventasPorMetodo.map(v => v.monto),
        backgroundColor: ["#f97316", "#3b82f6", "#ef4444", "#facc15", "#8b5cf6", "#06b6d4", "#84cc16"],
        borderColor: "#ffffff",
        borderWidth: 1
      }
    ]
  };

  // Datos para gráfico de stock bajo
  const dataStockBajo = {
    labels: dashboard.stockBajo.map(p => p.producto),
    datasets: [
      {
        label: "Stock",
        data: dashboard.stockBajo.map(p => p.stock),
        backgroundColor: "#ef4444",
        borderColor: "#dc2626",
        borderWidth: 1
      }
    ]
  };

  // Función para recortar nombres largos en los labels
  const truncateLabel = (label, maxLength = 15) => {
    return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
  };

  // Aplicar truncado a los labels de las gráficas
  const productosLabelsTruncados = dashboard.productosMasVendidos.map(p => 
    truncateLabel(p.producto, window.innerWidth < 768 ? 10 : 15)
  );
  const stockLabelsTruncados = dashboard.stockBajo.map(p => 
    truncateLabel(p.producto, window.innerWidth < 768 ? 10 : 15)
  );

  const dataProductosVendidosTruncados = {
    ...dataProductosVendidos,
    labels: productosLabelsTruncados
  };

  const dataStockBajoTruncados = {
    ...dataStockBajo,
    labels: stockLabelsTruncados
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error al cargar el dashboard</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <button 
                onClick={cargarDashboard}
                className="mt-3 bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard Avanzado</h1>
        <button 
          onClick={cargarDashboard}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Actualizar
        </button>
      </div>

      {/* Totales - Responsivo */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-blue-500 text-white p-3 sm:p-4 rounded-lg shadow text-center transition-transform hover:scale-[1.02]">
          <p className="text-xl sm:text-2xl font-bold">{dashboard.totales.total_ventas || 0}</p>
          <p className="text-xs sm:text-sm mt-1 opacity-90">Ventas totales</p>
        </div>
        <div className="bg-green-500 text-white p-3 sm:p-4 rounded-lg shadow text-center transition-transform hover:scale-[1.02]">
          <p className="text-xl sm:text-2xl font-bold">Bs {dashboard.totales.monto_total || 0}</p>
          <p className="text-xs sm:text-sm mt-1 opacity-90">Monto total</p>
        </div>
        <div className="bg-yellow-500 text-white p-3 sm:p-4 rounded-lg shadow text-center transition-transform hover:scale-[1.02]">
          <p className="text-xl sm:text-2xl font-bold">{dashboard.totales.total_usuarios || 0}</p>
          <p className="text-xs sm:text-sm mt-1 opacity-90">Usuarios activos</p>
        </div>
        <div className="bg-purple-500 text-white p-3 sm:p-4 rounded-lg shadow text-center transition-transform hover:scale-[1.02]">
          <p className="text-xl sm:text-2xl font-bold">{dashboard.totales.total_productos || 0}</p>
          <p className="text-xs sm:text-sm mt-1 opacity-90">Productos</p>
        </div>
        <div className="bg-red-500 text-white p-3 sm:p-4 rounded-lg shadow text-center transition-transform hover:scale-[1.02]">
          <p className="text-xl sm:text-2xl font-bold">{dashboard.totales.stock_total || 0}</p>
          <p className="text-xs sm:text-sm mt-1 opacity-90">Stock total</p>
        </div>
      </div>

      {/* Gráficas - Responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Ventas últimos 7 días */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Ventas últimos 7 días</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <Line 
              data={dataVentasDia} 
              options={responsiveChartOptions}
              redraw={false}
            />
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Productos más vendidos (Top 5)</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <Bar 
              data={dataProductosVendidosTruncados} 
              options={responsiveChartOptions}
              redraw={false}
            />
          </div>
        </div>

        {/* Ventas por método de pago */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Ventas por método de pago</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <Pie 
              data={dataMetodoPago} 
              options={pieChartOptions}
              redraw={false}
            />
          </div>
        </div>

        {/* Productos con stock bajo */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Productos con stock bajo (&lt;=5)</h2>
          <div className="h-64 sm:h-72 md:h-80">
            <Bar 
              data={dataStockBajoTruncados} 
              options={responsiveChartOptions}
              redraw={false}
            />
          </div>
        </div>
      </div>

      {/* Mensaje si no hay datos */}
      {dashboard.ventasPorDia.length === 0 && 
       dashboard.productosMasVendidos.length === 0 &&
       dashboard.ventasPorMetodo.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-700">No hay datos disponibles para mostrar en el dashboard.</p>
        </div>
      )}

      {/* Información de actualización */}
      <div className="text-center text-xs sm:text-sm text-gray-500 pt-2 border-t border-gray-100">
        <p>Última actualización: {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">Los datos se actualizan al recargar la página o hacer clic en "Actualizar"</p>
      </div>
    </div>
  );
};

export default Dashboard;