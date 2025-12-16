import { Injectable } from "@nestjs/common";
import ConversationModel from "../models/Conversation";

@Injectable()
export class ConversationsService {
  async getByUser(userId: string) {
    const conversations = await ConversationModel.find({
      members: userId,
    })
      .sort({ updatedAt: -1 })
      .lean();

    return conversations.map((c: any) => ({
      ...c,
      unreadCount: c.unread?.[userId] || 0,
    }));
  }
}
