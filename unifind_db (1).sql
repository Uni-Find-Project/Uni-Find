-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2026 at 02:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unifind_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `item_date` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `type`, `name`, `category`, `location`, `item_date`, `description`, `image`, `created_at`) VALUES
(1, 'Lost', 'bottel', 'Personal items', 'Central Library', '2026-10-06', 'missing', '', '2026-10-24 17:17:39'),
(2, 'Lost', 'bottel', 'Personal items', 'Sports Centre', '2026-10-06', 'lost', '', '2026-10-25 13:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Maleesha Rukshani', 'malee@sabaragamuwa.edu', '$2y$10$5X7n7cuWlz4vR9bBFUpeFe4VyM5RP4SbqbsNfsCtpMFhcUu4jmhKO', '2026-10-24 15:59:25'),
(2, 'Maleesha', 'malee123@gmail.com', '$2y$10$OIykZGNuMSJNvYASft/ByujW5dgCozPRbQfhiQiCHe2Fm7jdI2.3a', '2026-10-25 12:55:52'),
(3, 'Maleesha', 'malee@sab.ac.lk', '$2y$10$GL6gl.kErJs0DA03.8CMEu7GyYkRkRVMqKpBZLiXPM/XYTTM6E2nm', '2026-10-25 13:13:15'),
(4, 'Maleesha', 'malee@gmail.com', '$2y$10$cC9YUU.pEMOXJ6MFwCZOv.PO07jPPicRFotT/SDR0s6FeoLu5NXX6', '2026-10-25 13:31:33'),
(5, 'Pawani Sakura', 'rathnayakesakura@gmail.com', '$2y$10$/6vNepGfPo8OauloFmCOP.fH3a072QXXVZoCUnytruVRpXdfb1Ue2', '2026-10-25 13:40:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
