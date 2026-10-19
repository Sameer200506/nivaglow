import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IntegrationService } from './integration.service';

@Controller('integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @HttpCode(201)
  async create(@Body() dto: any) {
    return this.integrationService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('org/:orgId') // Simplified - would need organization lookup
  async getByOrg(@Param('orgId') orgId: string) {
    return this.integrationService.getByOrg(orgId);
  }
}
