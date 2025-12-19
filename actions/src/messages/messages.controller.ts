import { Controller, Get, Param, Query } from "@nestjs/common";
import MessageModel from "../models/Message";

@Controller("messages")
export class MessagesController {
  //  search
  @Get("search")
  async searchMessages(
    @Query("roomId") roomId: string,
    @Query("keyword") keyword: string,
  ) {
    if (!roomId || !keyword) return [];

    return MessageModel.find({
      roomId,
      isRevoked: { $ne: true },
      content: { $regex: keyword, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
  }

  // LẤY MESSAGE THEO ID
  @Get(":id")
  async getMessageById(@Param("id") id: string) {
    if (!id) return null;

    return MessageModel.findOne({
      _id: id,
      isRevoked: { $ne: true },
    }).lean();
  }
}
