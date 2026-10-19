import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() { return this.messageService.getAll(); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: string) { return this.messageService.findById(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: any) { return this.messageService.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) { return this.messageService.delete(id); }
}