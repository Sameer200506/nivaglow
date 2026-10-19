import { Controller, Get, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConversationService } from '../conversation/conversation.service';
import { ConversationController } from '../conversation/conversation.controller';

@Controller('customers')
export class CustomerController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  async getAll() {
    return this.conversationService.getAll();
  }

  @Get('$id')
  async getById(@Param('id') id: string) {
    return this.conversationService.findById(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() dto: any) {
    return this.conversationService.create(dto);
  }

  @Put('update')
  async update(@Param('id'), @Body() dto: any) {
    return this.conversationService.update(id, dto);
  }

  @Delete('delete')
  async delete(@Param('id') id: string) {
    return this.conversationService.delete(id);
  }
}
