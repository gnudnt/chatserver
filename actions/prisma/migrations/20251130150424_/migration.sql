/*
  Warnings:

  - The primary key for the `attachments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attachments_id` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `end_at` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `messages_id` on the `attachments` table. All the data in the column will be lost.
  - You are about to alter the column `file_mime` on the `attachments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to drop the column `conversations_id` on the `calls` table. All the data in the column will be lost.
  - You are about to drop the column `end_at` on the `calls` table. All the data in the column will be lost.
  - You are about to drop the column `end_by` on the `calls` table. All the data in the column will be lost.
  - You are about to drop the column `recipent_id` on the `calls` table. All the data in the column will be lost.
  - The `call_type` column on the `calls` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `status` on the `calls` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - The `duration` column on the `calls` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `conversations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `conversations_id` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `last_messages_at` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `last_messages_id` on the `conversations` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `conversations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to drop the column `match_at` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `matches` table. All the data in the column will be lost.
  - The `status` column on the `matches` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `conversations_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleter` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `messages_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `replyToId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `messages` table. All the data in the column will be lost.
  - The `type` column on the `messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profiles_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to alter the column `username_code` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - The `gender` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roles_id` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `rolesname` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - The primary key for the `user_goal_stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_goal_stats_id` on the `user_goal_stats` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `user_goal_stats` table. All the data in the column will be lost.
  - The primary key for the `user_style_stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_style_stats_id` on the `user_style_stats` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `user_style_stats` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roles_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `community_post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `connection_request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moderation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moderation_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `swipe_quet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_learninggoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_studyday` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_studystyle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_studytime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_study_slot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verify_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `violation_keyword` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[last_message_id]` on the table `conversations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,tag_learninggoal_id]` on the table `user_goal_stats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,tag_studystyle_id]` on the table `user_style_stats` will be added. If there are existing duplicate values, this will fail.
  - The required column `attachment_id` was added to the `attachments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `conversation_id` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_id` to the `calls` table without a default value. This is not possible if the table is not empty.
  - The required column `conversation_id` was added to the `conversations` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conversation_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - The required column `message_id` was added to the `messages` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `messages` table without a default value. This is not possible if the table is not empty.
  - The required column `profile_id` was added to the `profiles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - The required column `role_id` was added to the `roles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `role_name` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `roles` table without a default value. This is not possible if the table is not empty.
  - The required column `stat_id` was added to the `user_goal_stats` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `user_goal_stats` table without a default value. This is not possible if the table is not empty.
  - The required column `stat_id` was added to the `user_style_stats` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `user_style_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "public"."RoleName" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "public"."MatchStatus" AS ENUM ('ACTIVE', 'UNMATCHED');

-- CreateEnum
CREATE TYPE "public"."CallType" AS ENUM ('AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "public"."ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."ModerationAction" AS ENUM ('WARN', 'BAN', 'MUTE', 'DELETE_CONTENT', 'NONE');

-- CreateEnum
CREATE TYPE "public"."ModerationStatus" AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('TEXT', 'IMAGE', 'FILE');

-- DropForeignKey
ALTER TABLE "public"."attachments" DROP CONSTRAINT "attachments_messages_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."attachments" DROP CONSTRAINT "attachments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."calls" DROP CONSTRAINT "calls_caller_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."calls" DROP CONSTRAINT "calls_conversations_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."calls" DROP CONSTRAINT "calls_end_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."calls" DROP CONSTRAINT "calls_recipent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."community_post" DROP CONSTRAINT "community_post_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."community_post" DROP CONSTRAINT "community_post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."connection_request" DROP CONSTRAINT "connection_request_from_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."connection_request" DROP CONSTRAINT "connection_request_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."connection_request" DROP CONSTRAINT "connection_request_to_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversations" DROP CONSTRAINT "conversations_last_messages_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversations" DROP CONSTRAINT "conversations_match_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."matches" DROP CONSTRAINT "matches_request_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."matches" DROP CONSTRAINT "matches_swipe1_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."matches" DROP CONSTRAINT "matches_swipe2_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."matches" DROP CONSTRAINT "matches_user1_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."matches" DROP CONSTRAINT "matches_user2_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_conversations_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_replyToId_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_message_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_reporter_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_target_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation" DROP CONSTRAINT "moderation_word_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation_log" DROP CONSTRAINT "moderation_log_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."moderation_log" DROP CONSTRAINT "moderation_log_moderation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification" DROP CONSTRAINT "notification_match_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification" DROP CONSTRAINT "notification_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification" DROP CONSTRAINT "notification_request_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification" DROP CONSTRAINT "notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification" DROP CONSTRAINT "notification_violation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_gender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_learninggoal_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_level_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_studyday_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_studystyle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_studytime_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_tag_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_users_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."swipe_quet" DROP CONSTRAINT "swipe_quet_swiper_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."swipe_quet" DROP CONSTRAINT "swipe_quet_target_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_goal_stats" DROP CONSTRAINT "user_goal_stats_tag_learninggoal_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_goal_stats" DROP CONSTRAINT "user_goal_stats_users_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_study_slot" DROP CONSTRAINT "user_study_slot_tag_studyday_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_study_slot" DROP CONSTRAINT "user_study_slot_tag_studytime_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_study_slot" DROP CONSTRAINT "user_study_slot_users_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_style_stats" DROP CONSTRAINT "user_style_stats_tag_studystyle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_style_stats" DROP CONSTRAINT "user_style_stats_users_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_roles_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."verify_code" DROP CONSTRAINT "verify_code_users_id_fkey";

-- DropIndex
DROP INDEX "public"."conversations_last_messages_id_key";

-- DropIndex
DROP INDEX "public"."profiles_users_id_key";

-- DropIndex
DROP INDEX "public"."user_goal_stats_users_id_tag_learninggoal_id_key";

-- DropIndex
DROP INDEX "public"."user_style_stats_users_id_tag_studystyle_id_key";

-- AlterTable
ALTER TABLE "public"."attachments" DROP CONSTRAINT "attachments_pkey",
DROP COLUMN "attachments_id",
DROP COLUMN "end_at",
DROP COLUMN "messages_id",
ADD COLUMN     "attachment_id" UUID NOT NULL,
ADD COLUMN     "message_id" UUID,
ALTER COLUMN "post_id" DROP NOT NULL,
ALTER COLUMN "file_mime" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "attachments_pkey" PRIMARY KEY ("attachment_id");

-- AlterTable
ALTER TABLE "public"."calls" DROP COLUMN "conversations_id",
DROP COLUMN "end_at",
DROP COLUMN "end_by",
DROP COLUMN "recipent_id",
ADD COLUMN     "conversation_id" UUID NOT NULL,
ADD COLUMN     "ended_at" TIMESTAMP,
ADD COLUMN     "ended_by_id" UUID,
ADD COLUMN     "recipient_id" UUID NOT NULL,
DROP COLUMN "call_type",
ADD COLUMN     "call_type" "public"."CallType" NOT NULL DEFAULT 'AUDIO',
ALTER COLUMN "status" SET DEFAULT 'CONNECTING',
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50),
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER;

-- AlterTable
ALTER TABLE "public"."conversations" DROP CONSTRAINT "conversations_pkey",
DROP COLUMN "conversations_id",
DROP COLUMN "last_messages_at",
DROP COLUMN "last_messages_id",
ADD COLUMN     "conversation_id" UUID NOT NULL,
ADD COLUMN     "last_message_at" TIMESTAMP,
ADD COLUMN     "last_message_id" UUID,
ALTER COLUMN "status" SET DEFAULT 'OPEN',
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "conversations_pkey" PRIMARY KEY ("conversation_id");

-- AlterTable
ALTER TABLE "public"."matches" DROP COLUMN "match_at",
DROP COLUMN "update_at",
ADD COLUMN     "matched_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL,
ALTER COLUMN "request_id" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."MatchStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "swipe1_id" DROP NOT NULL,
ALTER COLUMN "swipe2_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "conversations_id",
DROP COLUMN "is_deleter",
DROP COLUMN "messages_id",
DROP COLUMN "replyToId",
DROP COLUMN "update_at",
ADD COLUMN     "conversation_id" UUID NOT NULL,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "message_id" UUID NOT NULL,
ADD COLUMN     "reply_to_id" UUID,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "public"."ContentType" NOT NULL DEFAULT 'TEXT',
ALTER COLUMN "text" SET DATA TYPE TEXT,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id");

-- AlterTable
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_pkey",
DROP COLUMN "profiles_id",
DROP COLUMN "update_at",
DROP COLUMN "users_id",
ADD COLUMN     "profile_id" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "username_code" SET DATA TYPE VARCHAR(50),
DROP COLUMN "gender",
ADD COLUMN     "gender" "public"."Gender" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
ALTER COLUMN "bio" SET DATA TYPE TEXT,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id");

-- AlterTable
ALTER TABLE "public"."roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "roles_id",
DROP COLUMN "rolesname",
DROP COLUMN "updatedAt",
ADD COLUMN     "role_id" UUID NOT NULL,
ADD COLUMN     "role_name" "public"."RoleName" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id");

-- AlterTable
ALTER TABLE "public"."user_goal_stats" DROP CONSTRAINT "user_goal_stats_pkey",
DROP COLUMN "user_goal_stats_id",
DROP COLUMN "users_id",
ADD COLUMN     "stat_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
ADD CONSTRAINT "user_goal_stats_pkey" PRIMARY KEY ("stat_id");

-- AlterTable
ALTER TABLE "public"."user_style_stats" DROP CONSTRAINT "user_style_stats_pkey",
DROP COLUMN "user_style_stats_id",
DROP COLUMN "users_id",
ADD COLUMN     "stat_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
ADD CONSTRAINT "user_style_stats_pkey" PRIMARY KEY ("stat_id");

-- AlterTable
ALTER TABLE "public"."users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "roles_id",
DROP COLUMN "update_at",
DROP COLUMN "users_id",
ADD COLUMN     "role_id" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "public"."comment";

-- DropTable
DROP TABLE "public"."community_post";

-- DropTable
DROP TABLE "public"."connection_request";

-- DropTable
DROP TABLE "public"."moderation";

-- DropTable
DROP TABLE "public"."moderation_log";

-- DropTable
DROP TABLE "public"."notification";

-- DropTable
DROP TABLE "public"."swipe_quet";

-- DropTable
DROP TABLE "public"."tag_gender";

-- DropTable
DROP TABLE "public"."tag_learninggoal";

-- DropTable
DROP TABLE "public"."tag_level";

-- DropTable
DROP TABLE "public"."tag_studyday";

-- DropTable
DROP TABLE "public"."tag_studystyle";

-- DropTable
DROP TABLE "public"."tag_studytime";

-- DropTable
DROP TABLE "public"."tag_subject";

-- DropTable
DROP TABLE "public"."user_study_slot";

-- DropTable
DROP TABLE "public"."verify_code";

-- DropTable
DROP TABLE "public"."violation_keyword";

-- CreateTable
CREATE TABLE "public"."verify_codes" (
    "verify_code_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "used_at" TIMESTAMP,
    "expired_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verify_codes_pkey" PRIMARY KEY ("verify_code_id")
);

-- CreateTable
CREATE TABLE "public"."tag_subjects" (
    "tag_subject_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_subjects_pkey" PRIMARY KEY ("tag_subject_id")
);

-- CreateTable
CREATE TABLE "public"."tag_levels" (
    "tag_level_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_levels_pkey" PRIMARY KEY ("tag_level_id")
);

-- CreateTable
CREATE TABLE "public"."tag_study_styles" (
    "tag_studystyle_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_study_styles_pkey" PRIMARY KEY ("tag_studystyle_id")
);

-- CreateTable
CREATE TABLE "public"."tag_learning_goals" (
    "tag_learninggoal_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_learning_goals_pkey" PRIMARY KEY ("tag_learninggoal_id")
);

-- CreateTable
CREATE TABLE "public"."tag_genders" (
    "tag_gender_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_genders_pkey" PRIMARY KEY ("tag_gender_id")
);

-- CreateTable
CREATE TABLE "public"."tag_study_days" (
    "tag_studyday_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_study_days_pkey" PRIMARY KEY ("tag_studyday_id")
);

-- CreateTable
CREATE TABLE "public"."tag_study_times" (
    "tag_studytime_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_study_times_pkey" PRIMARY KEY ("tag_studytime_id")
);

-- CreateTable
CREATE TABLE "public"."swipes" (
    "swipe_id" UUID NOT NULL,
    "swiper_id" UUID NOT NULL,
    "target_id" UUID NOT NULL,
    "is_like" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "swipes_pkey" PRIMARY KEY ("swipe_id")
);

-- CreateTable
CREATE TABLE "public"."community_posts" (
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "admin_id" UUID,
    "content" TEXT NOT NULL,
    "status" "public"."PostStatus" NOT NULL DEFAULT 'DRAFT',
    "submitted_at" TIMESTAMP,
    "reviewed_at" TIMESTAMP,
    "published_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "community_posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "comment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "public"."connection_requests" (
    "request_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "from_user_id" UUID NOT NULL,
    "to_user_id" UUID NOT NULL,
    "message" TEXT,
    "status" "public"."ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "accepted_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connection_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "public"."violation_keywords" (
    "word_id" UUID NOT NULL,
    "word_text" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "violation_keywords_pkey" PRIMARY KEY ("word_id")
);

-- CreateTable
CREATE TABLE "public"."moderations" (
    "moderation_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "source" VARCHAR(50) NOT NULL,
    "target_id" UUID NOT NULL,
    "reporter_id" UUID,
    "reviewer_id" UUID,
    "message_id" UUID,
    "comment_id" UUID,
    "post_id" UUID,
    "word_id" UUID,
    "reason" TEXT,
    "action" "public"."ModerationAction" NOT NULL DEFAULT 'NONE',
    "status" "public"."ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "violation_count" INTEGER NOT NULL DEFAULT 1,
    "reviewed_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "moderations_pkey" PRIMARY KEY ("moderation_id")
);

-- CreateTable
CREATE TABLE "public"."moderation_logs" (
    "log_id" UUID NOT NULL,
    "moderation_id" UUID NOT NULL,
    "admin_id" UUID NOT NULL,
    "action" "public"."ModerationAction" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moderation_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "noti_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "match_id" UUID,
    "request_id" UUID,
    "post_id" UUID,
    "moderation_id" UUID,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("noti_id")
);

-- CreateTable
CREATE TABLE "public"."user_study_slots" (
    "slot_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tag_studyday_id" UUID NOT NULL,
    "tag_studytime_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_study_slots_pkey" PRIMARY KEY ("slot_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_subjects_code_key" ON "public"."tag_subjects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tag_levels_code_key" ON "public"."tag_levels"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tag_study_styles_code_key" ON "public"."tag_study_styles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tag_learning_goals_code_key" ON "public"."tag_learning_goals"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tag_genders_code_key" ON "public"."tag_genders"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tag_study_days_code_key" ON "public"."tag_study_days"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tag_study_times_code_key" ON "public"."tag_study_times"("code");

-- CreateIndex
CREATE UNIQUE INDEX "swipes_swiper_id_target_id_key" ON "public"."swipes"("swiper_id", "target_id");

-- CreateIndex
CREATE UNIQUE INDEX "violation_keywords_word_text_key" ON "public"."violation_keywords"("word_text");

-- CreateIndex
CREATE UNIQUE INDEX "user_study_slots_user_id_tag_studyday_id_tag_studytime_id_key" ON "public"."user_study_slots"("user_id", "tag_studyday_id", "tag_studytime_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_last_message_id_key" ON "public"."conversations"("last_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "public"."profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "public"."roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_goal_stats_user_id_tag_learninggoal_id_key" ON "public"."user_goal_stats"("user_id", "tag_learninggoal_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_style_stats_user_id_tag_studystyle_id_key" ON "public"."user_style_stats"("user_id", "tag_studystyle_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verify_codes" ADD CONSTRAINT "verify_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_level_id_fkey" FOREIGN KEY ("tag_level_id") REFERENCES "public"."tag_levels"("tag_level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_subject_id_fkey" FOREIGN KEY ("tag_subject_id") REFERENCES "public"."tag_subjects"("tag_subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_learninggoal_id_fkey" FOREIGN KEY ("tag_learninggoal_id") REFERENCES "public"."tag_learning_goals"("tag_learninggoal_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_studyday_id_fkey" FOREIGN KEY ("tag_studyday_id") REFERENCES "public"."tag_study_days"("tag_studyday_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_studytime_id_fkey" FOREIGN KEY ("tag_studytime_id") REFERENCES "public"."tag_study_times"("tag_studytime_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_gender_id_fkey" FOREIGN KEY ("tag_gender_id") REFERENCES "public"."tag_genders"("tag_gender_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_studystyle_id_fkey" FOREIGN KEY ("tag_studystyle_id") REFERENCES "public"."tag_study_styles"("tag_studystyle_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."swipes" ADD CONSTRAINT "swipes_swiper_id_fkey" FOREIGN KEY ("swiper_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."swipes" ADD CONSTRAINT "swipes_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."connection_requests"("request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_swipe1_id_fkey" FOREIGN KEY ("swipe1_id") REFERENCES "public"."swipes"("swipe_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_swipe2_id_fkey" FOREIGN KEY ("swipe2_id") REFERENCES "public"."swipes"("swipe_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conversations" ADD CONSTRAINT "conversations_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("match_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conversations" ADD CONSTRAINT "conversations_last_message_id_fkey" FOREIGN KEY ("last_message_id") REFERENCES "public"."messages"("message_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "public"."messages"("message_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachments" ADD CONSTRAINT "attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("message_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachments" ADD CONSTRAINT "attachments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_caller_id_fkey" FOREIGN KEY ("caller_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_ended_by_id_fkey" FOREIGN KEY ("ended_by_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."community_posts" ADD CONSTRAINT "community_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."community_posts" ADD CONSTRAINT "community_posts_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connection_requests" ADD CONSTRAINT "connection_requests_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connection_requests" ADD CONSTRAINT "connection_requests_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connection_requests" ADD CONSTRAINT "connection_requests_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("message_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderations" ADD CONSTRAINT "moderations_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "public"."violation_keywords"("word_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation_logs" ADD CONSTRAINT "moderation_logs_moderation_id_fkey" FOREIGN KEY ("moderation_id") REFERENCES "public"."moderations"("moderation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation_logs" ADD CONSTRAINT "moderation_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("match_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."connection_requests"("request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_moderation_id_fkey" FOREIGN KEY ("moderation_id") REFERENCES "public"."moderations"("moderation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_study_slots" ADD CONSTRAINT "user_study_slots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_study_slots" ADD CONSTRAINT "user_study_slots_tag_studyday_id_fkey" FOREIGN KEY ("tag_studyday_id") REFERENCES "public"."tag_study_days"("tag_studyday_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_study_slots" ADD CONSTRAINT "user_study_slots_tag_studytime_id_fkey" FOREIGN KEY ("tag_studytime_id") REFERENCES "public"."tag_study_times"("tag_studytime_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_style_stats" ADD CONSTRAINT "user_style_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_style_stats" ADD CONSTRAINT "user_style_stats_tag_studystyle_id_fkey" FOREIGN KEY ("tag_studystyle_id") REFERENCES "public"."tag_study_styles"("tag_studystyle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_goal_stats" ADD CONSTRAINT "user_goal_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_goal_stats" ADD CONSTRAINT "user_goal_stats_tag_learninggoal_id_fkey" FOREIGN KEY ("tag_learninggoal_id") REFERENCES "public"."tag_learning_goals"("tag_learninggoal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
