-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016 年 1 月 21 日 05:55
-- サーバのバージョン： 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Accumile`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `login_datas`
--

CREATE TABLE `login_datas` (
  `id` int(11) NOT NULL,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- テーブルのデータのダンプ `login_datas`
--

INSERT INTO `login_datas` (`id`, `name`, `email`, `pass`) VALUES
(4, 'test', 'test.com', 'hoge');

-- --------------------------------------------------------

--
-- テーブルの構造 `skill_data`
--

CREATE TABLE `skill_data` (
  `id` int(11) NOT NULL,
  `date` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `skill_title` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `hours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- テーブルのデータのダンプ `skill_data`
--

INSERT INTO `skill_data` (`id`, `date`, `skill_title`, `hours`) VALUES
(10, '2016/01/14', 'test2', 50),
(17, '2016/01/15', 'test2', 10),
(21, '2016/01/16', 'test2', 7),
(22, '2016/01/19', 'test2', 8);

-- --------------------------------------------------------

--
-- テーブルの構造 `skill_titles`
--

CREATE TABLE `skill_titles` (
  `id` int(11) NOT NULL,
  `skill_title` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- テーブルのデータのダンプ `skill_titles`
--

INSERT INTO `skill_titles` (`id`, `skill_title`) VALUES
(24, 'test2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_datas`
--
ALTER TABLE `login_datas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill_data`
--
ALTER TABLE `skill_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill_titles`
--
ALTER TABLE `skill_titles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skill_title` (`skill_title`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_datas`
--
ALTER TABLE `login_datas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `skill_data`
--
ALTER TABLE `skill_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `skill_titles`
--
ALTER TABLE `skill_titles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
