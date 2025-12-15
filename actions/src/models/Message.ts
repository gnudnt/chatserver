import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  content?: string;
  images?: string[];
  fileUrl?: string;

  // ✅ ADD FOR REPLY MESSAGE (NEW)
  replyTo?: {
    messageId: string;        // id message được reply
    userId: string;           // user của message gốc
    content?: string;         // preview text
    images?: string[];        // preview ảnh
    fileUrl?: string;         // preview file
  };

  userId: string;
  roomId: string;
  createdAt: Date;
  readBy: string[];
  reactions: { userId: string; type: string }[];
  isRevoked?: boolean;

  // ✅ ADD FOR EDIT MESSAGE (GIỮ NGUYÊN)
  isEdited?: boolean;
  editedAt?: Date;

    // 📌 ADD FOR PIN MESSAGE (NEW)
  isPinned?: boolean;
  pinnedAt?: Date;
  pinnedBy?: string;

}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    content: { type: String },
    images: [{ type: String }],
    fileUrl: { type: String },

    // ✅ ADD FOR REPLY MESSAGE (NEW)
    replyTo: {
      messageId: { type: String },
      userId: { type: String },
      content: { type: String },
      images: [{ type: String }],
      fileUrl: { type: String },
      _id: false, // ✅ rất quan trọng – không tạo _id phụ
    },

    userId: { type: String, required: true },
    roomId: { type: String, required: true },

    readBy: [{ type: String, default: [] }],

    reactions: [
      {
        userId: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],

    isRevoked: { type: Boolean, default: false },

    // ✅ ADD FOR EDIT MESSAGE (GIỮ NGUYÊN)
    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date },

        // 📌 ADD FOR PIN MESSAGE (NEW)
    isPinned: { type: Boolean, default: false },
    pinnedAt: { type: Date },
    pinnedBy: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const MessageModel: Model<IMessage> =
  mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
