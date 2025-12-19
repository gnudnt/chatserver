import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from "./conversations/conversations.module";
import { UploadModule } from "./upload/upload.module";
import { MessagesModule } from "./messages/messages.module";



@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ConversationsModule, UploadModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
