-- CreateTable
CREATE TABLE "public"."roles" (
    "roles_id" UUID NOT NULL,
    "rolesname" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roles_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "users_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "roles_id" UUID NOT NULL,
    "email_verified_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("users_id")
);

-- CreateTable
CREATE TABLE "public"."verify_code" (
    "verify_code_id" UUID NOT NULL,
    "users_id" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "code" VARCHAR(6),
    "used_at" TIMESTAMP,
    "expired_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verify_code_pkey" PRIMARY KEY ("verify_code_id")
);

-- CreateTable
CREATE TABLE "public"."tag_subject" (
    "tag_subject_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_subject_pkey" PRIMARY KEY ("tag_subject_id")
);

-- CreateTable
CREATE TABLE "public"."tag_level" (
    "tag_level_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_level_pkey" PRIMARY KEY ("tag_level_id")
);

-- CreateTable
CREATE TABLE "public"."tag_studystyle" (
    "tag_studystyle_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_studystyle_pkey" PRIMARY KEY ("tag_studystyle_id")
);

-- CreateTable
CREATE TABLE "public"."tag_learninggoal" (
    "tag_learninggoal_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_learninggoal_pkey" PRIMARY KEY ("tag_learninggoal_id")
);

-- CreateTable
CREATE TABLE "public"."tag_gender" (
    "tag_gender_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_gender_pkey" PRIMARY KEY ("tag_gender_id")
);

-- CreateTable
CREATE TABLE "public"."tag_studyday" (
    "tag_studyday_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_studyday_pkey" PRIMARY KEY ("tag_studyday_id")
);

-- CreateTable
CREATE TABLE "public"."tag_studytime" (
    "tag_studytime_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_studytime_pkey" PRIMARY KEY ("tag_studytime_id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "profiles_id" UUID NOT NULL,
    "users_id" UUID NOT NULL,
    "username_code" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "avatar_url" VARCHAR(255),
    "profile_picture_url" VARCHAR(255),
    "gender" VARCHAR(255) NOT NULL,
    "birthday" DATE NOT NULL,
    "bio" VARCHAR(255),
    "school" VARCHAR(255),
    "achievement" TEXT,
    "tag_level_id" UUID NOT NULL,
    "tag_subject_id" UUID NOT NULL,
    "tag_learninggoal_id" UUID,
    "tag_studyday_id" UUID,
    "tag_studytime_id" UUID,
    "tag_gender_id" UUID,
    "tag_studystyle_id" UUID,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profiles_id")
);

-- CreateTable
CREATE TABLE "public"."swipe_quet" (
    "swipe_id" UUID NOT NULL,
    "swiper_id" UUID NOT NULL,
    "target_id" UUID NOT NULL,
    "like" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP,

    CONSTRAINT "swipe_quet_pkey" PRIMARY KEY ("swipe_id")
);

-- CreateTable
CREATE TABLE "public"."matches" (
    "match_id" UUID NOT NULL,
    "request_id" UUID NOT NULL,
    "user1_id" UUID NOT NULL,
    "user2_id" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'active',
    "swipe1_id" UUID NOT NULL,
    "swipe2_id" UUID NOT NULL,
    "match_at" TIMESTAMP NOT NULL,
    "end_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("match_id")
);

-- CreateTable
CREATE TABLE "public"."conversations" (
    "conversations_id" UUID NOT NULL,
    "match_id" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'open',
    "end_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_messages_id" UUID,
    "last_messages_at" TIMESTAMP,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("conversations_id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "messages_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "conversations_id" UUID NOT NULL,
    "call_id" UUID,
    "type" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255),
    "file_name" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP,
    "replyToId" UUID,
    "edited_at" TIMESTAMP,
    "read_at" TIMESTAMP,
    "is_deleter" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("messages_id")
);

-- CreateTable
CREATE TABLE "public"."attachments" (
    "attachments_id" UUID NOT NULL,
    "messages_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "file_url" VARCHAR(255) NOT NULL,
    "file_name" VARCHAR(255),
    "file_mime" VARCHAR(255),
    "file_size" INTEGER,
    "end_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("attachments_id")
);

-- CreateTable
CREATE TABLE "public"."calls" (
    "call_id" UUID NOT NULL,
    "conversations_id" UUID NOT NULL,
    "caller_id" UUID NOT NULL,
    "recipent_id" UUID NOT NULL,
    "call_type" VARCHAR(255) NOT NULL DEFAULT 'audio',
    "status" VARCHAR(255) NOT NULL DEFAULT 'đang kết nối',
    "accepted_at" TIMESTAMP,
    "end_at" TIMESTAMP,
    "end_by" UUID,
    "duration" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calls_pkey" PRIMARY KEY ("call_id")
);

-- CreateTable
CREATE TABLE "public"."community_post" (
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "admin_id" UUID NOT NULL,
    "post" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'draft',
    "submitted_at" TIMESTAMP,
    "reviewed_at" TIMESTAMP,
    "publish_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "community_post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "public"."comment" (
    "comment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'active',
    "delete_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "public"."connection_request" (
    "request_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "from_user_id" UUID NOT NULL,
    "to_user_id" UUID NOT NULL,
    "message" TEXT,
    "status" VARCHAR(255) NOT NULL DEFAULT 'pending',
    "accepted_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connection_request_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "public"."violation_keyword" (
    "word_id" UUID NOT NULL,
    "word_text" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "violation_keyword_pkey" PRIMARY KEY ("word_id")
);

-- CreateTable
CREATE TABLE "public"."moderation" (
    "moderation_id" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "source" VARCHAR(255) NOT NULL,
    "message_id" UUID,
    "comment_id" UUID,
    "post_id" UUID,
    "target_id" UUID NOT NULL,
    "reporter_id" UUID,
    "word_id" UUID,
    "reason" VARCHAR(255),
    "action" VARCHAR(255) NOT NULL DEFAULT 'warn',
    "status" VARCHAR(255) NOT NULL,
    "update_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewer_id" UUID,
    "review_at" TIMESTAMP,
    "count_violation" INTEGER NOT NULL,
    "start_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moderation_pkey" PRIMARY KEY ("moderation_id")
);

-- CreateTable
CREATE TABLE "public"."notification" (
    "noti_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "notice" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "match_id" UUID,
    "request_id" UUID,
    "violation_id" UUID,
    "post_id" UUID,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("noti_id")
);

-- CreateTable
CREATE TABLE "public"."moderation_log" (
    "moderation_log_id" UUID NOT NULL,
    "moderation_id" UUID NOT NULL,
    "admin_id" UUID NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moderation_log_pkey" PRIMARY KEY ("moderation_log_id")
);

-- CreateTable
CREATE TABLE "public"."user_study_slot" (
    "user_study_slot_id" UUID NOT NULL,
    "users_id" UUID NOT NULL,
    "tag_studyday_id" UUID NOT NULL,
    "tag_studytime_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_study_slot_pkey" PRIMARY KEY ("user_study_slot_id")
);

-- CreateTable
CREATE TABLE "public"."user_style_stats" (
    "user_style_stats_id" UUID NOT NULL,
    "users_id" UUID NOT NULL,
    "tag_studystyle_id" UUID NOT NULL,
    "seen_count" INTEGER NOT NULL DEFAULT 0,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "like_rate" DOUBLE PRECISION,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_style_stats_pkey" PRIMARY KEY ("user_style_stats_id")
);

-- CreateTable
CREATE TABLE "public"."user_goal_stats" (
    "user_goal_stats_id" UUID NOT NULL,
    "users_id" UUID NOT NULL,
    "tag_learninggoal_id" UUID NOT NULL,
    "seen_count" INTEGER NOT NULL DEFAULT 0,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "like_rate" DOUBLE PRECISION,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_goal_stats_pkey" PRIMARY KEY ("user_goal_stats_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_users_id_key" ON "public"."profiles"("users_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_code_key" ON "public"."profiles"("username_code");

-- CreateIndex
CREATE UNIQUE INDEX "swipe_quet_swiper_id_target_id_key" ON "public"."swipe_quet"("swiper_id", "target_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_user1_id_user2_id_key" ON "public"."matches"("user1_id", "user2_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_last_messages_id_key" ON "public"."conversations"("last_messages_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_study_slot_users_id_tag_studyday_id_tag_studytime_id_key" ON "public"."user_study_slot"("users_id", "tag_studyday_id", "tag_studytime_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_style_stats_users_id_tag_studystyle_id_key" ON "public"."user_style_stats"("users_id", "tag_studystyle_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_goal_stats_users_id_tag_learninggoal_id_key" ON "public"."user_goal_stats"("users_id", "tag_learninggoal_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_roles_id_fkey" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("roles_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verify_code" ADD CONSTRAINT "verify_code_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_level_id_fkey" FOREIGN KEY ("tag_level_id") REFERENCES "public"."tag_level"("tag_level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_subject_id_fkey" FOREIGN KEY ("tag_subject_id") REFERENCES "public"."tag_subject"("tag_subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_learninggoal_id_fkey" FOREIGN KEY ("tag_learninggoal_id") REFERENCES "public"."tag_learninggoal"("tag_learninggoal_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_studyday_id_fkey" FOREIGN KEY ("tag_studyday_id") REFERENCES "public"."tag_studyday"("tag_studyday_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_studytime_id_fkey" FOREIGN KEY ("tag_studytime_id") REFERENCES "public"."tag_studytime"("tag_studytime_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_gender_id_fkey" FOREIGN KEY ("tag_gender_id") REFERENCES "public"."tag_gender"("tag_gender_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_tag_studystyle_id_fkey" FOREIGN KEY ("tag_studystyle_id") REFERENCES "public"."tag_studystyle"("tag_studystyle_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."swipe_quet" ADD CONSTRAINT "swipe_quet_swiper_id_fkey" FOREIGN KEY ("swiper_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."swipe_quet" ADD CONSTRAINT "swipe_quet_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."connection_request"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_swipe1_id_fkey" FOREIGN KEY ("swipe1_id") REFERENCES "public"."swipe_quet"("swipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_swipe2_id_fkey" FOREIGN KEY ("swipe2_id") REFERENCES "public"."swipe_quet"("swipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conversations" ADD CONSTRAINT "conversations_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("match_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conversations" ADD CONSTRAINT "conversations_last_messages_id_fkey" FOREIGN KEY ("last_messages_id") REFERENCES "public"."messages"("messages_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_conversations_id_fkey" FOREIGN KEY ("conversations_id") REFERENCES "public"."conversations"("conversations_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "public"."calls"("call_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "public"."messages"("messages_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachments" ADD CONSTRAINT "attachments_messages_id_fkey" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("messages_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachments" ADD CONSTRAINT "attachments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_conversations_id_fkey" FOREIGN KEY ("conversations_id") REFERENCES "public"."conversations"("conversations_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_caller_id_fkey" FOREIGN KEY ("caller_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_recipent_id_fkey" FOREIGN KEY ("recipent_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."calls" ADD CONSTRAINT "calls_end_by_fkey" FOREIGN KEY ("end_by") REFERENCES "public"."users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."community_post" ADD CONSTRAINT "community_post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."community_post" ADD CONSTRAINT "community_post_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connection_request" ADD CONSTRAINT "connection_request_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connection_request" ADD CONSTRAINT "connection_request_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connection_request" ADD CONSTRAINT "connection_request_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("messages_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."comment"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "public"."violation_keyword"("word_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation" ADD CONSTRAINT "moderation_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("match_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."connection_request"("request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_violation_id_fkey" FOREIGN KEY ("violation_id") REFERENCES "public"."moderation"("moderation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation_log" ADD CONSTRAINT "moderation_log_moderation_id_fkey" FOREIGN KEY ("moderation_id") REFERENCES "public"."moderation"("moderation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moderation_log" ADD CONSTRAINT "moderation_log_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_study_slot" ADD CONSTRAINT "user_study_slot_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_study_slot" ADD CONSTRAINT "user_study_slot_tag_studyday_id_fkey" FOREIGN KEY ("tag_studyday_id") REFERENCES "public"."tag_studyday"("tag_studyday_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_study_slot" ADD CONSTRAINT "user_study_slot_tag_studytime_id_fkey" FOREIGN KEY ("tag_studytime_id") REFERENCES "public"."tag_studytime"("tag_studytime_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_style_stats" ADD CONSTRAINT "user_style_stats_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_style_stats" ADD CONSTRAINT "user_style_stats_tag_studystyle_id_fkey" FOREIGN KEY ("tag_studystyle_id") REFERENCES "public"."tag_studystyle"("tag_studystyle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_goal_stats" ADD CONSTRAINT "user_goal_stats_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("users_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_goal_stats" ADD CONSTRAINT "user_goal_stats_tag_learninggoal_id_fkey" FOREIGN KEY ("tag_learninggoal_id") REFERENCES "public"."tag_learninggoal"("tag_learninggoal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
