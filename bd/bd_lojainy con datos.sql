-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2025 a las 07:03:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_lojainy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_venta`
--

INSERT INTO `detalle_venta` (`id_detalle`, `id_venta`, `id_producto`, `precio`) VALUES
(1, 1, 82, 950.00),
(2, 2, 93, 350.00),
(3, 2, 50, 350.00),
(4, 2, 83, 950.00),
(5, 3, 375, 300.00),
(6, 3, 373, 350.00),
(7, 3, 52, 350.00),
(8, 3, 381, 350.00),
(9, 4, 395, 350.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `talla` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `stock` int(11) DEFAULT 1,
  `codigo_qr` varchar(50) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `categoria`, `color`, `talla`, `precio`, `descripcion`, `stock`, `codigo_qr`, `fecha_registro`) VALUES
(1, 'Chaleco ', 'Beigs', 'Unica', 350.00, 'Chaleco de mujer con piedras brillantes ', 1, 'qr_1.png', '2025-12-06 03:41:35'),
(2, 'Chaleco ', 'Negro', 'Unica', 350.00, 'Chaleco de mujer con piedras brillantes ', 2, 'qr_2.png', '2025-12-06 03:43:45'),
(3, 'Chaleco ', 'Blanco', 'Unica', 350.00, 'Chaleco de mujer con piedras brillantes ', 2, 'qr_3.png', '2025-12-06 03:45:18'),
(4, 'Chaleco ', 'Beigs Claro', 'Unica', 350.00, 'Chaleco de mujer con piedras brillantes ', 1, 'qr_4.png', '2025-12-06 03:46:56'),
(5, 'Blusa sin mangas', 'Negro', 'Unica', 350.00, 'Con cuello halter con pedreria', 1, 'qr_5.png', '2025-12-06 03:50:03'),
(6, 'Blusa sin mangas', 'Cafe claro', 'Unica', 350.00, 'Con cuello halter con pedreria', 1, 'qr_6.png', '2025-12-06 03:51:22'),
(7, 'Blusa sin mangas', 'Crema', 'Unica', 350.00, 'Con cuello halter con pedreria', 1, 'qr_7.png', '2025-12-06 03:52:29'),
(8, 'Blusa sin mangas', 'Beigs Claro', 'Unica', 350.00, 'Con cuello halter con pedreria', 1, 'qr_8.png', '2025-12-06 03:53:10'),
(9, 'Blusa sin mangas', 'Rosa ', 'Unica', 350.00, 'Con cuello halter con pedreria', 1, 'qr_9.png', '2025-12-06 03:53:54'),
(10, 'Chaqueta', 'Negro', 'Unica', 350.00, 'Con detalles de pedreria y cuello beigs', 1, 'qr_10.png', '2025-12-06 03:55:26'),
(11, 'Chaquetas', 'Blanco', 'Unica', 350.00, 'Con detalles de pedreria y cuello beigs', 1, 'qr_11.png', '2025-12-06 03:58:03'),
(12, 'Chaqueta', 'Rosado', 'Unica', 350.00, 'Con detalles de pedreria y cuello beigs', 1, 'qr_12.png', '2025-12-06 03:58:58'),
(13, 'Blusa manga larga', 'Negro', 'Unica', 400.00, 'Detalles pedreria con cuello blanco', 1, 'qr_13.png', '2025-12-06 04:00:37'),
(14, 'Blusa manga larga', 'Marron', 'Unica', 400.00, 'Detalles pedreria con cuello blanco', 1, 'qr_14.png', '2025-12-06 04:01:47'),
(15, 'Camisa', 'Amarillo Claro', 'Unica', 350.00, 'Detalles pedreria con cuello blanco', 1, 'qr_15.png', '2025-12-06 04:03:55'),
(16, 'Blusa manga larga', 'Blanco', '10', 400.00, 'Con cuello de celeste con adornos de predreria', 1, 'qr_16.png', '2025-12-06 04:06:57'),
(17, 'Camisa tipo polo', 'Blanco', 'Unica', 350.00, 'Con detalles de pedreria y una seccion inferior de mezclilla, azul , cafe claro, negro desgatado', 3, 'qr_17.png', '2025-12-06 04:10:53'),
(18, 'Polera manga corta', 'Negro', 'S/M', 350.00, 'pedreria alo y lineas blancas alo', 1, 'qr_18.png', '2025-12-06 04:15:16'),
(19, 'Polera manga corta', 'Negro', 'L/XL', 350.00, 'pedreria alo y lineas blancas alo', 1, 'qr_19.png', '2025-12-06 04:16:12'),
(20, 'Blusa manga corta', 'Blanco', 'X/L', 350.00, 'pedreria en YSL', 1, 'qr_20.png', '2025-12-06 04:19:11'),
(21, 'Blusa manga corta', 'Blanco', 'S/M', 350.00, 'pedreria en YSL', 1, 'qr_21.png', '2025-12-06 04:20:13'),
(22, 'Polera manga corta', 'blanco', 'L/XL', 350.00, 'lineas negras con alo y pedreria negro en alo', 1, 'qr_22.png', '2025-12-06 04:22:27'),
(23, 'Polera manga corta', 'Blanco', 'S/M', 350.00, 'lineas negras con alo y pedreria negro en alo', 1, 'qr_23.png', '2025-12-06 04:23:27'),
(24, 'Polera manga corta', 'Plomo', 'S/M', 350.00, 'lineas negras con alo y pedreria negro en alo', 1, 'qr_24.png', '2025-12-06 04:24:04'),
(25, 'Polera manga corta', 'Beigs', 'S/M', 350.00, 'Pedreria Dior', 1, 'qr_25.png', '2025-12-06 04:24:59'),
(26, 'Blusa', 'Blanco', 'S/M', 350.00, 'Encaje negro en los hombros', 1, 'qr_26.png', '2025-12-06 04:26:24'),
(27, 'Blusa Corset', 'Azul', 'Unica', 450.00, 'Mesclilla con pedreria en diferentes diseños', 4, 'qr_27.png', '2025-12-06 04:30:48'),
(28, 'Blusa corset', 'Azul', 'Unica', 450.00, 'Mesclilla con cadena dorada', 1, 'qr_28.png', '2025-12-06 04:33:22'),
(29, 'Lenceria', 'Blanco', 'Unica', 300.00, 'Bralette con detalles pedreria', 1, 'qr_29.png', '2025-12-06 04:34:26'),
(30, 'Corset', 'Crema', 'Unica', 350.00, 'Bralette con tirantes de perlas', 1, 'qr_30.png', '2025-12-06 04:36:24'),
(31, 'Corset', 'Rosado', 'Unica', 380.00, ' Bralette colgantes de perlas', 1, 'qr_31.png', '2025-12-06 04:37:31'),
(32, 'Lenceria', 'Negro', 'Unica', 350.00, 'Con pedreria alrededor del busto', 1, 'qr_32.png', '2025-12-06 04:38:47'),
(33, 'Corset', 'Blanco', 'Unica', 350.00, 'Con pedreria en todo el busto en las tiras', 1, 'qr_33.png', '2025-12-06 04:39:59'),
(34, 'Corset', 'Blanco', 'Unica', 380.00, 'Con pedreria en todo el busto en las tiras', 1, 'qr_34.png', '2025-12-06 04:41:01'),
(35, 'Corset', 'Azul Claro', 'Unica', 350.00, 'Pedreria y tirantes en la espalda', 1, 'qr_35.png', '2025-12-06 04:44:14'),
(36, 'Body ', 'Rosa', 'Unica', 350.00, 'Pedreria en corazon', 2, 'qr_36.png', '2025-12-06 04:45:36'),
(37, 'Body', 'Amarillo Claro', 'Unica', 350.00, 'Pedreria en forma de corazon y y logo D', 2, 'qr_37.png', '2025-12-06 04:47:11'),
(38, 'Body', 'Cafe Suave', 'Unica', 350.00, 'Pedreria en corazon', 1, 'qr_38.png', '2025-12-06 04:48:17'),
(39, 'Body', 'Beige', 'Unica', 350.00, 'Con brilletes blancos', 1, 'qr_39.png', '2025-12-06 04:49:38'),
(40, 'Bodys', 'Negro', 'Unica', 350.00, 'Rivetes Blancos', 1, 'qr_40.png', '2025-12-06 04:51:12'),
(41, 'Body', 'Blanco', 'Unica', 350.00, 'Rivetes Beigs', 1, 'qr_41.png', '2025-12-06 04:53:44'),
(42, 'Bodys', 'Celeste', 'Unica', 350.00, 'Rivetes Blancos', 1, 'qr_42.png', '2025-12-06 04:54:56'),
(43, 'Body', 'Beigs', 'Unica', 350.00, 'Cierre en la espalda', 1, 'qr_43.png', '2025-12-06 04:55:54'),
(44, 'Body', 'Beigs Oscuro', 'Unica', 300.00, 'Pedreria solo adelante', 1, 'qr_44.png', '2025-12-06 04:57:07'),
(45, 'Body', 'Celeste ', 'Unica', 300.00, 'Pedrereia solo adelante', 1, 'qr_45.png', '2025-12-06 04:58:12'),
(46, 'Body Lenceria', 'Crema', 'Unica', 380.00, 'Detalles florales de tela', 1, 'qr_46.png', '2025-12-06 04:59:32'),
(47, 'Body Lenceria', 'Blanco', 'Unica', 350.00, 'Adernos de tela', 1, 'qr_47.png', '2025-12-06 05:00:23'),
(48, 'Blusa corta', 'Azul claro', 'Unica', 350.00, 'pedreria en todo', 1, 'qr_48.png', '2025-12-06 05:03:32'),
(49, 'Blusa corta', 'Amarillo', 'Unica', 350.00, 'Pedreria en todo', 1, 'qr_49.png', '2025-12-06 05:04:19'),
(50, 'Blusa corta', 'Rosado', 'Unica', 350.00, 'Pedreria en Todo', 2, 'qr_50.png', '2025-12-06 05:05:52'),
(51, 'Blusa corta', 'Degradado Blanco Rosa', 'Unica', 350.00, 'Pedreria en adelante ', 1, 'qr_51.png', '2025-12-06 05:08:17'),
(52, 'Blusa corta', 'Azul Degradado', 'Unica', 350.00, 'Pedreria solo adelante', 0, 'qr_52.png', '2025-12-06 05:09:20'),
(53, 'Blusa corta', 'Amarillo Degradado', 'Unica', 350.00, 'pedreria en todo', 1, 'qr_53.png', '2025-12-06 05:10:20'),
(54, 'Blusa corta', 'Plomo Degradado', 'Unica', 350.00, 'pedreria en adelante', 1, 'qr_54.png', '2025-12-06 05:11:11'),
(55, 'Blusa corta', 'Rosado', 'Unica', 350.00, 'Pedreria en adelante', 1, 'qr_55.png', '2025-12-06 05:11:50'),
(56, 'Blusa corta manga larga', 'Plomo ', 'Unica', 280.00, 'Con tirantes Blancos', 1, 'qr_56.png', '2025-12-06 05:13:54'),
(57, 'Top Corto', 'Negro', 'Unica', 320.00, 'Manga larga de malla atigrado', 1, 'qr_57.png', '2025-12-06 05:15:10'),
(58, 'Top Corto', 'Amarillo', 'Unica', 280.00, 'Manga larga de malla ', 1, 'qr_58.png', '2025-12-06 05:16:20'),
(59, 'Blusa Corta', 'Negro', 'Unica', 280.00, 'Con manga larga de malla', 1, 'qr_59.png', '2025-12-06 05:19:01'),
(60, 'Sujetador', 'Cebra', 'Unica', 300.00, 'Color cebra negro con beigs', 1, 'qr_60.png', '2025-12-06 05:21:58'),
(61, 'Blusa corta', 'Blanco', 'Unica', 300.00, 'Degradado de Blanco y negro', 1, 'qr_61.png', '2025-12-06 05:23:54'),
(62, 'Top', 'Leopardo', 'Unica', 280.00, 'Color Leopardo', 1, 'qr_62.png', '2025-12-06 05:25:11'),
(63, 'Top', 'Leopardo', 'Unica', 280.00, 'Amallado', 1, 'qr_63.png', '2025-12-06 05:27:00'),
(64, 'Top', 'Leopardo', 'Unica', 300.00, 'Con tirantes', 1, 'qr_64.png', '2025-12-06 05:27:45'),
(65, 'Blusa Corta', 'Leopardo', 'Unica', 320.00, 'Estampado leopardo amallado', 1, 'qr_65.png', '2025-12-06 05:29:26'),
(66, 'Blusa Halter', 'Plomo', 'Unica', 300.00, 'Degradado con escotado', 1, 'qr_66.png', '2025-12-06 05:30:36'),
(67, 'Blusa Corta', 'Cafe degradado', 'Unica', 350.00, 'Amallado entero', 1, 'qr_67.png', '2025-12-06 05:38:29'),
(68, 'Corset', 'Lopardo', 'Unica', 280.00, 'Tul Negro', 1, 'qr_68.png', '2025-12-06 05:39:39'),
(69, 'Blusa Corta Manga larga', 'Negro', 'Unica', 300.00, 'Leaporado negro amallado', 2, 'qr_69.png', '2025-12-06 05:40:58'),
(70, 'Blusa corta Manga Larga', 'Blanco', 'Unica', 300.00, 'Estampado geometrico blanco y negro', 1, 'qr_70.png', '2025-12-06 05:43:13'),
(71, 'Blusa Corta', 'Cebra', 'Unica', 300.00, 'Amallado con estampado de cebra', 1, 'qr_71.png', '2025-12-06 05:44:37'),
(72, 'Leggings', 'Negro', 'Unica', 450.00, 'Decorado de perdreria de la cintura', 2, 'qr_72.png', '2025-12-06 05:58:59'),
(73, 'Jeans', 'Azul', 'Unica', 950.00, 'Con pedreria en todo', 5, 'qr_73.png', '2025-12-06 06:03:00'),
(74, 'Jeans', 'Azul', 'Unica', 950.00, 'Con pedreria a los costados', 2, 'qr_74.png', '2025-12-06 06:05:03'),
(75, 'Jeans', 'Azul', 'Unica', 950.00, 'Con pedreria parches decorativos', 2, 'qr_75.png', '2025-12-06 06:06:54'),
(76, 'Jeans', 'Azul', 'Unica', 950.00, 'Ribete encaje blanco lateral', 2, 'qr_76.png', '2025-12-06 06:08:52'),
(77, 'Jeans', 'Azul', 'Unica', 950.00, 'Pedreria entero anverso y reverso', 2, 'qr_77.png', '2025-12-06 06:12:02'),
(78, 'Jeans', 'Azul', 'Unica', 950.00, 'Enpedrado en forma de corazon', 1, 'qr_78.png', '2025-12-06 06:13:20'),
(79, 'Jeans', 'Azul', 'Unica', 950.00, 'Empedrado en toda la parte de adelante, en un solo bolsillo de atras y rasgado ', 3, 'qr_79.png', '2025-12-06 06:15:08'),
(80, 'Jeans', 'Azul', 'Unica', 950.00, 'Empedrado solo adelante pequeño lineas rasgadas en la parte de atras', 1, 'qr_80.png', '2025-12-06 06:17:02'),
(81, 'Jeans', 'Gris ', 'Unica', 1100.00, 'Pedreria en todo ', 1, 'qr_81.png', '2025-12-06 06:21:13'),
(82, 'Jeans', 'Azul', 'Unica', 950.00, 'Pedreria en adelante', 0, 'qr_82.png', '2025-12-06 06:25:06'),
(83, 'Jeans', 'Celeste', 'Unica', 950.00, 'Pedregado en la parte de adelante ', 3, 'qr_83.png', '2025-12-06 06:26:18'),
(84, 'Camiseta', 'Negro', 'Unica', 400.00, 'Diseño de vestido', 1, 'qr_84.png', '2025-12-06 06:54:13'),
(85, 'Camiseta', 'Blanco', 'Unica', 400.00, 'Diseño de vestido', 1, 'qr_85.png', '2025-12-06 06:55:01'),
(86, 'Camiseta ', 'Blanco', 'Unica', 380.00, 'Estapado con Mickey  y Mini', 2, 'qr_86.png', '2025-12-06 06:57:15'),
(87, 'Camiseta', 'Amarillo', 'Unica', 380.00, 'Estampado de mini ', 1, 'qr_87.png', '2025-12-06 06:58:49'),
(88, 'Camiseta ', 'Rosado', 'Unica', 380.00, 'Estampado de Mini con brillo', 1, 'qr_88.png', '2025-12-06 07:00:57'),
(89, 'Camiseta', 'Negro', 'Unica', 380.00, '1 Mickey y 1 Mini ', 2, 'qr_89.png', '2025-12-06 07:02:00'),
(90, 'Camiseta', 'Gris', 'Unica', 380.00, 'Mini', 1, 'qr_90.png', '2025-12-06 07:04:18'),
(91, 'Camiseta', 'Negro', 'Unica', 350.00, 'Estampado Grafico de Moschino', 1, 'qr_91.png', '2025-12-06 07:06:46'),
(92, 'Camiseta', 'Plomo', 'Unica', 350.00, 'Estampado de Moschino', 1, 'qr_92.png', '2025-12-06 07:07:39'),
(93, 'Camiseta', 'blanco', 'Unica', 350.00, 'Estampado con MIU MIU ', 1, 'qr_93.png', '2025-12-06 07:08:32'),
(94, 'Camiseta ', 'Blanco', 'Unica', 350.00, 'Estampado con MOSCHINO', 1, 'qr_94.png', '2025-12-06 07:10:21'),
(95, 'Camiseta', 'Negro', 'Unica', 350.00, 'Estampado MIU MIU', 1, 'qr_95.png', '2025-12-06 07:13:19'),
(96, 'Camiseta', 'Crema', 'Unica', 350.00, 'Dibujo de Mickey', 1, 'qr_96.png', '2025-12-06 07:14:31'),
(97, 'Camiseta', 'Negro', 'Unica', 350.00, 'Estampado de Mickey dibujo', 1, 'qr_97.png', '2025-12-06 07:16:03'),
(98, 'Camiseta', 'Blanco ', 'Unica', 350.00, 'Estampado de Mickey ', 1, 'qr_98.png', '2025-12-06 07:17:18'),
(104, 'Vestidos Ajustado', 'Negro', 'Unica', 750.00, 'Pedrería Cuadrada en adelante', 1, 'qr_104.png', '2025-12-06 07:41:01'),
(105, 'Vestido Ajustado', 'Blanco', 'Unica', 750.00, 'Pedrería  Cuadrada en adelante', 1, 'qr_105.png', '2025-12-06 07:43:19'),
(106, 'Vestido Ajustado', 'Rojo', 'Unica', 650.00, 'Hombro con detalles fruncidos', 1, 'qr_106.png', '2025-12-06 07:45:27'),
(107, 'Vestido Corto Ajustado', 'Crema', 'Unica', 550.00, 'Espalda descubierta y adelante , incluye lazos o tiras para ajustar', 1, 'qr_107.png', '2025-12-06 07:49:46'),
(108, 'Conjunto top y short ', 'Blanco', 'S/M', 950.00, 'pedreria en todo', 1, 'qr_108.png', '2025-12-06 07:55:51'),
(109, 'Conjunto Chaleco y short ', 'Amarillo Claro', 'Unica', 950.00, 'Textura en puntos en relieve', 1, 'qr_109.png', '2025-12-06 08:00:27'),
(110, 'Conjunto Chaleco y short ', 'Celeste', 'Unica', 950.00, 'Textura de puntos en relieve', 1, 'qr_110.png', '2025-12-06 08:02:22'),
(111, 'Conjunto de mezclilla top y pantalón corto ', 'Azul', 'Unica', 950.00, 'Cuenta con cierre total con hebilla en el short tambien ', 3, 'qr_111.png', '2025-12-06 08:09:10'),
(112, 'Conjunto de mezclilla top y pantalón corto', 'Celeste', 'Unica', 950.00, 'Deshilachados con volantes', 1, 'qr_112.png', '2025-12-06 08:12:48'),
(113, 'Conjunto top y pantalón amarillo', 'Amarillo', 'Unica', 950.00, 'tTs en adelante', 1, 'qr_113.png', '2025-12-06 08:45:35'),
(114, 'Conjunto top y pantalón ', 'Rosa Pastel', 'Unica', 950.00, 'Tiras en adelante', 1, 'qr_114.png', '2025-12-06 08:47:55'),
(115, 'Conjunto top y pantalón', 'beige', 'Unica', 950.00, 'tiras adelante', 1, 'qr_115.png', '2025-12-06 08:49:48'),
(116, 'Conjunto top y pantalón', 'Negro', 'Unica', 950.00, 'tiras delante', 1, 'qr_116.png', '2025-12-06 08:50:31'),
(117, 'Conjunto top y pantalón', 'gris oscuro', 'Unica', 950.00, 'bolsillo en el pantalon', 1, 'qr_117.png', '2025-12-06 08:51:50'),
(118, 'Conjunto top y pantalón', 'beige', 'Unica', 950.00, 'bolsillo en el pantalon ', 1, 'qr_118.png', '2025-12-06 08:52:42'),
(119, 'Conjunto', 'crema', 'Unica', 950.00, 'Conjunto chaqueta y pantalón con pedreria', 1, 'qr_119.png', '2025-12-06 08:55:33'),
(120, 'Conjunto', 'Negro', 'Unica', 950.00, 'Conjunto chaqueta y pantalón con pedreria', 1, 'qr_120.png', '2025-12-06 08:56:28'),
(121, 'Vestidos', 'Blanco', 'Unica', 650.00, 'Enmallado con encaje', 1, 'qr_121.png', '2025-12-06 08:58:22'),
(122, 'Vestidos', 'Blanco', 'Unica', 650.00, 'Enmallado con encaje con escote en V', 1, 'qr_122.png', '2025-12-06 09:00:21'),
(123, 'Vestidos', 'Blanco', 'Unica', 750.00, 'Con capucha tipo canguro', 1, 'qr_123.png', '2025-12-06 09:01:54'),
(124, 'Vestidos', 'Rojo', 'Unica', 750.00, 'Tiene una hebilla en el centro , escotado, la espalda descubierta', 1, 'qr_124.png', '2025-12-06 09:07:29'),
(125, 'Conjunto ', 'Blanco', 'Unica', 750.00, 'con encaje tipo short', 1, 'qr_125.png', '2025-12-06 09:09:14'),
(126, 'conjunto ', 'Azul claro', 'Unica', 950.00, 'Perderían busto y bolcillo ', 1, 'qr_126.png', '2025-12-06 09:11:03'),
(127, 'Vestidos', 'Blanco', 'Unica', 750.00, 'hebilla a un costado', 1, 'qr_127.png', '2025-12-06 09:11:49'),
(128, 'Vestidos', 'Rojo', 'Unica', 750.00, 'con escote con encaje sin mangas como solera', 1, 'qr_128.png', '2025-12-06 09:13:51'),
(129, 'Vestidos', 'Crema', 'Unica', 650.00, 'escotado, espalda descubierta', 1, 'qr_129.png', '2025-12-06 09:15:46'),
(130, 'Conjuto', 'Blanco', 'Unica', 950.00, 'blusa pantalon acampanado, enpedrado en la parte superior de la blusa y el pantalón ', 2, 'qr_130.png', '2025-12-06 09:18:58'),
(131, 'Conjunto', 'Negro', 'Unica', 950.00, 'Mallado en Flores negras, con encaje, escotado', 1, 'qr_131.png', '2025-12-06 09:24:53'),
(132, 'Conjunto', 'Negro', 'Unica', 950.00, 'Espalda descubierta solo con tiras, escotado, con pedreria', 1, 'qr_132.png', '2025-12-06 09:28:20'),
(133, 'Conjunto', 'beige', 'Unica', 950.00, 'Espalda descubierta solo con tiras, escotado, con pedreria', 1, 'qr_133.png', '2025-12-06 09:28:52'),
(134, 'Vestidos', 'Negro', 'Unica', 950.00, 'tirantes en la parte de los hombros con decoración circular metálico ', 1, 'qr_134.png', '2025-12-06 09:33:09'),
(136, 'Conjunto', 'Celeste claro', '10', 950.00, 'Chaqueta manga larga con pedrería en la parte inferior en la chaqueta y en la parte superior delpantalon ', 1, 'qr_136.png', '2025-12-06 09:40:15'),
(137, 'Conjunto', 'Azul', 'Unica', 950.00, 'top y pantalón dos líneas de rasgado pelusa de jean ', 1, 'qr_137.png', '2025-12-06 09:42:40'),
(138, 'Polera ', 'Blanco', 'S/M', 300.00, 'Osito marca Gucci', 1, 'qr_138.png', '2025-12-06 09:47:42'),
(139, 'Polera ', 'Beige Claro', 'S/M', 300.00, 'Osito marca Gucci', 1, 'qr_139.png', '2025-12-06 09:49:58'),
(140, 'Polera ', 'naranja claro', 'S/M', 350.00, 'Manga corta empedrado en la parte superior estampado ausunitd ', 1, 'qr_140.png', '2025-12-06 09:52:45'),
(141, 'Polera ', 'Blanco', 'S/M', 350.00, 'Manga corta empedrado en la parte superior estampado ausunitd', 1, 'qr_141.png', '2025-12-06 09:53:59'),
(142, 'Polera ', 'Negro', 'S/M', 350.00, 'Manga corta empedrado en la parte superior estampado ausunit', 1, 'qr_142.png', '2025-12-06 09:55:55'),
(143, 'Polera ', 'Rosa', 'S/M', 350.00, 'Manga corta empedrado en la parte superior estampado ausunitd', 1, 'qr_143.png', '2025-12-06 09:56:27'),
(144, 'Polera ', 'Negro', 'M', 350.00, 'Manga con Pedreria en estampado YSL', 1, 'qr_144.png', '2025-12-06 09:56:54'),
(145, 'Polera ', 'Blanco', 'M', 350.00, 'Manga con Pedreria en estampado YSL', 1, 'qr_145.png', '2025-12-06 10:01:27'),
(146, 'Polera ', 'Negro', 'M', 350.00, 'con estampado dolce gabbbana y pedreria DG', 1, 'qr_146.png', '2025-12-06 10:03:01'),
(147, 'Polera ', 'Blanco', 'M', 350.00, 'con estampado dolce gabbbana y pedreria DG', 1, 'qr_147.png', '2025-12-06 10:03:35'),
(148, 'Polera ', 'Rosa fuerte', 'Unica', 350.00, 'con pedreria CVD, estampado valentino', 1, 'qr_148.png', '2025-12-06 10:05:12'),
(149, 'Polera ', 'Gris', 'Unica', 350.00, 'con pedreria CVD, estampado valentino', 1, 'qr_149.png', '2025-12-06 10:06:32'),
(150, 'Polera ', 'Rosa', 'Unica', 350.00, 'con pedreria CVD, estampado valentino', 1, 'qr_150.png', '2025-12-06 10:07:12'),
(151, 'Polera ', 'Blanco', 'Unica', 350.00, 'B   BALMAIN PARIS', 1, 'qr_151.png', '2025-12-06 10:08:35'),
(152, 'Polera ', 'Blanco', 'Unica', 350.00, 'Estampado y marca de COACH neww york', 1, 'qr_152.png', '2025-12-06 10:09:51'),
(153, 'Polera', 'Negro', 'Unica', 350.00, 'Estampado de GIVENCHY con pedrería ', 1, 'qr_153.png', '2025-12-06 10:11:49'),
(154, 'Polera', 'Blanco', 'Unica', 350.00, 'Estampado de GIVENCHY con pedrería ', 1, 'qr_154.png', '2025-12-06 10:12:53'),
(155, 'Polera', 'blanco', 'Unica', 350.00, 'pedreria con estampado y costurado dior', 1, 'qr_155.png', '2025-12-06 10:13:58'),
(156, 'Polera', 'Blanco', 'S', 350.00, 'con encaje de pelusa lineas negras', 2, 'qr_156.png', '2025-12-06 10:15:17'),
(157, 'Polera', 'Negro', 'S', 350.00, 'con encaje de pelusa lineas Blancas', 1, 'qr_157.png', '2025-12-06 10:16:51'),
(158, 'polera', 'Negro', 'S', 350.00, 'Con cuello jean azul y botones', 1, 'qr_158.png', '2025-12-06 10:18:14'),
(159, 'Polera', 'Blanco', 'S', 350.00, 'Con cuello jean azul y botones', 1, 'qr_159.png', '2025-12-06 10:18:38'),
(160, 'Bodys', 'Rojo', 'Unica', 320.00, 'lencerías bodys con mayado de figuras transparente', 1, 'qr_160.png', '2025-12-06 10:20:51'),
(161, 'Bodys', 'Verde', 'Unica', 320.00, 'lencerías bodys con mayado de figuras transparente', 1, 'qr_161.png', '2025-12-06 10:21:16'),
(162, 'Bodys', 'Negro', 'Unica', 320.00, 'lencerías bodys con mayado de figuras transparente, en la parte de a tras descubierto, tiras ', 1, 'qr_162.png', '2025-12-06 10:22:28'),
(163, 'Encaje', 'Blanco', 'Unica', 250.00, 'lencerías amallado con figuras de flores ', 1, 'qr_163.png', '2025-12-06 10:25:29'),
(164, 'Lencería  ', 'Rojo', 'Unica', 250.00, 'lencerías amallado con figuras de flores ', 1, 'qr_164.png', '2025-12-06 10:27:17'),
(165, 'Lenceria', 'Rosa suave', 'Unica', 250.00, 'lencerías amallado con figuras de flores ', 2, 'qr_165.png', '2025-12-06 10:27:52'),
(166, 'Lencería ', 'Negro', 'Unica', 350.00, 'lencerías amallado con figuras de flores ', 2, 'qr_166.png', '2025-12-06 10:29:27'),
(167, 'Lenceria', 'Amarillo', 'Unica', 250.00, 'lencerías amallado con figuras de flores ', 1, 'qr_167.png', '2025-12-06 10:31:21'),
(168, 'Top', 'Blanco', 'Unica', 280.00, 'manga larga amallado ', 1, 'qr_168.png', '2025-12-06 10:33:07'),
(169, 'top', 'Negro', 'Unica', 350.00, 'top corto con volantes de pedrería ', 1, 'qr_169.png', '2025-12-06 10:34:35'),
(170, 'Blusa', 'Negro', 'S/M', 300.00, 'polo negra de canale manga corta ', 1, 'qr_170.png', '2025-12-06 10:38:31'),
(171, 'Polera', 'Negro', 'Unica', 280.00, 'cuello de tortuga marca alo ', 2, 'qr_171.png', '2025-12-06 10:40:01'),
(172, 'Blusa', 'Amarillo suave', 'Unica', 280.00, 'cuello de tortuga marca alo ', 1, 'qr_172.png', '2025-12-06 10:41:09'),
(173, 'Polera', 'Blanco', 'Unica', 350.00, 'pedreria  en estampado de conejo y tiene estampado de Balenciaga', 1, 'qr_173.png', '2025-12-06 10:43:10'),
(174, 'Polera', 'Blanco', 'Unica', 350.00, 'Estampado de pantera rosa con pedreria ', 1, 'qr_174.png', '2025-12-06 10:44:23'),
(175, 'Polera', 'Negro', 'Unica', 350.00, 'Estampado de pantera rosa con pedreria ', 1, 'qr_175.png', '2025-12-06 10:45:04'),
(176, 'Polera', 'Negro', 'Unica', 350.00, 'Con pedreria en Dior ', 1, 'qr_176.png', '2025-12-06 10:46:16'),
(177, 'Polera', 'Negro', 'Unica', 350.00, 'con estampado de valenciaga y pedreria BB', 1, 'qr_177.png', '2025-12-06 10:47:07'),
(178, 'Polera', 'Blanco', 'Unica', 350.00, 'con estampado de balenciaga y lentejuelas BB', 1, 'qr_178.png', '2025-12-06 10:48:01'),
(179, 'Polera', 'Beigs fuerte', 'Unica', 350.00, 'Con pedreria en Versace diseño azteca ', 1, 'qr_179.png', '2025-12-06 10:50:03'),
(180, 'Polera', 'Beigs suave ', 'Unica', 350.00, 'Con pedreria en Versace diseño azteca ', 1, 'qr_180.png', '2025-12-06 10:50:52'),
(181, 'Polera', 'Blanco', 'Unica', 350.00, 'Con pedreria en Versace diseño azteca ', 1, 'qr_181.png', '2025-12-06 10:51:15'),
(182, 'Polera', 'Negro', 'Unica', 350.00, 'Con pedreria en Versace diseño azteca ', 1, 'qr_182.png', '2025-12-06 10:51:46'),
(183, 'Polera', 'Blanco', 'Unica', 350.00, 'Estampado de versase con pedreria cuadriculada ', 1, 'qr_183.png', '2025-12-06 10:53:15'),
(184, 'Polera', 'Blanco', 'Unica', 350.00, 'Con pedreria en Chanel', 1, 'qr_184.png', '2025-12-06 10:54:41'),
(185, 'Polera', 'Negro', 'Unica', 350.00, 'Pedrería dorada en marca de coco Chanel CHANEL, Con superior blanco y lo demás negro', 1, 'qr_185.png', '2025-12-06 10:57:31'),
(186, 'Polera', 'Beigs', 'Unica', 350.00, 'Pedrería dorada en marca de coco Chanel CHANEL, Con superior blanco y lo demás negro', 1, 'qr_186.png', '2025-12-06 10:58:31'),
(187, 'Polera', 'Blanco', 'Unica', 350.00, 'Con pedreria en chanel 4 cuadrados ', 1, 'qr_187.png', '2025-12-06 11:04:14'),
(188, 'Polera', 'Negro', 'Unica', 350.00, 'Con pedreria en chanel 4 cuadrados ', 1, 'qr_188.png', '2025-12-06 11:04:48'),
(189, 'Polera', 'Negro', 'Unica', 350.00, 'Con pedreria en GUESS  cuadrado', 2, 'qr_189.png', '2025-12-06 11:06:03'),
(190, 'Polera', 'Beigs', 'Unica', 350.00, 'Pedreria al borde del estampado de prada', 1, 'qr_190.png', '2025-12-06 11:07:47'),
(191, 'Polera', 'Negro', 'Unica', 350.00, 'Estampado Y pedreria en GUESS', 1, 'qr_191.png', '2025-12-06 11:09:34'),
(192, 'Polera', 'Negro', 'Unica', 350.00, 'Pedreria en estampado triangulo GUES ', 2, 'qr_192.png', '2025-12-06 11:10:55'),
(193, 'Polera', 'Negro', 'Unica', 350.00, 'pedreria en todo el redondo del estampado de GUESS , U.S.A.', 1, 'qr_193.png', '2025-12-06 11:13:16'),
(194, 'Polera', 'Blanco', 'Unica', 350.00, 'Pedreria en estampado de cuadrado de GUESS', 1, 'qr_194.png', '2025-12-06 11:15:34'),
(195, 'Polera', 'Rojo', 'Unica', 350.00, 'Estampado triangulo con empedrado GUESS', 1, 'qr_195.png', '2025-12-06 11:16:46'),
(196, 'Polera', 'Beigs', 'Unica', 350.00, 'Estampado triangulo con empedrado GUESS', 1, 'qr_196.png', '2025-12-06 11:17:35'),
(197, 'Polera', 'Negro', 'Unica', 350.00, 'Estampado circulo redondo con Pedreria GUESS', 1, 'qr_197.png', '2025-12-06 11:19:06'),
(198, 'Polera ', 'Blanco', 'Unica', 350.00, 'Estampado circulo redondo con Pedreria GUESS, USA', 1, 'qr_198.png', '2025-12-06 11:19:58'),
(199, 'Polera', 'Blanco', 'Unica', 350.00, 'Estampado en Dolce Gabana, y pedreria DG', 1, 'qr_199.png', '2025-12-06 11:21:45'),
(200, 'Polera', 'Blanco', 'Unica', 350.00, 'Estampado en DOLCE GABBANA y pedreria cuadrada en lineas', 1, 'qr_200.png', '2025-12-06 11:24:27'),
(201, 'Polera', 'Negro', 'Unica', 350.00, 'Estampado en DOLCE GABBANA y pedreria cuadrada en lineas', 1, 'qr_201.png', '2025-12-06 11:24:46'),
(202, 'Polera', 'Blanco', 'Unica', 350.00, 'Marca LOUIS VUITTON', 1, 'qr_202.png', '2025-12-06 11:26:57'),
(203, 'Polera', 'Blanco', 'Unica', 350.00, 'Pedreria en cuadrado', 1, 'qr_203.png', '2025-12-06 11:28:03'),
(204, 'Polera', 'Negro', 'Unica', 350.00, 'Pedreria en cuadrado', 1, 'qr_204.png', '2025-12-06 11:32:49'),
(205, 'Polera', 'Blanco', 'Unica', 350.00, 'Pedreria en cuadrado con marca COACH', 1, 'qr_205.png', '2025-12-06 11:34:19'),
(206, 'Polera', 'Negro', 'Unica', 350.00, 'Pedreria en cuadrado con marca COACH', 1, 'qr_206.png', '2025-12-06 11:35:18'),
(207, 'Polera', 'Blanco', 'Unica', 350.00, 'Pedreria en cuadrado con marca BURBERRY LONDON ENGLANO', 1, 'qr_207.png', '2025-12-06 11:36:51'),
(208, 'Polera', 'Beigs', 'Unica', 350.00, 'BURBERY Con estampa y pedreria', 1, 'qr_208.png', '2025-12-06 11:42:06'),
(209, 'Polera', 'Rojo', 'Unica', 350.00, 'BURBERY Con estampa y pedreria', 1, 'qr_209.png', '2025-12-06 11:42:44'),
(210, 'Polera', 'Beigs', 'Unica', 350.00, 'Pedreria Cuadrado con estampado burberry', 1, 'qr_210.png', '2025-12-06 11:44:30'),
(211, 'Conjunto Deportivo', 'Azul claro', 'S/M', 950.00, 'con cierre y negro con manga corta con rrayas blancas ', 1, 'qr_211.png', '2025-12-06 13:12:56'),
(212, 'Conjunto Deportivo', 'azul', 'S/M', 950.00, 'con cierre y blanco con manga corta con rrayas negras', 1, 'qr_212.png', '2025-12-06 13:15:59'),
(213, 'Conjunto Deportivo', 'azul', 'S/M', 950.00, 'con cierre y blanco con crema corta con rrayas blancas', 1, 'qr_213.png', '2025-12-06 13:17:07'),
(214, 'Conjunto Deportivo', 'Cafe', 'M', 950.00, 'cierra lineas blancas', 1, 'qr_214.png', '2025-12-06 13:18:19'),
(215, 'Conjunto Deportivo', 'Negro', 'M', 950.00, 'cierra lineas blancas', 1, 'qr_215.png', '2025-12-06 13:19:13'),
(217, 'Conjunto Deportivo', 'Negro', 'L', 850.00, 'Enterizo negro con letras de marcas alo', 1, 'qr_217.png', '2025-12-06 13:21:42'),
(218, 'Conjunto Deportivo', 'Blanco', 'M', 850.00, 'blanco con letras DYG', 1, 'qr_218.png', '2025-12-06 13:23:05'),
(219, 'Conjunto Deportivo', 'Negro', 'S', 850.00, 'Negro con letras DYG', 1, 'qr_219.png', '2025-12-06 13:23:58'),
(220, 'Conjunto Deportivo', 'Negro', 'S', 850.00, 'Prada Milano', 1, 'qr_220.png', '2025-12-06 13:26:08'),
(221, 'Conjunto Deportivo', 'Blanco', 'L', 950.00, 'Blanco con alrededor funcia y decorado en F al rededor', 1, 'qr_221.png', '2025-12-06 13:27:41'),
(222, 'Conjunto Deportivo', 'Negro', 'L', 950.00, 'Negro con alrededor Blanco y decorado en F al rededor', 1, 'qr_222.png', '2025-12-06 13:29:05'),
(223, 'Conjunto Deportivo', 'Blanco', 'L', 950.00, 'Chompa blanca y buso negro', 1, 'qr_223.png', '2025-12-06 13:30:49'),
(224, 'Conjunto Deportivo', 'Beigs claro', 'L', 950.00, 'chompa con cierre el buso con lineas rosas ', 1, 'qr_224.png', '2025-12-06 13:31:51'),
(225, 'Conjunto Deportivo', 'Negro', 'XL', 950.00, 'Marca Fendi negro enterizo', 1, 'qr_225.png', '2025-12-06 13:32:51'),
(226, 'Conjunto Deportivo', 'Negro', 'XL', 950.00, 'Lois vuitton negro enterizo', 1, 'qr_226.png', '2025-12-06 13:34:07'),
(228, 'Conjunto Deportivo', 'verde', 'XL', 950.00, 'es un chandal verde Marca alo', 1, 'qr_228.png', '2025-12-06 13:47:55'),
(229, 'Conjunto Deportivo', 'verde', 'XL', 950.00, 'Marca alo vere suave  Marca alo', 1, 'qr_229.png', '2025-12-06 13:49:19'),
(230, 'Conjunto Deportivo', 'Celeste suave', 'XL', 950.00, 'Marca alo Celeste suave  Marca alo', 1, 'qr_230.png', '2025-12-06 13:50:31'),
(231, 'Conjunto Deportivo', 'Negro', 'XL', 950.00, 'Marca alo negro  Marca alo', 1, 'qr_231.png', '2025-12-06 13:51:18'),
(232, 'Conjunto Deportivo', 'Beigs', 'M', 950.00, 'Marca alo begie suave', 1, 'qr_232.png', '2025-12-06 13:52:26'),
(233, 'Conjunto Deportivo', 'Rosa', 'XL', 950.00, 'Marca alo Rosa', 1, 'qr_233.png', '2025-12-06 13:53:20'),
(234, 'Conjunto Deportivo', 'Blanco', 'XL', 950.00, 'Marca Adidas con rrallas verdes ', 1, 'qr_234.png', '2025-12-06 13:54:16'),
(235, 'Conjunto Deportivo', 'Rosa', 'L', 950.00, 'Rosado claro marca alo y diceño de alo en todo el conjunto', 1, 'qr_235.png', '2025-12-06 13:55:43'),
(236, 'Conjunto Deportivo', 'gris', 'M', 950.00, 'gris claro marca alo y diceño de alo en todo el conjunto', 1, 'qr_236.png', '2025-12-06 13:57:18'),
(237, 'Conjunto Deportivo', 'Beigs', 'L', 950.00, ' marca alo y diceño de alo en todo el conjunto', 1, 'qr_237.png', '2025-12-06 13:58:31'),
(238, 'Conjunto Deportivo', 'Beigs', 'L', 950.00, 'Chanel color beigs claro con cierre', 1, 'qr_238.png', '2025-12-06 13:59:31'),
(239, 'Conjunto Deportivo', 'Negro', 'XXL', 950.00, 'Marca Chanel en negro', 1, 'qr_239.png', '2025-12-06 14:01:18'),
(240, 'Conjunto Deportivo', 'Celeste', 'L', 950.00, 'Marca prada', 1, 'qr_240.png', '2025-12-06 14:04:34'),
(241, 'Conjunto Deportivo', 'Beigs', 'L', 950.00, 'Marca Chanel  color beigs claro', 1, 'qr_241.png', '2025-12-06 14:05:34'),
(242, 'Conjunto Deportivo', 'Negro', 'L', 950.00, 'Dolce gabbana ', 1, 'qr_242.png', '2025-12-06 14:07:14'),
(243, 'Conjunto Deportivo', 'Amarillo claro', 'Unica', 950.00, 'marca miu miu ', 1, 'qr_243.png', '2025-12-06 14:08:12'),
(244, 'Conjunto Deportivo', 'Blanco', 'L', 950.00, 'marca louis vuitton', 1, 'qr_244.png', '2025-12-06 14:09:40'),
(245, 'Conjunto Deportivo', 'Crema', '2XL', 950.00, 'Marca miu miu ', 1, 'qr_245.png', '2025-12-06 14:12:02'),
(246, 'Conjunto Deportivo', 'Celeste', 'Unica', 950.00, 'Marca miumiu con decorado de tela blanca', 1, 'qr_246.png', '2025-12-06 14:13:03'),
(247, 'Conjunto Deportivo', 'Beigs', 'Unica', 950.00, 'Marca miumiu con decorado de tela blanca', 1, 'qr_247.png', '2025-12-06 14:13:51'),
(249, 'Conjunto top y pantalón', 'Amarillo', 'Unica', 950.00, 'conjunto top y pantalon acampanado amarillo con pedreria en forma de estrella y blanco al cotado del pantalon', 1, 'qr_249.png', '2025-12-06 14:23:20'),
(250, 'Conjunto top y pantalón', 'Beigs', 'Unica', 950.00, 'conjunto top y pantalon acampanado beigs  con pedreria en forma de estrella y beigs claro al costado del pantalon', 1, 'qr_250.png', '2025-12-06 14:25:14'),
(251, 'conjunto chaqueta ', 'Gris', 'Unica', 950.00, 'bolsillos frontales pedreria al cierre y al bolsillo del pantalon', 1, 'qr_251.png', '2025-12-06 14:27:45'),
(252, 'Conjunto Deportivo', 'Blanco', 'Unica', 950.00, 'Pedreria en forma de corazon en la  polera manga larga . El buso lineas amarillas y negras ', 1, 'qr_252.png', '2025-12-06 14:29:41'),
(253, 'Conjunto Deportivo', 'Negro', 'Unica', 950.00, 'pedreria en forma de corazon y en el pantalon lineas celeste y blanco', 1, 'qr_253.png', '2025-12-06 14:30:50'),
(254, 'Pantalón de pijama ', 'Blanco', 'Unica', 550.00, 'diseño de min min en todo el pantalon ', 2, 'qr_254.png', '2025-12-06 14:37:02'),
(255, 'Pantalon de pijama', 'Negro', 'Unica', 550.00, 'pedreria en forma de C y Cinvertida ', 1, 'qr_255.png', '2025-12-06 14:39:04'),
(256, 'pantalon de pijama', 'Negro', 'Unica', 550.00, 'diseño de Cy C invertida y al costado lineas blancas', 2, 'qr_256.png', '2025-12-06 14:40:25'),
(257, 'Pantalon pijama', 'Rosa pastel', 'Unica', 550.00, 'diseño de min min en todo el pantalon ', 1, 'qr_257.png', '2025-12-06 14:42:43'),
(258, 'Pantalon pijama', 'azul', 'Unica', 550.00, 'Pantalon pijama tipo jean con diseño de c y c invertida marca chanel', 1, 'qr_258.png', '2025-12-06 14:44:17'),
(259, 'Pantalon pijama', 'Negro', 'XL', 550.00, 'Marca alexanderwang y diseño del mismo ', 1, 'qr_259.png', '2025-12-06 14:45:40'),
(260, 'Pantalon pijama', 'Azul ', 'L', 550.00, 'color tipo jean con diseño de flores y marca Lois vuitton', 1, 'qr_260.png', '2025-12-06 14:47:25'),
(261, 'Buso', 'Blanco', 'Unica', 550.00, 'Marca prada y  blanco co lineas negras y cafe ala otra mitad beige, buso con acampanado', 1, 'qr_261.png', '2025-12-06 14:51:59'),
(265, 'Conjunto Deportivo', 'Negro', 'Unica', 850.00, 'chamarra con decorado de pedrería y cierre líneas blancas también en el short y bolsillo ', 1, 'qr_265.png', '2025-12-06 15:00:46'),
(266, 'Conjunto Deportivo', 'rosa', 'Unica', 850.00, 'chamarra con decorado de pedrería y cierre líneas blancas también en el short y bolsillo ', 1, 'qr_266.png', '2025-12-06 15:02:45'),
(267, 'pantalon', 'Blanco', 'Unica', 380.00, 'pedreria en letra de niw color Blanco entero', 1, 'qr_267.png', '2025-12-06 15:05:40'),
(268, 'Pantalon', 'Negro', 'Unica', 380.00, 'pedreria en letra de niw color negro entero', 1, 'qr_268.png', '2025-12-06 15:06:36'),
(269, 'Pantalon', 'Gris', 'S/M', 380.00, 'pedreria en letra de niw color  entero gris', 1, 'qr_269.png', '2025-12-06 15:07:24'),
(270, 'Conjunto Deportivo', 'Amarillo claro', 'Unica', 850.00, 'chamarra con decorado de pedrería y cierre líneas blancas también en el short y bolsillo ', 1, 'qr_270.png', '2025-12-06 15:08:52'),
(271, 'Conjunto Deportivo', 'Celeste', 'Unica', 850.00, 'chamarra con decorado de pedrería y cierre líneas blancas también en el short y bolsillo ', 1, 'qr_271.png', '2025-12-06 15:09:57'),
(272, 'Conjunto Deportivo', 'Blanco', 'Unica', 850.00, 'chamarra con decorado de pedrería y cierre líneas negras también en el short y bolsillo ', 1, 'qr_272.png', '2025-12-06 15:11:00'),
(273, 'Conjunto Deportivo', 'Negro', 'Unica', 950.00, 'Conjunto Deportivo alo negro con lineas blancas  verticales', 2, 'qr_273.png', '2025-12-06 15:19:23'),
(274, 'Conjunto Deportivo', 'Beigs', 'Unica', 950.00, 'Conjunto Deportivo alo negro con lineas negras', 1, 'qr_274.png', '2025-12-06 15:20:07'),
(275, 'Conjunto Deportivo', 'Amarillo', 'Unica', 950.00, 'Conjunto Deportivo alo amarillo con lineas blancas ', 1, 'qr_275.png', '2025-12-06 15:23:51'),
(276, 'Conjunto Deportivo', 'Negro', 'Unica', 950.00, 'Conjunto Deportivo alo negro con lineas blancas horizontales', 1, 'qr_276.png', '2025-12-06 15:24:18'),
(277, 'Conjunto Deportivo', 'Rojo', 'Unica', 950.00, 'Conjunto Deportivo alo rojo con lineas blancas horizontales', 1, 'qr_277.png', '2025-12-06 15:27:17'),
(278, 'Conjunto Deportivo', 'Azul ', 'Unica', 950.00, 'Azul verdoso Conjunto Deportivo alo  con lineas blancas  vertical', 1, 'qr_278.png', '2025-12-06 15:30:44'),
(279, 'Conjunto Deportivo', 'Gris', 'Unica', 950.00, 'Conjunto Deportivo alo gris con lineas blancas horizontales', 1, 'qr_279.png', '2025-12-06 15:31:36'),
(280, 'Conjunto Deportivo', 'azul', 'Unica', 950.00, 'Azul marino  Conjunto Deportivo alo', 1, 'qr_280.png', '2025-12-06 15:33:56'),
(281, 'Conjunto Deportivo', 'Celeste', 'Unica', 450.00, 'lineas de tela horizontales ', 1, 'qr_281.png', '2025-12-06 15:39:26'),
(282, 'Conjunto Deportivo', 'Blanco', 'Unica', 450.00, 'lineas de tela horizontales  polera blanca corta con pantantalon rosa', 1, 'qr_282.png', '2025-12-06 15:41:25'),
(283, 'Conjunto Deportivo', 'Blanco', 'Unica', 850.00, 'Marca alo con lineas verticales', 1, 'qr_283.png', '2025-12-06 15:48:55'),
(284, 'Conjunto Deportivo', 'Negro', 'Unica', 850.00, 'Marca alo líneas verticales', 1, 'qr_284.png', '2025-12-06 15:50:02'),
(285, 'Conjunto Deportivo', 'Negro', 'Unica', 850.00, 'Marca alo con lineas verticales', 1, 'qr_285.png', '2025-12-06 15:50:47'),
(286, 'Conjunto Deportivo', 'Beigs', 'M', 950.00, 'Conjunto Deportivo TOP Y PANTALETA GEIGS', 1, 'qr_286.png', '2025-12-06 15:52:16'),
(287, 'Conjunto Deportivo', 'Marron', 'Unica', 950.00, 'Marca alo ', 1, 'qr_287.png', '2025-12-06 15:53:50'),
(288, 'Conjunto Deportivo', 'Plomo', 'M', 950.00, 'Marca alo con lineas blancas', 1, 'qr_288.png', '2025-12-06 15:55:03'),
(289, 'Conjunto Deportivo', 'plomo', 'S', 950.00, 'Marca alo con lineas blancas', 1, 'qr_289.png', '2025-12-06 15:55:52'),
(290, 'Enterizo', 'Rosa', 'Unica', 450.00, 'espalda descubierta', 1, 'qr_290.png', '2025-12-06 16:01:56'),
(291, 'Conjunto Deportivo', 'Negro', 'Unica', 450.00, 'espalda descubierta', 1, 'qr_291.png', '2025-12-06 16:02:43'),
(292, 'Enterizo', 'Negro', 'Unica', 350.00, 'Espalda descubierta con tirantes', 2, 'qr_292.png', '2025-12-06 16:04:26'),
(293, 'Enterizo', 'Cafe', 'Unica', 450.00, 'tirantes en la espalda descubierta', 1, 'qr_293.png', '2025-12-06 16:07:11'),
(294, 'Conjunto Deportivo', 'Cafe', 'Unica', 450.00, 'tiras en la espalda ', 1, 'qr_294.png', '2025-12-06 16:08:36'),
(295, 'Conjunto Deportivo', 'Beigs', 'Unica', 450.00, '1 tira en el hombro', 1, 'qr_295.png', '2025-12-06 16:11:37'),
(296, 'Enterizo Deportivo', 'Celeste', 'Unica', 350.00, 'Corto de color celeste espalda Abierta', 1, 'qr_296.png', '2025-12-06 16:18:53'),
(297, 'Enterizo Deportivo', 'Amarillo', 'Unica', 350.00, 'Corto de color celeste espalda Abierta', 1, 'qr_297.png', '2025-12-06 16:19:23'),
(298, 'Enterizo Deportivo', 'Rojo', 'Unica', 350.00, 'Corto de color celeste espalda Abierta tipo amallado por atras', 1, 'qr_298.png', '2025-12-06 16:20:03'),
(299, 'Enterizo Deportivo', 'Verde', 'Unico', 350.00, 'Corto de color celeste espalda Abierta', 1, 'qr_299.png', '2025-12-06 16:20:50'),
(300, 'Enterizo Deportivo', 'Negro', 'Unica', 350.00, 'Corto de color celeste espalda Abierta', 1, 'qr_300.png', '2025-12-06 16:21:20'),
(301, 'Enterizo Deportivo', 'Verde Oscuro', 'Unica', 350.00, 'Corto de color celeste espalda Abierta', 1, 'qr_301.png', '2025-12-06 16:22:10'),
(302, 'Conjunto Deportivo', 'Negro', 'Unica', 850.00, 'Con cremallera con linea blanca', 1, 'qr_302.png', '2025-12-06 16:23:24'),
(303, 'Conjunto Deportivo', 'Plomo', 'Unica', 850.00, 'marca alo diseño con plomo oscuro', 1, 'qr_303.png', '2025-12-06 16:25:28'),
(304, 'Conjunto Deportivo', 'Azul Marino', 'Unica', 850.00, 'De la marco alo en alrededor de la citura es rojo', 1, 'qr_304.png', '2025-12-06 16:30:06'),
(305, 'Conjunto Deportivo', 'Blanco', 'Unica', 950.00, 'Con lineas verticales', 1, 'qr_305.png', '2025-12-06 16:31:55'),
(306, 'Conjunto Deportivo', 'Plomo', 'Unica', 950.00, 'Top con pantalon plomo', 1, 'qr_306.png', '2025-12-06 16:32:49'),
(307, 'Mangalarga', 'Negro', 'Unica', 300.00, 'Chompa negro enterizo', 3, 'qr_307.png', '2025-12-06 16:35:14'),
(308, 'Mangalarga', 'Negro', 'Unica', 380.00, 'Marca alo ', 1, 'qr_308.png', '2025-12-06 16:36:54'),
(309, 'Body', 'blanco', 'Unica', 350.00, 'Cuello de tortuga', 1, 'qr_309.png', '2025-12-06 16:43:05'),
(310, 'Body', 'Negro', 'Unica', 350.00, 'Encaje con diseño de pedrerias 80', 2, 'qr_310.png', '2025-12-06 16:44:26'),
(311, 'Body', 'Blanco', 'Unica', 350.00, 'Pedreria en nummero 80', 2, 'qr_311.png', '2025-12-06 16:45:17'),
(312, 'Polerita', 'Blanco', 'Unica', 350.00, 'Degradado amarillo con pedreria', 1, 'qr_312.png', '2025-12-06 16:47:37'),
(313, 'Polera', 'Beigs', 'Unica', 350.00, 'Coon marca MichaelKors', 1, 'qr_313.png', '2025-12-06 16:48:48'),
(314, 'Polerita', 'Negro', 'Unica', 350.00, 'Marca alo manga corta', 1, 'qr_314.png', '2025-12-06 16:49:41'),
(315, 'Polerita', 'Crema', 'Unica', 350.00, 'Marca alo ', 1, 'qr_315.png', '2025-12-06 16:50:29'),
(316, 'Polerita', 'Blanco', 'Unica', 350.00, 'con letra de Michael Kors', 1, 'qr_316.png', '2025-12-06 16:51:55'),
(317, 'Polerita', 'Negro', 'Unica', 350.00, 'con letra de Michael Kors', 1, 'qr_317.png', '2025-12-06 16:52:20'),
(318, 'Polerita', 'Rojo', 'Unica', 350.00, 'con letra de Michael Kors', 1, 'qr_318.png', '2025-12-06 16:52:41'),
(319, 'Polerita ', 'Blanca Mangalarga', 'Unica', 300.00, 'Cuello cuadrado ', 1, 'qr_319.png', '2025-12-06 16:58:33'),
(320, 'Polera', 'Negro', 'Unica', 380.00, 'Encaje amallado con jeans con pedreria', 1, 'qr_320.png', '2025-12-06 16:59:44'),
(321, 'Polera', 'Blanco', 'Unica', 380.00, 'Encaje amallado con jeans con pedreria', 1, 'qr_321.png', '2025-12-06 17:00:29'),
(322, 'Polera ', 'Blanco', 'Unica', 380.00, 'Con la manga larga con diseño pedreada', 1, 'qr_322.png', '2025-12-06 17:01:19'),
(323, 'Polera', 'Blanco', 'Unica', 350.00, 'Con manga larga amallado', 1, 'qr_323.png', '2025-12-06 17:02:03'),
(324, 'Polera', 'Rojo', 'Unica', 350.00, 'manga larga amallado', 1, 'qr_324.png', '2025-12-06 17:03:02'),
(325, 'Blusa manga larga', 'negro', 'unica', 280.00, 'escotada  la blusa corta', 1, 'qr_325.png', '2025-12-06 17:04:17'),
(327, 'Blusa manga larga', 'Blanco', 'Unica', 280.00, 'escotada  la blusa corta', 1, 'qr_327.png', '2025-12-06 17:11:42'),
(328, 'Camisa', 'Negro', 'Unico', 350.00, 'Manga larga escotado cadete', 1, 'qr_328.png', '2025-12-06 17:12:53'),
(329, 'Camisa', 'Negro', 'Unica', 350.00, 'Pedreria en los bolsillo y marca Celine Paris', 1, 'qr_329.png', '2025-12-06 17:13:53'),
(330, 'Blusa', 'Negro', 'Unica', 350.00, 'Escotado con tiras adelante', 1, 'qr_330.png', '2025-12-06 17:14:39'),
(331, 'Top ', 'Beigs', 'Unica', 320.00, 'Top con encaje escotado ', 1, 'qr_331.png', '2025-12-06 17:18:23'),
(332, 'Top', 'Blanco', 'Unica', 300.00, 'con cuello cadete', 1, 'qr_332.png', '2025-12-06 17:22:27'),
(333, 'Top', 'Cafe', 'Unica', 300.00, 'con cuello cadete', 1, 'qr_333.png', '2025-12-06 17:23:14'),
(334, 'Camisa', 'Rojo', 'Unica', 350.00, 'Empedrado en el cuello en la manga ', 1, 'qr_334.png', '2025-12-06 17:24:20'),
(335, 'Camisa', 'Blanco', 'Unica', 350.00, 'Empedrado en el cuello en la manga ', 1, 'qr_335.png', '2025-12-06 17:24:43'),
(336, 'Polera ', 'Lila', 'S', 300.00, 'Marca alo con lentejuelas', 1, 'qr_336.png', '2025-12-06 17:26:01'),
(337, 'Camisa', 'negro', 'Unica', 350.00, 'Con cuello beigs con pedreria en los borsillos', 1, 'qr_337.png', '2025-12-06 17:27:03'),
(338, 'Polera corta', 'Negro', 'M', 300.00, 'Marca Fendy', 1, 'qr_338.png', '2025-12-06 17:29:02'),
(339, 'Camisa corta', 'negro', 'Unica', 350.00, 'Pedreria en cuello y bolsillo delantero marca VERSAGE', 1, 'qr_339.png', '2025-12-06 17:30:23'),
(340, 'Polera corta', 'Celeste', 'S', 300.00, 'Marca Kemzo', 1, 'qr_340.png', '2025-12-06 17:31:07'),
(341, 'Polera', 'naranja claro', '2XL', 300.00, 'Marca Hugo Boss', 1, 'qr_341.png', '2025-12-06 17:32:39'),
(342, 'Camisa ', 'Blanco ', 'Unica', 350.00, 'en pedreria en el bolsillo cuello cadete', 1, 'qr_342.png', '2025-12-06 17:33:43'),
(343, 'Polera', 'Rosa', 'Unica', 350.00, 'Pedreria en marca COACH ', 1, 'qr_343.png', '2025-12-06 17:35:08'),
(344, 'Polera', 'Verde', 'Unica', 350.00, 'Pedreria en marca COACH ', 1, 'qr_344.png', '2025-12-06 17:35:40'),
(345, 'Polera', 'negro', 'Unica', 350.00, 'Pedreria en marca COACH ', 1, 'qr_345.png', '2025-12-06 17:36:06'),
(346, 'Polera', 'Amarillo', 'Unica', 350.00, 'Pedreria en marca COACH ', 1, 'qr_346.png', '2025-12-06 17:36:40'),
(347, 'Blusa', 'Blanco', 'Unica', 350.00, 'marca Guess pedreria en bolsillo', 1, 'qr_347.png', '2025-12-06 17:38:20'),
(348, 'Camisa', 'Blanco', 'Unica', 350.00, 'Cuello azul , pedreria en bolsillo', 1, 'qr_348.png', '2025-12-06 17:40:30'),
(349, 'Blusa corta', 'Marron', 'Unica', 350.00, 'Botones frontales y detalles de evilla', 1, 'qr_349.png', '2025-12-06 17:44:46'),
(350, 'Chaleco', 'Azul', 'unica', 350.00, 'Cuello en V tela brillante', 1, 'qr_350.png', '2025-12-06 17:45:50'),
(351, 'Corset', 'Beigs', 'Unica', 350.00, 'Perlas , pedreria en los bordes marca Dayligth', 1, 'qr_351.png', '2025-12-06 17:49:02'),
(352, 'Corset', 'Negro', 'Unica', 350.00, 'Perlas , pedreria en los bordes marca Dayligth', 1, 'qr_352.png', '2025-12-06 17:49:39'),
(353, 'Corset', 'Blanco', 'Crema', 350.00, 'Perlas , pedreria en los bordes marca Dayligth', 1, 'qr_353.png', '2025-12-06 17:51:23'),
(354, 'Corset', 'Beigs', 'Unica', 350.00, 'Tirantes ajustables con escote  ', 1, 'qr_354.png', '2025-12-06 17:52:24'),
(355, 'Corset', 'Griss', 'Unica', 350.00, 'Tirantes ajustables con escote  ', 1, 'qr_355.png', '2025-12-06 17:53:04'),
(356, 'Corset', 'Rosa', 'Unica', 350.00, 'Tirantes ajustables con escote  ', 1, 'qr_356.png', '2025-12-06 17:53:30'),
(357, 'Polera', 'Beigs', 'Unica', 350.00, 'Marca Dolce Gabbana con pedreria', 1, 'qr_357.png', '2025-12-06 17:54:25'),
(358, 'Polera', 'Celeste ', 'Unica', 350.00, 'Marca coco Chanel con pedreria', 1, 'qr_358.png', '2025-12-06 17:55:18'),
(359, 'Polera', 'Amarillo', 'unica', 350.00, 'estampado FENDI ROMA', 1, 'qr_359.png', '2025-12-06 17:56:02'),
(360, 'Polera', 'Blanco', 'unica ', 350.00, 'estampado FENDI ROMA', 1, 'qr_360.png', '2025-12-06 17:57:13'),
(361, 'Polera ', 'Azul', 'Unica ', 350.00, 'pedreria en coco Chanel', 1, 'qr_361.png', '2025-12-06 17:58:00'),
(362, 'Polera', 'Rosa', 'Unica', 350.00, 'Pedreria en la parte superior letra QUIN', 1, 'qr_362.png', '2025-12-06 17:58:41'),
(363, 'Polera', 'Amarillo', 'Unica', 350.00, 'Pedreria en la parte superior numero 5', 1, 'qr_363.png', '2025-12-06 18:00:09'),
(364, 'Polera', 'Amarillo', 'unica', 350.00, 'Pedreria en la marca CHANNEL', 1, 'qr_364.png', '2025-12-06 18:01:15'),
(365, 'Plera', 'Blanco', 'Unica', 350.00, ' logo de Versage', 1, 'qr_365.png', '2025-12-06 18:02:11'),
(366, 'Polera', 'Verde', 'Unica', 350.00, 'Con cuello con logo Versage', 1, 'qr_366.png', '2025-12-06 18:03:14'),
(367, 'Polera', 'Rojo', 'Unica', 350.00, 'Con cuello con logo Versage', 1, 'qr_367.png', '2025-12-06 18:03:33'),
(368, 'Polera', 'Negro', 'Unica', 350.00, 'Con cuello con logo Versage', 1, 'qr_368.png', '2025-12-06 18:03:56'),
(369, 'Polera', 'Blanco', 'Unica', 350.00, 'Pedreria en bolillo con linea sencilla', 1, 'qr_369.png', '2025-12-06 18:04:47'),
(370, 'Polera', 'negro', 'Unica', 350.00, 'maca Dolce Gabbana', 1, 'qr_370.png', '2025-12-06 18:05:39'),
(371, 'Polera', 'Blanco', 'Unica', 350.00, 'maca Dolce Gabbana', 1, 'qr_371.png', '2025-12-06 18:06:10'),
(372, 'Polera ', 'Banco', 'unica', 350.00, 'marca GUCCI ,con ebillla', 1, 'qr_372.png', '2025-12-06 18:07:32'),
(373, 'Polera', 'Negro', 'Unica', 350.00, 'marca GUCCI ,con ebillla', 0, 'qr_373.png', '2025-12-06 18:08:07'),
(374, 'Polera', 'Rojo', 'Unica', 350.00, 'marca GUCCI ,con ebillla', 1, 'qr_374.png', '2025-12-06 18:08:36'),
(375, 'Polera', 'Blanco', 'Unica', 300.00, 'Marca Channel en la parte inferior', 0, 'qr_375.png', '2025-12-06 18:15:52'),
(377, 'Polera', 'Beigs', 'Unica', 300.00, 'Marca Gucci y tirants en la parte inferior', 1, 'qr_377.png', '2025-12-06 18:18:06'),
(378, 'Polera', 'Blanco', 'Unica', 300.00, 'Marca Gucci y tirants en la parte inferior', 1, 'qr_378.png', '2025-12-06 18:18:31'),
(379, 'Polera', 'Negro', 'Unica', 300.00, 'Marca Gucci y tirants en la parte inferior', 1, 'qr_379.png', '2025-12-06 18:18:55'),
(380, 'Polera Corta', 'Rosa', 'Unica', 350.00, 'Pedreria en la parte inferior', 1, 'qr_380.png', '2025-12-06 18:20:24'),
(381, 'Polera Corta', 'Griss', 'Unica', 350.00, 'Pedreria en la parte inferior', 0, 'qr_381.png', '2025-12-06 18:20:58'),
(382, 'Polera', 'Blanca', 'Unica', 300.00, 'Corta con dibujos con 2 tiras en la parte inferior', 1, 'qr_382.png', '2025-12-06 18:21:54'),
(383, 'Polera', 'Blanco', 'Unica', 380.00, 'con nombre y dibujos de monster', 1, 'qr_383.png', '2025-12-06 18:23:11'),
(384, 'Lenceria', 'Beigs', 'Unica', 150.00, 'Victoria Secret', 2, 'qr_384.png', '2025-12-06 18:40:59'),
(385, 'Lenceria', 'Rosa Suave', 'unica', 180.00, 'Victoria secret con franjas blancas', 3, 'qr_385.png', '2025-12-06 18:43:59'),
(386, 'Lenceria', 'Blanco', 'unica', 180.00, 'Victoria Secret', 1, 'qr_386.png', '2025-12-06 18:44:49'),
(387, 'lenceria', 'Negro', 'unica', 180.00, 'Victoria Secret', 1, 'qr_387.png', '2025-12-06 18:45:25'),
(389, 'lenceria', 'Celeste', 'unica', 150.00, 'Victoria Secret', 2, 'qr_389.png', '2025-12-06 18:47:13'),
(390, 'Lenceria', 'Azul', 'Unica', 150.00, 'Victoria Secret', 1, 'qr_390.png', '2025-12-06 18:51:19'),
(391, 'Lenceria', 'Rojo', 'Unica', 150.00, 'Victoria Secret', 2, 'qr_391.png', '2025-12-06 18:52:11'),
(392, 'Lenceria', 'Blanco', 'Unica', 150.00, 'Victoria Secret', 4, 'qr_392.png', '2025-12-06 18:54:00'),
(393, 'Lenceria', 'Azual Verdoso', 'Unica', 150.00, 'Victoria Secret', 1, 'qr_393.png', '2025-12-06 18:55:29'),
(394, 'Lenceria', 'Negro', 'Unica', 150.00, 'Victoria Secret', 6, 'qr_394.png', '2025-12-06 18:56:42'),
(395, 'lenceria', 'rojo', 'Unica', 350.00, 'Victoria secret conjunto', 0, 'qr_395.png', '2025-12-06 18:58:14'),
(396, 'Lenceria', 'Blanco', 'Unica', 350.00, 'Victoria Secret conjunto', 2, 'qr_396.png', '2025-12-06 19:01:19'),
(397, 'Lenceria', 'Negro', 'Unica', 350.00, 'Victoria Secret conjunto', 1, 'qr_397.png', '2025-12-06 19:01:37'),
(398, 'Lenceria', 'Rosado', 'Unica', 350.00, 'Victoria Secret conjunto', 1, 'qr_398.png', '2025-12-06 19:02:11'),
(399, 'Falda', 'Azul', 'Unica', 450.00, 'Falda jeans con brillos', 1, 'qr_399.png', '2025-12-10 19:24:46'),
(400, 'Falda', 'Azul', 'Unica', 550.00, 'Falda jeans short con brillos ', 2, 'qr_400.png', '2025-12-10 19:26:06'),
(402, 'Conjunto', 'Azul', 'Unica', 1300.00, 'Chaqueta jeans azul con pantalon con detalles de piedreria', 1, 'qr_402.png', '2025-12-10 19:54:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'administrador'),
(2, 'vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `ci` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `activo` tinyint(4) DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `usuario`, `correo`, `ci`, `password`, `id_rol`, `activo`, `fecha_registro`) VALUES
(1, 'Ruben', 'Felipe', 'felipe74', 'felipe@lojainy.com', '9391668', '$2b$10$IasIpv5NlQWIKETDy9EdH.rudgMxR2ipbjbgqTmtaVw3XI/6OgFLS', 1, 1, '2025-12-05 14:54:41'),
(2, 'Sara', 'Abigail', 'sabigail29', 'sabigail29@lojainy.com', '93921929', '$2b$10$KHTKOuiFg5VpU7eGYcWspuP9M2ACegt8SHKzjL0lIFzYa7ELgCsVG', 2, 1, '2025-12-05 17:06:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `metodo_pago` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_usuario`, `fecha`, `metodo_pago`, `total`) VALUES
(1, 1, '2025-12-06 16:33:04', 'efectivo', 950.00),
(2, 1, '2025-12-06 17:20:32', 'efectivo', 1650.00),
(3, 1, '2025-12-06 23:32:51', 'efectivo', 1350.00),
(4, 1, '2025-12-07 01:26:59', 'efectivo', 350.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `codigo_qr` (`codigo_qr`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
