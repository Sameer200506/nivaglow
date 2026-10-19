import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiAgentController } from './ai-agent/ai-agent.controller';
import { AiAgentService } from './ai-agent/ai-agent.service';

@Module({
  controllers: [AiAgentController],
  providers: [AiAgentService, PrismaService],
  exports: [AiAgentService],
})
export class AiAgentModule {}