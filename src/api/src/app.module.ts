import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { CustomerModule } from './customer/customer.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { TicketModule } from './ticket/ticket.module';
import { IntegrationModule } from './integration/integration.module';
import { AiAgentModule } from './ai-agent/ai-agent.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { CampaignModule } from './campaign/campaign.module';
import { TemplateModule } from './template/template.module';
import { VoiceCallModule } from './voice-call/voice-call.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { WebSocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    OrganizationModule,
    CustomerModule,
    ConversationModule,
    MessageModule,
    TicketModule,
    IntegrationModule,
    AiAgentModule,
    WhatsAppModule,
    CampaignModule,
    TemplateModule,
    VoiceCallModule,
    KnowledgeModule,
    AnalyticsModule,
  ],
  providers: [WebSocketGateway],
})
export class AppModule {}