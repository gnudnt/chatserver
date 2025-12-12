import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConversation extends Document {
  roomId: string;
  members: string[];
  lastMessage?: string;
  updatedAt: Date;
  unread: Map<string, number>; // ⭐ Unread count theo userId
}

const ConversationSchema: Schema<IConversation> = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    members: [{ type: String, required: true }],
    lastMessage: { type: String },

    // ⭐ NEW — lưu unread count dạng Map<userId, number>
    unread: {
      type: Map,
      of: Number,
      default: {}, // mỗi conversation bắt đầu với map rỗng
    },
  },
  { timestamps: true }
);

// ⭐ đảm bảo Mongoose không tạo lại model khi hot reload
const ConversationModel: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default ConversationModel;
