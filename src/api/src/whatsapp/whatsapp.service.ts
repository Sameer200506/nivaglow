import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhatsAppService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async sendMessage(dto: any) {
    const { to, message, send_type = 'text' } = dto;
    const token = this.config.get<string>('WHATSAPP_ACCESS_TOKEN');
    if (!token) {
      throw new BadRequestException('WhatsApp access token is not configured');
    }

    const url = `https://graph.facebook.com/${this.config.get<string>('WHATSAPP_GRAPH_VERSION')}/${this.config.get<string>('WHATSAPP_PHONE_NUMBER_ID')}/messages`;
    const body =
      send_type === 'template'
        ? {
            messaging_product: 'whatsapp',
            to,
            type: 'template',
            template: {
              name: dto.template_name,
              language: { code: dto.template_language || 'en_US' },
              components: dto.template_components || [],
            },
          }
        : {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: { preview_url: false, body: message },
          };

    // In a real implementation, this would call the Meta Graph API
    // For now, we'll simulate the send
    return {
      success: true,
      to,
      message: send_type === 'template' ? dto.template_name : message,
      sent_at: new Date().toISOString(),
    };
  }

  async verifyWebhook(query: any) {
    return query['hub.challenge'];
  }
}