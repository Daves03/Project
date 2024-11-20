-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 04:12 AM
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
(2, 13, '123123', 'qweqweqwe', 'qweqweqwesad', 'dasdasdasd', 'sadasdasd', '12313', '2024-10-30 06:30:18', '2024-10-30 06:30:18'),
(3, 17, '123123', 'qweqweqwe', 'qweqweqwesad', 'dasdasdasd', 'sadasdasd', '12313', '2024-10-30 06:37:13', '2024-10-30 06:37:13'),
(4, 18, '123sadqeasd', 'qaeasf', 'asdfgqw', 'eadqwer', 'qweasdxzzcz', '12334', '2024-10-30 07:30:06', '2024-10-30 07:30:06');

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

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `code`, `title`, `CreditUnitsLec`, `CreditUnitsLab`, `ContactHoursLec`, `ContactHoursLab`, `Prerequisite`, `created_at`, `updated_at`, `program`, `semester`, `year`) VALUES
(1, 'DCIT 9', 'Advance', 1, 2, 3, 4, 'DCIT 59', '2024-10-30 23:08:18', '2024-11-19 18:39:19', 'BS Computer Science', 'First Semester', 3),
(5, 'hotdog 25', 'hotdog subj', 2, 3, 2, 3, 'hotdog 23', '2024-10-30 23:34:04', '2024-11-19 18:39:19', 'BS Computer Science', 'First Semester', 1);

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
  `is_archive` tinyint(1) NOT NULL DEFAULT 0,
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
(5, 13, 'qweqweqwe', '123123', 'qweqweqwe', '2024-10-30 06:30:18', '2024-10-30 06:30:18'),
(6, 17, 'qweqweqwe', '123123', 'qweqweqwe', '2024-10-30 06:37:13', '2024-10-30 06:37:13'),
(7, 18, 'gsgxcv', '12315151', 'asfhbds', '2024-10-30 07:30:06', '2024-10-30 07:30:06');

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
(5, '2014_10_12_000000_create_users_table', 1),
(6, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(7, '2019_08_19_000000_create_failed_jobs_table', 1),
(8, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(9, '2024_10_22_053318_add_role_to_users_table', 1),
(10, '2024_10_22_064337_create_permission_tables', 2),
(11, '2024_10_30_053257_create_students_table', 3),
(12, '2024_10_30_053434_create_guardians_table', 3),
(13, '2024_10_30_055151_create_addresses_table', 3),
(14, '2024_10_30_055248_create_payments_table', 3),
(15, '2024_10_31_065735_create_courses_table', 4),
(16, '2024_10_31_080438_create_curriculum_table', 5),
(17, '2024_10_31_081005_add_program_semester_year_to_courses_table', 5),
(18, '2024_11_20_030545_add_is_archive_to_curriculum_table', 6);

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
(1, 'App\\Models\\User', 1);

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `student_id`, `mobile_number`, `sender_name`, `reference_number`, `amount`, `created_at`, `updated_at`) VALUES
(1, 13, '123213213', 'qeqweqwe', '123123', 12.00, '2024-10-30 06:30:18', '2024-10-30 06:30:18'),
(2, 17, '123213213', 'qeqweqwe', '123123', 12.00, '2024-10-30 06:37:13', '2024-10-30 06:37:13'),
(3, 18, '12763523', 'asdvcbxc', '241241', 53.00, '2024-10-30 07:30:06', '2024-10-30 07:30:06');

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
(1, 'App\\Models\\User', 2, 'API Token', '583142672f15484024444b6c47fdf58c243c9ae5c85ba54b5dffc427380005cb', '[\"*\"]', NULL, NULL, '2024-10-22 00:47:36', '2024-10-22 00:47:36'),
(2, 'App\\Models\\User', 2, 'API Token', '442450869a825ec3089444544f4fa510c441f3901923b478599e496c39988a36', '[\"*\"]', NULL, NULL, '2024-10-22 00:47:41', '2024-10-22 00:47:41'),
(3, 'App\\Models\\User', 2, 'API Token', '931bc9cfc6d65d8c1a26fa53bb044054f2f4e46982df34407ef636e0f03286a4', '[\"*\"]', NULL, NULL, '2024-10-22 00:48:42', '2024-10-22 00:48:42'),
(4, 'App\\Models\\User', 2, 'API Token', 'ff9c25fc9d0c6a75ed2e14176b344782b52e046ffe98b17db85bdf2c2156ad7f', '[\"*\"]', NULL, NULL, '2024-10-22 00:49:51', '2024-10-22 00:49:51'),
(5, 'App\\Models\\User', 2, 'API Token', '526efd4a215183cc504d15587e2c683a0744de2cf76832f8022f378bb4589150', '[\"*\"]', NULL, NULL, '2024-10-22 00:52:03', '2024-10-22 00:52:03'),
(6, 'App\\Models\\User', 2, 'API Token', '58994115db3d57d3db1a8d8bed7d2bd7ca3383b9b28443b0ef53c1b92d858605', '[\"*\"]', NULL, NULL, '2024-10-22 00:52:48', '2024-10-22 00:52:48'),
(7, 'App\\Models\\User', 2, 'API Token', '312cf9a01a182c57479f8db4e21f9ff3713d96ff528b74fe8113e0bac4667da6', '[\"*\"]', NULL, NULL, '2024-10-22 00:55:23', '2024-10-22 00:55:23'),
(8, 'App\\Models\\User', 2, 'API Token', 'f7e6e8f14d2570e8b8df584f61679f9b4ae0acfdf4fb387ef6f7750c48831ace', '[\"*\"]', NULL, NULL, '2024-10-22 00:55:27', '2024-10-22 00:55:27'),
(9, 'App\\Models\\User', 1, 'Test Token', 'dd9d3dca4adf44ff67d76cdb1ec2550b0b34f14a0d630b7e82caeaee06e625b6', '[\"*\"]', NULL, NULL, '2024-10-22 01:07:13', '2024-10-22 01:07:13'),
(10, 'App\\Models\\User', 2, 'API Token', '0b6391c0d990b9b8ecad6d1089bbd90ac31fd9dba37f9dd198480323dcf47656', '[\"*\"]', NULL, NULL, '2024-10-22 01:38:49', '2024-10-22 01:38:49'),
(11, 'App\\Models\\User', 2, 'API Token', '7a15891ca7ff774351f89111e416cdd03975013dd83c6a4f45147e939b4f078a', '[\"*\"]', NULL, NULL, '2024-10-22 01:39:37', '2024-10-22 01:39:37'),
(12, 'App\\Models\\User', 2, 'API Token', '73fa3714d77a9d642daf09bf32563c11aa61b9a1752a5424c571bcd608e530a0', '[\"*\"]', NULL, NULL, '2024-10-22 01:59:39', '2024-10-22 01:59:39'),
(13, 'App\\Models\\User', 2, 'API Token', 'ef18669de07d87d9f8c0f9a5efcd842273ee065f6ef0054b224ac94aa44a3ae6', '[\"*\"]', NULL, NULL, '2024-10-22 02:07:21', '2024-10-22 02:07:21'),
(14, 'App\\Models\\User', 2, 'API Token', 'b1ccca559fa4c67b24e6a5b96d5f7fba61608d5986a87e0543909d27b0944344', '[\"*\"]', NULL, NULL, '2024-10-22 02:07:25', '2024-10-22 02:07:25'),
(15, 'App\\Models\\User', 2, 'API Token', '845908754e47e7b79f9f170df0282a1262b236fdca993f2fda2486c647809625', '[\"*\"]', NULL, NULL, '2024-10-22 02:08:39', '2024-10-22 02:08:39'),
(16, 'App\\Models\\User', 2, 'API Token', 'b045b5b4fb3cd5a1c7169c8970b1d6d522a6d94ab72ccd2baa98208e1dc13d85', '[\"*\"]', NULL, NULL, '2024-10-22 02:10:22', '2024-10-22 02:10:22'),
(17, 'App\\Models\\User', 1, 'API Token', '26a00e2af570184bd70452a15019abb4307251fc786afddbe097fb5b6c68e83d', '[\"*\"]', NULL, NULL, '2024-10-22 02:12:01', '2024-10-22 02:12:01'),
(18, 'App\\Models\\User', 2, 'API Token', 'febd32489823a2944bbf23e2e993f6717e62f70b34917a22cbff3036d377755d', '[\"*\"]', NULL, NULL, '2024-10-22 02:12:21', '2024-10-22 02:12:21'),
(19, 'App\\Models\\User', 2, 'API Token', 'a6bc8b475afa270453b682edfdc643fb1b9f6a1c3c37aea1d4a1ff12b38f5129', '[\"*\"]', NULL, NULL, '2024-10-22 02:12:53', '2024-10-22 02:12:53'),
(20, 'App\\Models\\User', 2, 'API Token', '3246a74dfbed74674c0278cf944b906fcdfaf6869ca2279fa2bb1b9e89a852ef', '[\"*\"]', NULL, NULL, '2024-10-22 02:13:06', '2024-10-22 02:13:06'),
(21, 'App\\Models\\User', 2, 'API Token', 'ab765c04ab6c564dcd35dc31f87f906144b7e78e43cd73eaea11c7e88b58bab8', '[\"*\"]', NULL, NULL, '2024-10-22 02:16:30', '2024-10-22 02:16:30'),
(22, 'App\\Models\\User', 2, 'API Token', 'ed66e73173acf406d8bd99b413252497f4830c86b91421f4f03589a396de69b6', '[\"*\"]', NULL, NULL, '2024-10-22 02:18:57', '2024-10-22 02:18:57'),
(23, 'App\\Models\\User', 2, 'API Token', '8641ad1f3e1c2280875a3f0ecea0ea365dbb9f309f5d5611a554240bf25b8eca', '[\"*\"]', NULL, NULL, '2024-10-22 02:23:56', '2024-10-22 02:23:56'),
(24, 'App\\Models\\User', 2, 'API Token', 'e8c5eb8cc5324ebf2b89198d9ce4a846064826ef6947d44cfa367eded6188a8b', '[\"*\"]', NULL, NULL, '2024-10-22 02:24:37', '2024-10-22 02:24:37'),
(25, 'App\\Models\\User', 2, 'API Token', 'd644170a80f48055a6ad966ec6055eaeaca14ec700e9d5e8683d4793e62884fa', '[\"*\"]', NULL, NULL, '2024-10-22 02:24:54', '2024-10-22 02:24:54'),
(26, 'App\\Models\\User', 2, 'API Token', '89f17937b5d7b9e8ab99186f2ec6f332370cbcf84cd2e32c96ed88879ed64bcf', '[\"*\"]', NULL, NULL, '2024-10-22 02:25:51', '2024-10-22 02:25:51'),
(27, 'App\\Models\\User', 2, 'API Token', '38c20f848eaddf0b52942c6ea65071aee695c17c9968c0c932c1d63919808080', '[\"*\"]', NULL, NULL, '2024-10-22 02:30:22', '2024-10-22 02:30:22'),
(28, 'App\\Models\\User', 2, 'API Token', '97bbd1c037aee239beb90342d0e4d97520522ffd549184f222ec4ee6632c93ee', '[\"*\"]', NULL, NULL, '2024-10-22 02:31:26', '2024-10-22 02:31:26'),
(29, 'App\\Models\\User', 2, 'API Token', 'db03868bab21e0f5287fdae6f570ba10f6f45ad8d2220e21319ded85d0305778', '[\"*\"]', NULL, NULL, '2024-10-22 02:33:24', '2024-10-22 02:33:24'),
(30, 'App\\Models\\User', 2, 'API Token', 'a65192063cad64e6235bf070af1aaae342a9139386db2cbb1d617c721d88a255', '[\"*\"]', NULL, NULL, '2024-10-22 02:39:43', '2024-10-22 02:39:43'),
(31, 'App\\Models\\User', 2, 'API Token', '0247183402146c4a7445a523f2072d67cf991591a4028911e4739575a262b1d1', '[\"*\"]', NULL, NULL, '2024-10-22 02:44:12', '2024-10-22 02:44:12'),
(32, 'App\\Models\\User', 2, 'API Token', '68ae92800f22eb3f0034221477788e04a9574ea52dbd16384c414210bd7ffc97', '[\"*\"]', NULL, NULL, '2024-10-22 02:49:29', '2024-10-22 02:49:29'),
(33, 'App\\Models\\User', 2, 'API Token', '8eb0af6dc6a4e9aa663575050caa16b9cdfeaf950321f4894558838e838130c1', '[\"*\"]', NULL, NULL, '2024-10-22 03:04:54', '2024-10-22 03:04:54'),
(34, 'App\\Models\\User', 2, 'API Token', '83ab4b83bb1f7210cc7bf2beca99543a2ae1fc3bd5af4ed171f7fcfeab8034d1', '[\"*\"]', NULL, NULL, '2024-10-22 03:15:47', '2024-10-22 03:15:47'),
(35, 'App\\Models\\User', 2, 'API Token', '342320b9074ca576355ce4ffd200b627ca136ea37f2be1e3bccd1716d658692b', '[\"*\"]', NULL, NULL, '2024-10-22 03:16:50', '2024-10-22 03:16:50'),
(36, 'App\\Models\\User', 2, 'API Token', 'fa1b2fd776c84b521ea1d558505f7793045964c48ae0da2cb00bc049d58dd0d1', '[\"*\"]', NULL, NULL, '2024-10-22 03:20:41', '2024-10-22 03:20:41'),
(41, 'App\\Models\\User', 2, 'API Token', '1fd4353deec47142dea03aab01ce00eb566e4f6687b75c55738de3ca200cfe99', '[\"*\"]', NULL, NULL, '2024-10-29 20:50:11', '2024-10-29 20:50:11'),
(43, 'App\\Models\\User', 1, 'API Token', '44cd9462bceb682062dd941edb1e50952ca898fbc4e1ff56df230d583035a679', '[\"*\"]', NULL, NULL, '2024-10-29 21:15:38', '2024-10-29 21:15:38'),
(44, 'App\\Models\\User', 1, 'API Token', 'aff1c1dd205dba731d134eb8278bfb7bbd2d09cb13df7eb7c8f411692c10205b', '[\"*\"]', NULL, NULL, '2024-10-29 21:16:56', '2024-10-29 21:16:56'),
(45, 'App\\Models\\User', 1, 'API Token', 'a27e03971adf577ff49c449ff6f9068f3a6c58f0b9ce3e421db7afa45d0ae830', '[\"*\"]', NULL, NULL, '2024-10-29 21:26:50', '2024-10-29 21:26:50'),
(46, 'App\\Models\\User', 2, 'API Token', '1b752f8c72348f8593c4a0c458e5895f8a10f4d99c067d3391e5d123e21254d5', '[\"*\"]', NULL, NULL, '2024-10-29 21:28:39', '2024-10-29 21:28:39'),
(47, 'App\\Models\\User', 1, 'API Token', 'f4e1a2cb245904feb805523cb894a43bbb05e37e91968e786dfeca015263595a', '[\"*\"]', NULL, NULL, '2024-10-29 22:30:15', '2024-10-29 22:30:15'),
(50, 'App\\Models\\User', 1, 'API Token', '30d61121ca8037a55b62ba593a6174943c2acdf7d7ed648ef11c5316c29b509b', '[\"*\"]', NULL, NULL, '2024-10-29 22:35:33', '2024-10-29 22:35:33'),
(51, 'App\\Models\\User', 2, 'API Token', '846d41cb2e6a995fac2ef07a4ac50bb42073177b0db3fa7593b3316220a672ca', '[\"*\"]', NULL, NULL, '2024-10-29 22:36:12', '2024-10-29 22:36:12'),
(52, 'App\\Models\\User', 2, 'API Token', 'eb90a4ecb72896eaed06bdd089c9a2520d5504d07d215cdf9686d9d1fd7b608a', '[\"*\"]', NULL, NULL, '2024-10-30 04:04:32', '2024-10-30 04:04:32'),
(53, 'App\\Models\\User', 2, 'API Token', '47a59e26cee483a38964e69c99ccd5fd029d2c4560950ff36249346d152edd3a', '[\"*\"]', NULL, NULL, '2024-10-30 04:22:37', '2024-10-30 04:22:37'),
(54, 'App\\Models\\User', 2, 'API Token', 'a88a6b76645bf442243a39f491f399fb53d607c524186be40789400b266331d8', '[\"*\"]', NULL, NULL, '2024-10-30 04:45:08', '2024-10-30 04:45:08'),
(55, 'App\\Models\\User', 2, 'API Token', 'fa2a21f1fbbbbd5c3e041e7c54c21985465742118681c13b79da41e4cc000555', '[\"*\"]', NULL, NULL, '2024-10-30 04:52:17', '2024-10-30 04:52:17'),
(56, 'App\\Models\\User', 2, 'API Token', '7b05a7a3803a52d11824f836730258526ddacb01a586977f5c844844de2a8092', '[\"*\"]', NULL, NULL, '2024-10-30 05:00:06', '2024-10-30 05:00:06'),
(57, 'App\\Models\\User', 2, 'API Token', 'c87e6e5fc4488630f31f0363bd30c2d5b5755babfb1fcf1ae12722e687017e3d', '[\"*\"]', NULL, NULL, '2024-10-30 05:00:07', '2024-10-30 05:00:07'),
(58, 'App\\Models\\User', 2, 'API Token', '82570e24446893000b8ee11e950674eb9011ae4f63c8927efee0948a0eb03cc8', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:01', '2024-10-30 05:22:01'),
(59, 'App\\Models\\User', 2, 'API Token', '9e5dab1876b18a6d630e9c59d0468754a93e22aa0b8feaed28051b76fb56d9f2', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:02', '2024-10-30 05:22:02'),
(60, 'App\\Models\\User', 2, 'API Token', 'c28cff5035720096ede8a6f6686744d289b2797160f29872a00e1736c6d98cb6', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:03', '2024-10-30 05:22:03'),
(61, 'App\\Models\\User', 2, 'API Token', '8b3733be33d9fd384f07504f5e02f7eed541d36f0f9a67693cf4778ace49c2b0', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:04', '2024-10-30 05:22:04'),
(62, 'App\\Models\\User', 2, 'API Token', '16484bc7e30e50b655c7dbc5e95070337544924ab2be72d9c8e2c0049e0aeea4', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:05', '2024-10-30 05:22:05'),
(63, 'App\\Models\\User', 2, 'API Token', 'e5979125da7d9da6abc0656e5b3e8fd71deacf90d1901d7f8801546132c36d57', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:05', '2024-10-30 05:22:05'),
(64, 'App\\Models\\User', 2, 'API Token', '726e302f1fce1e2a6743c1a0a681c6d25043585507ec42acada3f8301bfded64', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:05', '2024-10-30 05:22:05'),
(65, 'App\\Models\\User', 2, 'API Token', 'a98471a08f05e20c7764e2643590a12d5230daa0fb0debd664eba1bd8ad83024', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:06', '2024-10-30 05:22:06'),
(66, 'App\\Models\\User', 2, 'API Token', '6fb15e09af7af8721f0a555d5a3c792fcab9ddb14a1fdb4d36f12f2f392ca989', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:06', '2024-10-30 05:22:06'),
(67, 'App\\Models\\User', 2, 'API Token', '901d6ded1f20be6ff4ee4288ca6c8968fb51d482c1f091ebe74efacd7aed546d', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:07', '2024-10-30 05:22:07'),
(68, 'App\\Models\\User', 2, 'API Token', '693f8a63fb476bee5042a295446dd3cc2348e02e563d2a22cbbbafe76f47317a', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:07', '2024-10-30 05:22:07'),
(69, 'App\\Models\\User', 2, 'API Token', '011eecad50dcda52f0757a5ed1f65429aa76447fb9f33cd7a74883efbd489971', '[\"*\"]', NULL, NULL, '2024-10-30 05:22:07', '2024-10-30 05:22:07'),
(70, 'App\\Models\\User', 2, 'API Token', 'ed7b63e10fe06648af15cf3870a55ac608f237d3982988270da203ea2c71647e', '[\"*\"]', NULL, NULL, '2024-10-30 05:24:26', '2024-10-30 05:24:26'),
(71, 'App\\Models\\User', 2, 'API Token', '596e2444a18a0d84342cad355f0b714a41809785d10e950e8820f9a7e86decc2', '[\"*\"]', NULL, NULL, '2024-10-30 05:24:35', '2024-10-30 05:24:35'),
(72, 'App\\Models\\User', 2, 'API Token', '963a33c15b5218ed0872cd897fcedbc9f47bbbb137df006a960c5566012eee1e', '[\"*\"]', NULL, NULL, '2024-10-30 05:30:32', '2024-10-30 05:30:32'),
(75, 'App\\Models\\User', 1, 'API Token', 'c581d49b8d50cde316f74f4343d68e665a0727f05e221ecda0ca1ce8f95d7a01', '[\"*\"]', NULL, NULL, '2024-10-30 07:18:15', '2024-10-30 07:18:15'),
(76, 'App\\Models\\User', 2, 'API Token', '21ed6838fb86dc598603e0632fcfebc8e1ec634d98b5f826d7284dae157a5c93', '[\"*\"]', NULL, NULL, '2024-10-30 07:28:21', '2024-10-30 07:28:21'),
(77, 'App\\Models\\User', 1, 'API Token', '8a91dcc3a0d8a9a7299a36ae1d3ec94e546d0d82def7a108997661d4469fe5e6', '[\"*\"]', NULL, NULL, '2024-10-30 22:20:26', '2024-10-30 22:20:26'),
(78, 'App\\Models\\User', 1, 'API Token', 'c5b423ea114fae816b8f7f0dc944769cff08884e4ecb26b0eec86e01523406a1', '[\"*\"]', NULL, NULL, '2024-10-30 22:32:05', '2024-10-30 22:32:05'),
(79, 'App\\Models\\User', 1, 'API Token', '689baf787ff866703cc835ce56059e2bbbbb45fd7a3ba9e59cc13e1f5f94e984', '[\"*\"]', NULL, NULL, '2024-10-30 22:45:08', '2024-10-30 22:45:08'),
(80, 'App\\Models\\User', 1, 'API Token', 'bbc48514017ca1527af2772c3531d299e9ade33f6953bb5e8b09677219d397e5', '[\"*\"]', NULL, NULL, '2024-10-30 22:45:08', '2024-10-30 22:45:08'),
(81, 'App\\Models\\User', 1, 'API Token', '18a648efc098fb93335ef4b5dbda78b5e26e2e2dc955861974fcce0c4cbaa1ae', '[\"*\"]', NULL, NULL, '2024-10-30 23:03:08', '2024-10-30 23:03:08'),
(82, 'App\\Models\\User', 1, 'API Token', '7640173be085803b28dda4dc004c90a58cf704ffa16f228778b1c7747d125633', '[\"*\"]', NULL, NULL, '2024-10-31 01:14:43', '2024-10-31 01:14:43'),
(83, 'App\\Models\\User', 1, 'API Token', 'c97b598789a657c21282269f5f929bb8af2af32f6e57e451f6019983cf046578', '[\"*\"]', NULL, NULL, '2024-11-19 18:33:29', '2024-11-19 18:33:29');

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
(1, 'admin', 'web', '2024-10-21 23:11:42', '2024-10-21 23:11:42'),
(2, 'student', 'web', '2024-10-21 23:11:42', '2024-10-21 23:11:42');

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
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `student_number` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `facebook_link` varchar(255) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `email`, `student_number`, `last_name`, `first_name`, `middle_name`, `sex`, `contact_number`, `facebook_link`, `birthdate`, `created_at`, `updated_at`) VALUES
(13, 'jonkenvergara@gmail.com', '123123', 'qweqwe', 'sdaads', 'qweqwe', 'Male', '123213213', NULL, '1999-02-12', '2024-10-30 06:30:18', '2024-10-30 06:30:18'),
(17, 'jonkenvergara12@gmail.com', '1231231231', 'qweqweqwqweqwe', 'asdasfasf', 'qweqweasd', 'Male', '12312412313', NULL, '1999-02-12', '2024-10-30 06:37:13', '2024-10-30 06:37:13'),
(18, 'primoieyasu1@gmail.com', '123123123', 'avzzzg', 'qwhgxxcf', 'qhsdf', 'Female', '123141231', NULL, '1999-03-12', '2024-10-30 07:30:06', '2024-10-30 07:30:06');

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
  `role` varchar(255) NOT NULL DEFAULT 'student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$eSfpdR1P6ezBHjiXyav2I.6YrLeHMZ5Ig4j4BDjfXwse.M0j6f4YG', NULL, '2024-10-21 23:11:42', '2024-10-21 23:11:42', 'admin'),
(2, 'John Doe', 'john.doe@example.com', NULL, '$2y$12$B2NaC/pfbHGE0qo0/On4rOqUyPcKS0Hwi8a.B3hvfbb6lzrMxt21O', NULL, '2024-10-22 00:41:57', '2024-10-22 00:41:57', 'student');

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
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_email_unique` (`email`),
  ADD UNIQUE KEY `students_student_number_unique` (`student_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
