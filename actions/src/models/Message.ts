import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  content?: string;
  images?: string[];
  fileUrl?: string;
  userId: string;
  roomId: string;
  createdAt: Date;
  readBy: string[];
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    content: { type: String },
    images: [{ type: String }],
    fileUrl: { type: String },
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    readBy: [{ type: String, default: [] }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
