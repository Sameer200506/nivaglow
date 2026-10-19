import { Controller, Get, Post, Body, Param, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiAgentService } from './ai-agent.service';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() { return this.aiAgentService.getAll(); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':orgId')
  async getByOrg(@Param('orgId') orgId: string) {
    return this.aiAgentService.findByOrgId(orgId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':agentId/update')
  async update(@Param('agentId'), @Body() dto: any) {
    return this.aiAgentService.update(agentId, dto);
  }
}