-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2025 at 03:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enrollment_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `house_number` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `subdivision` varchar(255) DEFAULT NULL,
  `barangay` varchar(255) NOT NULL,
  `municipality` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `student_id`, `house_number`, `street`, `subdivision`, `barangay`, `municipality`, `zip_code`, `created_at`, `updated_at`) VALUES
(49, 54, 'asdsa', 'asdasdasdsad', 'asdsad', 'asd', 'asdsad', '1231', '2025-01-10 16:03:12', '2025-01-10 16:03:12'),
(50, 55, 'asdsa', 'asdasdasdsad', 'asdsad', 'asd', 'asdsad', '1231', '2025-01-10 16:03:13', '2025-01-10 16:03:13'),
(51, 56, 'asdsa', 'asdasdasdsad', 'asdsad', 'asd', 'asdsad', '1231', '2025-01-10 16:03:13', '2025-01-10 16:03:13'),
(52, 57, 'asdsa', 'asdasdasdsad', 'asdsad', 'asd', 'asdsad', '1231', '2025-01-10 16:03:14', '2025-01-10 16:03:14');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('faculty','officer','admin') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `CreditUnitsLec` int(11) NOT NULL,
  `CreditUnitsLab` int(11) NOT NULL,
  `ContactHoursLec` int(11) NOT NULL,
  `ContactHoursLab` int(11) NOT NULL,
  `Prerequisite` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `program` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `program` varchar(255) NOT NULL,
  `semester` enum('First Semester','Second Semester','Third Semester','Fourth Semester') NOT NULL,
  `year` enum('First Year','Second Year','Third Year','Fourth Year') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guardians`
--

CREATE TABLE `guardians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guardians`
--

INSERT INTO `guardians` (`id`, `student_id`, `name`, `phone`, `religion`, `created_at`, `updated_at`) VALUES
(50, 54, 'Jojo', '09402204924', 'Catholic', '2025-01-10 16:03:12', '2025-01-10 16:03:12'),
(51, 55, 'Jojo', '09402204924', 'Catholic', '2025-01-10 16:03:13', '2025-01-10 16:03:13'),
(52, 56, 'Jojo', '09402204924', 'Catholic', '2025-01-10 16:03:13', '2025-01-10 16:03:13'),
(53, 57, 'Jojo', '09402204924', 'Catholic', '2025-01-10 16:03:14', '2025-01-10 16:03:14');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(22, '2014_10_12_000000_create_users_table', 1),
(23, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(24, '2019_08_19_000000_create_failed_jobs_table', 1),
(25, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(26, '2024_10_22_053318_add_role_to_users_table', 1),
(27, '2024_10_22_064337_create_permission_tables', 1),
(28, '2024_10_30_053257_create_students_table', 1),
(29, '2024_10_30_053434_create_guardians_table', 1),
(30, '2024_10_30_055151_create_addresses_table', 1),
(31, '2024_10_30_055248_create_payments_table', 1),
(32, '2024_10_31_065735_create_courses_table', 1),
(33, '2024_10_31_080438_create_curriculum_table', 1),
(34, '2024_10_31_081005_add_program_semester_year_to_courses_table', 1),
(35, '2024_11_25_172057_create_notifications_table', 1),
(36, '2024_11_25_174620_add_student_details_to_users_table', 1),
(37, '2024_11_26_040544_add_status_to_payments_table', 1),
(38, '2024_11_26_075301_add_student_id_to_users_table', 1),
(39, '2024_11_26_084618_add_archived_to_students_table', 1),
(40, '2024_11_26_085418_add_read_to_notifications_table', 1),
(41, '2024_11_28_045609_add_status_to_students_table', 1),
(42, '2024_11_28_163953_rename_status_column_in_payments_table', 1),
(43, '2024_12_01_051947_add_user_id_to_students_table', 2),
(44, '2024_12_01_111617_create_students_soc_fees_table', 3),
(45, '2024_12_03_075125_create_admins_table', 4),
(46, '2024_12_03_123341_create_admins_table', 5),
(47, '2024_12_03_132538_add_year_level_and_semester_to_students_table', 6),
(48, '2024_12_03_142512_add_program_to_students_table', 7),
(49, '2024_12_09_065347_create_sessions_table', 8),
(50, '2025_01_08_095543_create_student_details_table', 9),
(51, '2025_01_08_101814_add_fields_to_student_details_table', 10),
(52, '2025_01_10_141350_add_faculty_status_to_students_table', 11),
(53, '2025_01_10_145336_add_statuses_to_student_details_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(3, 'App\\Models\\User', 2),
(4, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `reference_number` varchar(255) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payment_status` enum('pending','approved','declined') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `student_id`, `mobile_number`, `sender_name`, `reference_number`, `amount`, `created_at`, `updated_at`, `payment_status`) VALUES
(49, 54, '09761316865', 'asdasd213123', '1231', 23.00, '2025-01-10 16:03:12', '2025-01-10 16:03:12', 'pending'),
(50, 55, '09761316865', 'asdasd213123', '1231', 23.00, '2025-01-10 16:03:13', '2025-01-10 16:03:13', 'pending'),
(51, 56, '09761316865', 'asdasd213123', '1231', 23.00, '2025-01-10 16:03:13', '2025-01-10 16:03:13', 'pending'),
(52, 57, '09761316865', 'asdasd213123', '1231', 23.00, '2025-01-10 16:03:14', '2025-01-10 16:03:14', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(3, 'App\\Models\\User', 3, 'API Token', 'aa9070ca912c6d9e2b980026bc6609f60533866f0b3eaf8365941c49d5193d59', '[\"*\"]', NULL, NULL, '2024-11-28 09:38:13', '2024-11-28 09:38:13'),
(4, 'App\\Models\\User', 3, 'API Token', '64869a73bf9abe15da73421194387845e082b2b94bed98749c837b7d502c537b', '[\"*\"]', NULL, NULL, '2024-11-28 20:49:19', '2024-11-28 20:49:19'),
(5, 'App\\Models\\User', 2, 'API Token', 'bf861bf013e31c6add78fad9fdcf24edeaae5be390e2c26ad1e4fd3ab31705c9', '[\"*\"]', NULL, NULL, '2024-11-28 21:01:39', '2024-11-28 21:01:39'),
(6, 'App\\Models\\User', 3, 'API Token', '1d8c9577f7e9ed5e106c5b86bf642739d9ed81930fe613d8fb8f941618490fd8', '[\"*\"]', NULL, NULL, '2024-11-28 21:03:30', '2024-11-28 21:03:30'),
(12, 'App\\Models\\User', 3, 'API Token', '8314d1ff9af2332982213075b86a3060819e202c10b50354841eb91bcda75241', '[\"*\"]', NULL, NULL, '2024-11-30 04:13:10', '2024-11-30 04:13:10'),
(13, 'App\\Models\\User', 3, 'API Token', '5b4c4b94221c477852b61b39b21d09fb20a26e5dccb0efde5971222700c708f7', '[\"*\"]', NULL, NULL, '2024-11-30 04:13:11', '2024-11-30 04:13:11'),
(14, 'App\\Models\\User', 3, 'API Token', '640b62b29982557e384c7233affb3e4a2f79cf336bf6914aaa8097e8fb4c7def', '[\"*\"]', NULL, NULL, '2024-11-30 04:13:12', '2024-11-30 04:13:12'),
(31, 'App\\Models\\User', 5, 'API Token', 'e34a133216863a927d77d3a0f25df6318812f138e0e85899bff4a795da110567', '[\"*\"]', '2024-12-01 01:21:34', NULL, '2024-12-01 00:20:52', '2024-12-01 01:21:34'),
(32, 'App\\Models\\User', 2, 'API Token', '571e03daf759f3c8574cd6c00571a6e43c150e1e520577a43ee8dc1682bc798f', '[\"*\"]', NULL, NULL, '2024-12-01 01:28:57', '2024-12-01 01:28:57'),
(33, 'App\\Models\\User', 3, 'API Token', '529767fb05edeca60f93c0ca107c673c76c6637ea3388b675a3de2af92410934', '[\"*\"]', NULL, NULL, '2024-12-02 23:15:01', '2024-12-02 23:15:01'),
(34, 'App\\Models\\User', 5, 'API Token', '3c8bf552b258cc74b74edb54db045881bc9e7409de4a5de9f07e5c15a3ec8dd0', '[\"*\"]', '2024-12-02 23:15:22', NULL, '2024-12-02 23:15:17', '2024-12-02 23:15:22'),
(35, 'App\\Models\\User', 2, 'API Token', 'e051b60fbb34db116dc097e9908447f7ebf9b257242b008a46ef6c33cd9fe278', '[\"*\"]', NULL, NULL, '2024-12-02 23:17:47', '2024-12-02 23:17:47'),
(36, 'App\\Models\\User', 2, 'API Token', 'c1c242ad3b52ebd67489812d960d5b08c1f995a3aee7f90e3f1bbf7113ce9ea0', '[\"*\"]', NULL, NULL, '2024-12-02 23:17:49', '2024-12-02 23:17:49'),
(37, 'App\\Models\\User', 2, 'API Token', 'feb34f27821611066e0448abd6345e0626c6a28a4923b3b687a4d706c131513e', '[\"*\"]', NULL, NULL, '2024-12-02 23:17:49', '2024-12-02 23:17:49'),
(39, 'App\\Models\\User', 5, 'API Token', '2ea1a1986a6e0e4e322eae6a8790ba3a67991085986388a6eda3d7a3a14e4540', '[\"*\"]', '2024-12-03 00:24:20', NULL, '2024-12-02 23:40:08', '2024-12-03 00:24:20'),
(40, 'App\\Models\\User', 2, 'API Token', 'ca1f1fa80585bc2a311dd02e8d0a0b80bd9a1420d2c37b3b5f8d1549d16a2253', '[\"*\"]', NULL, NULL, '2024-12-03 00:31:44', '2024-12-03 00:31:44'),
(42, 'App\\Models\\User', 5, 'API Token', '8f6c9e957d81f4b2ce6b10299d9e4ea29a91ae83b4d8e3a36e2ff46734e44ae9', '[\"*\"]', '2024-12-03 00:36:06', NULL, '2024-12-03 00:36:01', '2024-12-03 00:36:06'),
(44, 'App\\Models\\User', 5, 'API Token', 'ab999f0bfeb3d6c569e58b55501a5b57f50bb3df6e0644e8ba2eea9e6352cb94', '[\"*\"]', NULL, NULL, '2024-12-03 00:47:48', '2024-12-03 00:47:48'),
(46, 'App\\Models\\User', 5, 'API Token', '238fbd7dbde2144027d2766f6280e3b902dfd8fec3082d1cd42cc9e33c40dc88', '[\"*\"]', NULL, NULL, '2024-12-03 00:54:16', '2024-12-03 00:54:16'),
(47, 'App\\Models\\User', 2, 'API Token', '9c2d3dd2ec8011cae1fd5b13e6024db4d2189f1bf97682a825a6dbe62314e946', '[\"*\"]', '2024-12-03 01:02:37', NULL, '2024-12-03 00:54:25', '2024-12-03 01:02:37'),
(48, 'App\\Models\\User', 2, 'user-token', '8779aa6e7df4d5bd6b75fe0c46a89aaaeae6619fb2cc4a5027e841e3e8bf6f38', '[\"*\"]', NULL, NULL, '2024-12-03 05:05:12', '2024-12-03 05:05:12'),
(49, 'App\\Models\\User', 2, 'user-token', '39ff6ed4d895269c7478bd64f9f5ff210782e9633126e55372cfda49be5afad8', '[\"*\"]', NULL, NULL, '2024-12-03 05:05:20', '2024-12-03 05:05:20'),
(50, 'App\\Models\\User', 2, 'user-token', '01fe27d8b3ebeba67dd620ac1b9524b58002d1d75000edf4e9a00305bfb68c0e', '[\"*\"]', NULL, NULL, '2024-12-03 05:05:38', '2024-12-03 05:05:38'),
(51, 'App\\Models\\User', 2, 'API Token', '9577b3a0d4eb04ff947eade7e1cb0af86e5728d07f559f79f365e9d6b343ac8a', '[\"*\"]', NULL, NULL, '2024-12-03 05:11:51', '2024-12-03 05:11:51'),
(52, 'App\\Models\\User', 5, 'API Token', 'ad15449138112934bece2292ce4cdbc65198fa8459c1b6da9322dae2bbb792bd', '[\"*\"]', '2024-12-03 06:08:08', NULL, '2024-12-03 05:13:02', '2024-12-03 06:08:08'),
(54, 'App\\Models\\User', 5, 'API Token', '566276f85164aa2c4d690e4381b2435b7ee484a0541469916045b6f59a1fede8', '[\"*\"]', '2024-12-03 06:28:48', NULL, '2024-12-03 06:28:02', '2024-12-03 06:28:48'),
(55, 'App\\Models\\User', 2, 'API Token', 'e60c2caa630b99bb621509a451af4c3b03777dcc4d8f79cfd1c4f8dc2cc097d5', '[\"*\"]', NULL, NULL, '2024-12-03 06:32:33', '2024-12-03 06:32:33'),
(56, 'App\\Models\\User', 3, 'API Token', '20be85781a1427c20ea60c70bdc55af1580ed368b2d4712defdc8788bed7bdf7', '[\"*\"]', NULL, NULL, '2024-12-03 20:19:36', '2024-12-03 20:19:36'),
(57, 'App\\Models\\User', 3, 'API Token', '4303dab74ae4660671bfbe849d89c44f6d331776a396ac47ad144d06ae2cb4ee', '[\"*\"]', NULL, NULL, '2024-12-03 20:19:38', '2024-12-03 20:19:38'),
(59, 'App\\Models\\User', 3, 'API Token', '91c7702575ed3684492cd694bfe7fd3fb1d44f53598398e0812c3d3feda59940', '[\"*\"]', NULL, NULL, '2024-12-03 20:22:28', '2024-12-03 20:22:28'),
(67, 'App\\Models\\User', 2, 'API Token', '66128bae282bc02bde0c2cc45a9cb2ce95ea1e774fa2e7a0b132884e9c5c0fba', '[\"*\"]', NULL, NULL, '2024-12-08 21:19:43', '2024-12-08 21:19:43'),
(68, 'App\\Models\\User', 2, 'API Token', 'bce07e2ca1650150eeac26a8da4df842919b21e20016eaae5c30559a3ed8a4fa', '[\"*\"]', NULL, NULL, '2024-12-08 21:24:49', '2024-12-08 21:24:49'),
(69, 'App\\Models\\User', 2, 'API Token', 'd61be905b83c4e215553ed45328fa34a9379681963f905400636e25c37b41b80', '[\"*\"]', NULL, NULL, '2024-12-08 21:25:16', '2024-12-08 21:25:16'),
(70, 'App\\Models\\User', 2, 'API Token', '665d566947f796ac4c8fcdcca8a6af08719cd6183845e3a385e62f6f074ea4cf', '[\"*\"]', NULL, NULL, '2024-12-08 21:48:52', '2024-12-08 21:48:52'),
(72, 'App\\Models\\User', 2, 'API Token', '65d3e705a3ac0d01cffd112fe6f6690b1c4acb312f71839e2d9861cafbebc488', '[\"*\"]', NULL, NULL, '2024-12-08 21:51:39', '2024-12-08 21:51:39'),
(78, 'App\\Models\\User', 2, 'API Token', 'b39c4244cfd63dc69dd1750f1078a01bbf872ad9564db54b09010396205b7a60', '[\"*\"]', '2024-12-08 22:12:04', NULL, '2024-12-08 22:11:32', '2024-12-08 22:12:04'),
(79, 'App\\Models\\User', 2, 'API Token', '7e294db79aade07bb5e135062708799f52cf4d76f522461475612bb80b56957e', '[\"*\"]', '2024-12-08 22:14:29', NULL, '2024-12-08 22:12:50', '2024-12-08 22:14:29'),
(80, 'App\\Models\\User', 2, 'API Token', 'f644c1235e08e9833c334012942b295addc47ca79101b122ec37befd4c07b0c2', '[\"*\"]', NULL, NULL, '2024-12-08 22:14:33', '2024-12-08 22:14:33'),
(81, 'App\\Models\\User', 3, 'API Token', '1a1a61de2b3dc811cb6c60c063a5d16869c8e0fb35627d8b1c8e1ca83ba1992c', '[\"*\"]', '2024-12-08 22:16:16', NULL, '2024-12-08 22:16:10', '2024-12-08 22:16:16'),
(82, 'App\\Models\\User', 3, 'API Token', 'aa0bb7d4877aa8a0a9f90b5477e762e766c4b4b66df448942ee8cc9744d07dc6', '[\"*\"]', NULL, NULL, '2024-12-08 22:16:48', '2024-12-08 22:16:48'),
(89, 'App\\Models\\User', 3, 'API Token', 'cfa28b056d39d8f79fa65eef2d46aeed9a055c5f8533dc586f3432fc4f54b734', '[\"*\"]', NULL, NULL, '2024-12-08 22:41:01', '2024-12-08 22:41:01'),
(94, 'App\\Models\\User', 2, 'API Token', '816de74faf6fb3796e5c92cb6f6c3cbdee0bc0ce7cedd43629cc31292c37d238', '[\"*\"]', '2024-12-08 23:29:37', NULL, '2024-12-08 23:23:19', '2024-12-08 23:29:37'),
(138, 'App\\Models\\User', 4, 'API Token', 'afc058f74c64fbef87f7a61b5314c711721cc64555c6e366fe984e1ff3292085', '[\"*\"]', NULL, NULL, '2025-01-08 00:34:56', '2025-01-08 00:34:56'),
(139, 'App\\Models\\User', 4, 'API Token', '1b0e85ac20974e9ed9ef740f694e08c9f3129f6a826ff4ba11c18b8daa22776d', '[\"*\"]', NULL, NULL, '2025-01-08 00:37:01', '2025-01-08 00:37:01'),
(142, 'App\\Models\\User', 4, 'API Token', '37cdfb8e392a5574c85c2b27544c3eb529cf802db25f083b3c48d0f32d2cc2ac', '[\"*\"]', NULL, NULL, '2025-01-08 00:45:08', '2025-01-08 00:45:08'),
(145, 'App\\Models\\User', 4, 'API Token', '2e2743e31d569cdb59182dfe010b09d6802f7e454a2a1a7c0a6158ade5825679', '[\"*\"]', NULL, NULL, '2025-01-08 00:48:27', '2025-01-08 00:48:27'),
(146, 'App\\Models\\User', 4, 'API Token', '7351c93d8c33a16c37d5fd4f69df1041a1dd9f2d74713216f3809911dd18c65d', '[\"*\"]', NULL, NULL, '2025-01-08 00:50:10', '2025-01-08 00:50:10'),
(147, 'App\\Models\\User', 4, 'API Token', '6e774e2471661cf353ec95ce135801613ff93d7b30afc5a932883446f14efeb8', '[\"*\"]', NULL, NULL, '2025-01-08 00:50:14', '2025-01-08 00:50:14'),
(148, 'App\\Models\\User', 4, 'API Token', '09c2ebe85323620cff901439a72a85a61733160a3423f740df09abdb733053b3', '[\"*\"]', NULL, NULL, '2025-01-08 00:52:19', '2025-01-08 00:52:19'),
(149, 'App\\Models\\User', 4, 'API Token', '97a850fcef203954f6f730c5dba87a8bcd6311dcb66de787c4707d4fa56b2693', '[\"*\"]', NULL, NULL, '2025-01-08 00:55:15', '2025-01-08 00:55:15'),
(150, 'App\\Models\\User', 4, 'API Token', '4c040ab9133971ba29174866984547452a39b86c89efa01ef7fcf31edb203158', '[\"*\"]', NULL, NULL, '2025-01-08 00:57:13', '2025-01-08 00:57:13'),
(151, 'App\\Models\\User', 4, 'API Token', 'a80c7ac34524e2f69912c2a9e89f76d3b1f00d49f9a3bdfb6a53ec9b1ea2739d', '[\"*\"]', NULL, NULL, '2025-01-08 00:57:42', '2025-01-08 00:57:42'),
(152, 'App\\Models\\User', 4, 'API Token', '1804f80712d01712dcbd0e3602345bf655dce536f0440d388072a28c11e77422', '[\"*\"]', NULL, NULL, '2025-01-08 00:58:37', '2025-01-08 00:58:37'),
(153, 'App\\Models\\User', 4, 'API Token', 'e736217f3279e288a6f36253fd8b54e816f004d01c735104de1ce6d363c3a51f', '[\"*\"]', NULL, NULL, '2025-01-08 00:59:43', '2025-01-08 00:59:43'),
(154, 'App\\Models\\User', 4, 'API Token', '23017e5ec67e4ea6cec6081bc3f8d8f4d1df5aefaad103b16e302e525a44170a', '[\"*\"]', NULL, NULL, '2025-01-08 00:59:59', '2025-01-08 00:59:59'),
(155, 'App\\Models\\User', 4, 'API Token', '9834e483fb614f26a4239f4b85b0a29c57d9931239c741f484397455d722b8c3', '[\"*\"]', NULL, NULL, '2025-01-08 01:00:45', '2025-01-08 01:00:45'),
(156, 'App\\Models\\User', 4, 'API Token', '5be0c36d92d241ea329ce2374eba08d9ef8a8e4a6f90e6d16ed8d83a06556e60', '[\"*\"]', NULL, NULL, '2025-01-08 01:02:01', '2025-01-08 01:02:01'),
(157, 'App\\Models\\User', 4, 'API Token', 'ad8bde0082e4840c557813de93f4c99b45fa72d1c58d91a0f676706991e01087', '[\"*\"]', NULL, NULL, '2025-01-08 01:06:35', '2025-01-08 01:06:35'),
(158, 'App\\Models\\User', 4, 'API Token', 'a019ac5acc6cc8ff24c24318be9a12a82a5f03f407b446b9c4fd3e1b5190d37e', '[\"*\"]', NULL, NULL, '2025-01-08 01:06:45', '2025-01-08 01:06:45'),
(159, 'App\\Models\\User', 4, 'API Token', '26a00cfbaf1bfd973d01173439560e9441e175fe5cbc91bb8ea5770d0732cbaf', '[\"*\"]', NULL, NULL, '2025-01-08 01:07:21', '2025-01-08 01:07:21'),
(160, 'App\\Models\\User', 4, 'API Token', '29121039cd8bdc1d36c571f95b09361f50f54a9240993a9952755f964329b187', '[\"*\"]', NULL, NULL, '2025-01-08 01:07:48', '2025-01-08 01:07:48'),
(161, 'App\\Models\\User', 4, 'API Token', 'e1747e7f1e60cae937626bf773eace1b0c5f267c34a8d850f9aa3dd44250cb25', '[\"*\"]', NULL, NULL, '2025-01-08 01:08:55', '2025-01-08 01:08:55'),
(162, 'App\\Models\\User', 4, 'API Token', '82a265d49bef0e2a4912517b3fd8a95002a39d772fe43d4956043dabb01b70a9', '[\"*\"]', NULL, NULL, '2025-01-08 01:12:19', '2025-01-08 01:12:19'),
(163, 'App\\Models\\User', 4, 'API Token', '9a168781c3a6c823000b8e02e5657e3d683f00a77ee0ba490d20f81e8876f4ca', '[\"*\"]', NULL, NULL, '2025-01-08 01:13:15', '2025-01-08 01:13:15'),
(164, 'App\\Models\\User', 4, 'API Token', 'cacbb4ed777c38dd5b9053e13cdd39446b431b4a57ced32b6cad70f747383503', '[\"*\"]', NULL, NULL, '2025-01-08 01:16:15', '2025-01-08 01:16:15'),
(165, 'App\\Models\\User', 4, 'API Token', '2199d7a18f4b780b7aa18053f60c8784a5ab915b5e2f5b4ec73d04720db79030', '[\"*\"]', NULL, NULL, '2025-01-08 01:17:10', '2025-01-08 01:17:10'),
(166, 'App\\Models\\User', 4, 'API Token', '25f2e26d4ba03165c77535304f0bac458adaffe2e49095b02be504a6e82b2716', '[\"*\"]', NULL, NULL, '2025-01-08 01:17:42', '2025-01-08 01:17:42'),
(167, 'App\\Models\\User', 4, 'API Token', 'fb96f51dd4800a9c0ad112b891a6bf9b8333f4ad1dbfe8be2b0e61bfecc89b29', '[\"*\"]', NULL, NULL, '2025-01-08 01:19:25', '2025-01-08 01:19:25'),
(168, 'App\\Models\\User', 4, 'API Token', '4ed1e9cdb5b3980ab93505e076e4804ec9dd63acd4fd7da7b8bcc5ef27d7d74f', '[\"*\"]', NULL, NULL, '2025-01-08 01:22:22', '2025-01-08 01:22:22'),
(169, 'App\\Models\\User', 4, 'API Token', '64e7e37aecc03cb4a6251002e0340e6365508b912eed121537889b4f856a49ce', '[\"*\"]', NULL, NULL, '2025-01-08 01:22:29', '2025-01-08 01:22:29'),
(170, 'App\\Models\\User', 3, 'API Token', 'd2db7832d67114f58deee0a637d6ae797e90f64ec208080a74c56a198f7cef72', '[\"*\"]', NULL, NULL, '2025-01-08 01:23:06', '2025-01-08 01:23:06'),
(171, 'App\\Models\\User', 3, 'API Token', '1ca2d04086cd3e6fab293e86d381c76c97b40c98f23fb806dec155b113273cbc', '[\"*\"]', NULL, NULL, '2025-01-08 01:24:57', '2025-01-08 01:24:57'),
(172, 'App\\Models\\User', 3, 'API Token', '2d837bef56893b4382f82a4e834dfdf460e15f68fcff828a688f4ecf4f7c0d6c', '[\"*\"]', NULL, NULL, '2025-01-08 01:25:17', '2025-01-08 01:25:17'),
(173, 'App\\Models\\User', 3, 'API Token', '4d3fbd7a987b62c81da04a61e24aa73157ed91c63a7257b65b688db5e6c00dd2', '[\"*\"]', NULL, NULL, '2025-01-08 01:25:33', '2025-01-08 01:25:33'),
(174, 'App\\Models\\User', 4, 'API Token', '21bbe2d753535822213c147b0df6b4d8b19a669b9a30e364f7b0e7cc739b57b4', '[\"*\"]', NULL, NULL, '2025-01-08 01:26:10', '2025-01-08 01:26:10'),
(175, 'App\\Models\\User', 3, 'API Token', '342c6cca98288ad91c203b48295e9e7eb2e5b9cde13b7d92fba04fd92be6b03e', '[\"*\"]', NULL, NULL, '2025-01-08 01:28:13', '2025-01-08 01:28:13'),
(176, 'App\\Models\\User', 4, 'API Token', 'b4f92337f1bd353f07679760e5861ce22979811750a54bf36bd339993562a95d', '[\"*\"]', NULL, NULL, '2025-01-08 01:28:20', '2025-01-08 01:28:20'),
(177, 'App\\Models\\User', 4, 'API Token', '9078468f7066f74629ab5dca22948cd342a01fec10a633052c160c2fbb85ee43', '[\"*\"]', NULL, NULL, '2025-01-08 01:30:43', '2025-01-08 01:30:43'),
(178, 'App\\Models\\User', 4, 'API Token', 'a07b0c635296ff4814d856d599562015233d961884dcaa3aa1092896d127b1b4', '[\"*\"]', NULL, NULL, '2025-01-08 01:31:42', '2025-01-08 01:31:42'),
(179, 'App\\Models\\User', 4, 'API Token', '26f9833bf007f590789feb80005069df2f305631002415c367c4dbe8ac514642', '[\"*\"]', NULL, NULL, '2025-01-08 01:32:16', '2025-01-08 01:32:16'),
(180, 'App\\Models\\User', 3, 'API Token', 'a210817a7da869a79561fab19284f48915f2a166a2a2bbf70a2ff28201aa161e', '[\"*\"]', NULL, NULL, '2025-01-08 01:33:21', '2025-01-08 01:33:21'),
(181, 'App\\Models\\User', 3, 'API Token', '2b522c77e8598b84a4162fd4bfad7bbbc2f2477da5498c4df03c43ef1bf7b0c2', '[\"*\"]', NULL, NULL, '2025-01-08 01:34:27', '2025-01-08 01:34:27'),
(182, 'App\\Models\\User', 4, 'API Token', 'eb998a3f3a2b0de2048081b9ec8705c5c5a6899e377a028b837f7f14414be8ec', '[\"*\"]', NULL, NULL, '2025-01-08 01:34:36', '2025-01-08 01:34:36'),
(183, 'App\\Models\\User', 4, 'API Token', 'a003230ca99ec62bcee846ceca25dda0682fe7f19786b326d0d549ff875635c2', '[\"*\"]', NULL, NULL, '2025-01-08 01:35:13', '2025-01-08 01:35:13'),
(184, 'App\\Models\\User', 4, 'API Token', '891fb77d5f5b2042e291e2e09de385351edd6a6303b30f99a3c815f425c3fbde', '[\"*\"]', NULL, NULL, '2025-01-08 01:35:18', '2025-01-08 01:35:18'),
(185, 'App\\Models\\User', 4, 'API Token', '1e73dd0e9703d6cfb2b156b80ef9b0633846359e6ff53e8df3fcc00b86287114', '[\"*\"]', NULL, NULL, '2025-01-08 01:35:38', '2025-01-08 01:35:38'),
(186, 'App\\Models\\User', 4, 'API Token', '161e051c01216e7f246165dd230212c7a863b0ad03e6380ab693fb9e5b58aeab', '[\"*\"]', NULL, NULL, '2025-01-08 01:36:50', '2025-01-08 01:36:50'),
(187, 'App\\Models\\User', 4, 'API Token', '9b9664223c9609aaae67d9b59bd2759099dd008a3c3c5ed4e3fafd6cacf83b90', '[\"*\"]', NULL, NULL, '2025-01-08 01:39:33', '2025-01-08 01:39:33'),
(188, 'App\\Models\\User', 4, 'API Token', 'be1db9c18ff5badba7f154c353aae1905ff14650e3b232bbf7ef5011707e2073', '[\"*\"]', NULL, NULL, '2025-01-08 01:40:20', '2025-01-08 01:40:20'),
(189, 'App\\Models\\User', 4, 'API Token', '585f3ebfef3d319730a2df1c36147655c8e1da259bb03d05dfd73d4d3db280f1', '[\"*\"]', NULL, NULL, '2025-01-08 01:42:32', '2025-01-08 01:42:32'),
(190, 'App\\Models\\User', 4, 'API Token', '2d31a7c89d4e00d21759d81e03864d8c41603861d248f0d44a25cdc985cc4de7', '[\"*\"]', NULL, NULL, '2025-01-08 01:42:32', '2025-01-08 01:42:32'),
(191, 'App\\Models\\User', 4, 'API Token', 'ee510fbf4f3769f23b68b4d73d91326df581b161cf54b21389d3faa1de2bbbc8', '[\"*\"]', NULL, NULL, '2025-01-08 01:43:16', '2025-01-08 01:43:16'),
(192, 'App\\Models\\User', 4, 'API Token', '6b40c66ca46acf99beea75542d90db904f9d2bd21dc0801cf93271747f96852c', '[\"*\"]', NULL, NULL, '2025-01-08 01:43:28', '2025-01-08 01:43:28'),
(193, 'App\\Models\\User', 4, 'API Token', 'e99834c4e6cd45919bd76837ab5b989511fd4d8a40cd19c2efb0d269b48ecb7b', '[\"*\"]', NULL, NULL, '2025-01-08 01:44:30', '2025-01-08 01:44:30'),
(194, 'App\\Models\\User', 4, 'API Token', '047f92be5e4f022cd27729eafc30429027e83633426a9485df469047c5e228d1', '[\"*\"]', NULL, NULL, '2025-01-08 01:44:59', '2025-01-08 01:44:59'),
(195, 'App\\Models\\User', 4, 'API Token', 'e9e2c8e58632e844563b3410215b4a19de77f30a1edf43c490d06024e86a2139', '[\"*\"]', NULL, NULL, '2025-01-08 01:47:40', '2025-01-08 01:47:40'),
(196, 'App\\Models\\User', 4, 'API Token', '11ecdf58606daf7568dd05031dc31962f11c812e5861645e2521043265b4f8ff', '[\"*\"]', NULL, NULL, '2025-01-08 01:48:05', '2025-01-08 01:48:05'),
(197, 'App\\Models\\User', 4, 'API Token', 'bf8a15dec4099817eb297cc5d178b696f5c7de20aac1b24a32e9657fc79705d2', '[\"*\"]', NULL, NULL, '2025-01-08 01:49:37', '2025-01-08 01:49:37'),
(198, 'App\\Models\\User', 4, 'API Token', 'e0d0a7181834a840a8c2fa78a00e63bb76a698a1a2428fb6d0db5d184af88c35', '[\"*\"]', NULL, NULL, '2025-01-08 01:50:23', '2025-01-08 01:50:23'),
(207, 'App\\Models\\User', 3, 'API Token', '30d89f6516e98c1468e19d93da9193d39902a3d06da049e1622c2fd5b82b063c', '[\"*\"]', NULL, NULL, '2025-01-08 03:43:13', '2025-01-08 03:43:13'),
(209, 'App\\Models\\User', 3, 'API Token', 'c037380dc8a625a07ff698c241917d7ea50de0bdf78c7fcc83d02911ffb0f575', '[\"*\"]', NULL, NULL, '2025-01-08 03:46:25', '2025-01-08 03:46:25'),
(210, 'App\\Models\\User', 2, 'API Token', '271bdf2e9845fdf942f055a0b68cafa897fdf9078d2610f8b8df8f125d015ac8', '[\"*\"]', NULL, NULL, '2025-01-08 03:46:36', '2025-01-08 03:46:36'),
(211, 'App\\Models\\User', 3, 'API Token', '9c7f95ff4f6c667744cd4a74cc7b97be8ebdc8d6974824b569aa220a56cbbd62', '[\"*\"]', NULL, NULL, '2025-01-10 05:05:14', '2025-01-10 05:05:14'),
(214, 'App\\Models\\User', 1, 'API Token', '658ef66081fe16e955450dc18f4a650de752865003010aa2d838fd306e30e511', '[\"*\"]', NULL, NULL, '2025-01-10 05:11:16', '2025-01-10 05:11:16'),
(281, 'App\\Models\\User', 4, 'API Token', '18893149d3364a2ae2b81f88214d3197e6a2311bb1086ffc9264d2e9becf09ec', '[\"*\"]', '2025-01-10 17:28:59', NULL, '2025-01-10 17:24:11', '2025-01-10 17:28:59');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2024-11-28 09:35:52', '2024-11-28 09:35:52'),
(2, 'student', 'web', '2024-11-28 09:35:52', '2024-11-28 09:35:52'),
(3, 'faculty', 'web', '2024-11-28 09:35:52', '2024-11-28 09:35:52'),
(4, 'officers', 'web', '2024-11-28 09:35:52', '2024-11-28 09:35:52');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1U6w6T25m5kqEbPeb5rOPtvp3xPPL7jH7JOASg9j', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTkFFcXhRUUlFa3hjM0dZZnpsRkNZSFNFWmtqVkJ5V3hUTHJtY1RzWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736519099),
('6v9vz4an4eItEYPwC5rnuSPRo56AM0ZwWekRTthW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWJvZG5hVU5XMlBWZFZ1dTVVdGt2dHB6MHdqajFMU1pXSWFhaEMwbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736329850),
('bLv8HT8DpX59PeC1OD511foDX0bxYFkWgv8Nevmx', 4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSGFqQlRpNWZ2WnZmUXNYTVZ2dFlFUmVnNlhjanBTdUxidTU1QWpFNyI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736329879),
('Noao2CqdLfC2GZ8Jl5QOvsUDM8EQb5nIlWJZeNDA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOHh5d2VTVTZtekJ3ZWNMYTI5c3p6WmhXSkFPUkdzOFZBZEJ3dmZXcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736336621);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `student_number` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `program` varchar(255) DEFAULT NULL,
  `year_level` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `student_status` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `facebook_link` varchar(255) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `faculty_status` varchar(255) NOT NULL DEFAULT 'pending',
  `admin_status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`, `email`, `student_number`, `last_name`, `first_name`, `middle_name`, `program`, `year_level`, `semester`, `student_status`, `sex`, `contact_number`, `facebook_link`, `birthdate`, `status`, `faculty_status`, `admin_status`, `created_at`, `updated_at`, `archived`) VALUES
(54, 4, 'student@example.com', '202211868', 'Vergara', 'Jon Ken Heron', 'Lapuz', 'Bachelor of Science in Computer Science', 'Third Year', 'First Semester', 'Irregular', 'Male', '0909090909', NULL, '1999-10-19', 'officer_approved', 'faculty_approved', 'admin_approved', '2025-01-10 16:03:12', '2025-01-10 16:06:40', 0),
(55, 4, 'student@example.com', '202211868', 'Vergara', 'Jon Ken Heron', 'Lapuz', 'Bachelor of Science in Computer Science', 'Third Year', 'First Semester', 'Regular', 'Male', '0909090909', NULL, '1999-10-19', 'pending', 'pending', 'pending', '2025-01-10 16:03:13', '2025-01-10 16:03:13', 0),
(56, 4, 'student@example.com', '202211868', 'Vergara', 'Jon Ken Heron', 'Lapuz', 'Bachelor of Science in Computer Science', 'Third Year', 'First Semester', 'Regular', 'Male', '0909090909', NULL, '1999-10-19', 'pending', 'pending', 'pending', '2025-01-10 16:03:13', '2025-01-10 16:03:13', 0),
(57, 4, 'student@example.com', '202211868', 'Vergara', 'Jon Ken Heron', 'Lapuz', 'Bachelor of Science in Computer Science', 'Third Year', 'First Semester', 'Regular', 'Male', '0909090909', NULL, '1999-10-19', 'pending', 'pending', 'pending', '2025-01-10 16:03:14', '2025-01-10 16:03:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `students_soc_fees`
--

CREATE TABLE `students_soc_fees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `student_number` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `soc_fee_first_year` enum('paid','not paid') NOT NULL,
  `soc_fee_second_year` enum('paid','not paid') NOT NULL,
  `soc_fee_third_year` enum('paid','not paid') NOT NULL,
  `soc_fee_fourth_year` enum('paid','not paid') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students_soc_fees`
--

INSERT INTO `students_soc_fees` (`id`, `student_name`, `student_number`, `year_level`, `section`, `course`, `soc_fee_first_year`, `soc_fee_second_year`, `soc_fee_third_year`, `soc_fee_fourth_year`, `created_at`, `updated_at`) VALUES
(2, 'asdasdsad', '123123', 'qweqwe', '23', 'Bachelor of Science in Computer Science', 'paid', 'paid', 'not paid', 'not paid', '2024-12-01 04:12:09', '2024-12-16 01:06:34'),
(3, 'Hotdog', '123456789', '1st year', '3-1', 'Bachelor of Science in Computer Science', 'paid', 'not paid', 'not paid', 'not paid', '2024-12-01 04:13:19', '2024-12-01 04:13:19');

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `student_number` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `student_status` varchar(255) DEFAULT NULL,
  `enrollment_status` varchar(255) DEFAULT NULL,
  `year_level` varchar(255) DEFAULT NULL,
  `semester` varchar(255) NOT NULL,
  `guardian_name` varchar(255) DEFAULT NULL,
  `guardian_phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`id`, `user_id`, `student_number`, `age`, `phone`, `address`, `email`, `course`, `student_status`, `enrollment_status`, `year_level`, `semester`, `guardian_name`, `guardian_phone`, `created_at`, `updated_at`, `first_name`, `last_name`, `middle_name`, `sex`, `birthdate`) VALUES
(1, 4, '202211868', 23, '0909090909', 'Salubong street', 'student@example.com', 'Bachelor of Science in Computer Science', 'Regular', 'Pending', 'Third Year', 'First Semester', 'Jojo', '09402204924', NULL, '2025-01-10 16:06:40', 'Jon Ken Heron', 'Vergara', 'Lapuz', 'Male', '1999-10-19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'student',
  `student_number` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `student_number`, `student_id`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$QxDK/lfnBTjr4E5oV2mPeOfImWVWFPBypPKE/TeYUqZhEP7y6M8Si', NULL, '2024-11-28 09:35:52', '2024-11-28 23:32:04', 'admin', NULL, NULL),
(2, 'Faculty User', 'faculty@example.com', NULL, '$2y$12$gN7guGxJzxE1LkKx6oNTUeBdprmKBkYUTt/WVQSyXqBrneLEN/tOe', NULL, '2024-11-28 09:35:52', '2024-11-28 23:32:05', 'faculty', '2', NULL),
(3, 'Officer User', 'officer@example.com', NULL, '$2y$12$Jzj1DJcR6JMOig/eBnp5I.CqLSpaD8SLTaavSUASp/F.f1htKsj9u', NULL, '2024-11-28 09:35:53', '2024-11-28 23:32:05', 'officers', NULL, NULL),
(4, 'Student User', 'student@example.com', NULL, '$2y$12$m.oUDVpKuhxSx0onFx5leuPN30oVZjuvpIV3zxVttEcioI8/D2Z5a', 'B1AmYJ6fKSQCfM1Kyfr4H4cx4a3hwEpKql9iyXn4HgorD9Tr8fW8bW2xGtbc', '2024-11-28 09:35:53', '2024-11-28 23:32:05', 'student', '202211868', NULL),
(5, 'Jon User', 'jon@example.com', NULL, '$2y$12$1qL8Kjl5jZRNvijpGoueCevujhCgC4by7zZsWvTY7uY8NFHfe1SFm', NULL, '2024-11-28 23:32:05', '2024-11-28 23:32:05', 'student', '202211869', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_student_id_foreign` (`student_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courses_code_unique` (`code`);

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_course_id_foreign` (`course_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `guardians`
--
ALTER TABLE `guardians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardians_student_id_foreign` (`student_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_student_id_foreign` (`student_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_student_id_foreign` (`student_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_user_id_foreign` (`user_id`);

--
-- Indexes for table `students_soc_fees`
--
ALTER TABLE `students_soc_fees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_soc_fees_student_number_unique` (`student_number`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_student_number_unique` (`student_number`),
  ADD KEY `users_student_id_foreign` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardians`
--
ALTER TABLE `guardians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `students_soc_fees`
--
ALTER TABLE `students_soc_fees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_details`
--
ALTER TABLE `student_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD CONSTRAINT `curriculum_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guardians`
--
ALTER TABLE `guardians`
  ADD CONSTRAINT `guardians_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_details`
--
ALTER TABLE `student_details`
  ADD CONSTRAINT `student_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
