-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 04:37 AM
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
(5, 6, 'qweqweqwe', 'qweqweq', 'weqweqwe', 'qweqweqwe', 'qweqweqw', '222', '2024-11-28 23:29:22', '2024-11-28 23:29:22');

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
(5, 6, 'Julie Rose Vergara', '09760812037', 'Catholic', '2024-11-28 23:29:22', '2024-11-28 23:29:22');

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
(42, '2024_11_28_163953_rename_status_column_in_payments_table', 1);

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
(5, 6, '124214214', 'qweqweqwewqe', '214214214', 24.00, '2024-11-28 23:29:22', '2024-11-28 23:29:22', 'pending');

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
(2, 'App\\Models\\User', 4, 'API Token', '6e83983981169e8a2cfe9257385f3f69e3ae3dbbdbf38d89df0c0391382d14af', '[\"*\"]', NULL, NULL, '2024-11-28 09:36:41', '2024-11-28 09:36:41'),
(3, 'App\\Models\\User', 3, 'API Token', 'aa9070ca912c6d9e2b980026bc6609f60533866f0b3eaf8365941c49d5193d59', '[\"*\"]', NULL, NULL, '2024-11-28 09:38:13', '2024-11-28 09:38:13'),
(4, 'App\\Models\\User', 3, 'API Token', '64869a73bf9abe15da73421194387845e082b2b94bed98749c837b7d502c537b', '[\"*\"]', NULL, NULL, '2024-11-28 20:49:19', '2024-11-28 20:49:19'),
(5, 'App\\Models\\User', 2, 'API Token', 'bf861bf013e31c6add78fad9fdcf24edeaae5be390e2c26ad1e4fd3ab31705c9', '[\"*\"]', NULL, NULL, '2024-11-28 21:01:39', '2024-11-28 21:01:39'),
(6, 'App\\Models\\User', 3, 'API Token', '1d8c9577f7e9ed5e106c5b86bf642739d9ed81930fe613d8fb8f941618490fd8', '[\"*\"]', NULL, NULL, '2024-11-28 21:03:30', '2024-11-28 21:03:30'),
(8, 'App\\Models\\User', 4, 'API Token', '1bc62201c031dc850a906f1f9aba1bce0d7fa2f9046f3d79289480195b0479ed', '[\"*\"]', NULL, NULL, '2024-11-28 21:31:48', '2024-11-28 21:31:48'),
(11, 'App\\Models\\User', 4, 'API Token', 'cc12aae5c9259f8ce3212a8da0df38f50a60fd335cb74ee8474326fc33c7ed76', '[\"*\"]', '2024-11-28 23:41:54', NULL, '2024-11-28 23:41:49', '2024-11-28 23:41:54');

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
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `email`, `student_number`, `last_name`, `first_name`, `middle_name`, `sex`, `contact_number`, `facebook_link`, `birthdate`, `status`, `created_at`, `updated_at`, `archived`) VALUES
(6, 'student@example.com', '202211868', 'qweqweqwe', 'qweqweqwe', 'qweqweqweqw', 'Male', '124214214', NULL, '2222-02-22', 'officer_approved', '2024-11-28 23:29:22', '2024-11-29 01:23:36', 0);

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
  `program` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `student_number`, `program`, `student_id`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$QxDK/lfnBTjr4E5oV2mPeOfImWVWFPBypPKE/TeYUqZhEP7y6M8Si', NULL, '2024-11-28 09:35:52', '2024-11-28 23:32:04', 'admin', NULL, NULL, NULL),
(2, 'Faculty User', 'faculty@example.com', NULL, '$2y$12$gN7guGxJzxE1LkKx6oNTUeBdprmKBkYUTt/WVQSyXqBrneLEN/tOe', NULL, '2024-11-28 09:35:52', '2024-11-28 23:32:05', 'faculty', NULL, NULL, NULL),
(3, 'Officer User', 'officer@example.com', NULL, '$2y$12$Jzj1DJcR6JMOig/eBnp5I.CqLSpaD8SLTaavSUASp/F.f1htKsj9u', NULL, '2024-11-28 09:35:53', '2024-11-28 23:32:05', 'officers', NULL, NULL, NULL),
(4, 'Student User', 'student@example.com', NULL, '$2y$12$m.oUDVpKuhxSx0onFx5leuPN30oVZjuvpIV3zxVttEcioI8/D2Z5a', NULL, '2024-11-28 09:35:53', '2024-11-28 23:32:05', 'student', '202211868', NULL, NULL),
(5, 'Jon User', 'jon@example.com', NULL, '$2y$12$1qL8Kjl5jZRNvijpGoueCevujhCgC4by7zZsWvTY7uY8NFHfe1SFm', NULL, '2024-11-28 23:32:05', '2024-11-28 23:32:05', 'student', '202211869', NULL, NULL);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
