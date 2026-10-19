import { Controller, Get, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() { return this.ticketService.getAll(); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: string) { return this.ticketService.findById(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: any) { return this.ticketService.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id'), @Body() dto: any) { return this.ticketService.update(id, dto); }
}