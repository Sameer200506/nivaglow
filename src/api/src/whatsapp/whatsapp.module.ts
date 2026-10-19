import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsAppController } from './whatsapp/whatsapp.controller';
import { WhatsAppService } from './whatsapp/whatsapp.service';

@Module({
  controllers: [WhatsAppController],
  providers: [WhatsAppService, PrismaService],
  exports: [WhatsAppService],
})
export class WhatsAppModule {}