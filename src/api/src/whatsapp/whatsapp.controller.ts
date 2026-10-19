import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WhatsAppService } from './whatsapp/whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('webhook')
  @HttpCode(200)
  async handleIncomingWebhook() {
    // In a real implementation, this would verify the webhook signature
    // and forward the message to our processing pipeline
    const body = this._extractBody();
    return {
      received: true,
      message: body,
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('messages')
  @HttpCode(201)
  async sendMessage(@Body() dto: any) {
    return this.whatsappService.sendMessage(dto);
  }
}

// Helper to extract body from Express
async _extractBody(): any {
  // In a real implementation, this would parse the incoming webhook payload
  return {};
}
