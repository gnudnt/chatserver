import { Controller, Get, Query } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";

@Controller("api/conversations")
export class ConversationsController {
  constructor(private readonly service: ConversationsService) {}

  @Get()
  async getByUser(@Query("userId") userId: string) {
    if (!userId) {
      return { error: "Missing userId" };
    }
    return this.service.getByUser(userId);
  }
}
