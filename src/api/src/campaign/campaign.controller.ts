import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CampaignService } from './campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() { return this.campaignService.getAll(); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: string) { return this.campaignService.findById(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: any) { return this.campaignService.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.campaignService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/activate')
  async activate(@Param('id') id: string) { return this.campaignService.activate(id); }
}