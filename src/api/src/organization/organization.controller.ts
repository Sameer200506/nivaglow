import { Controller, Get, Post, Body, Param, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrganizationService } from '../organization/organization.service';
import { OrganizerDto } from '../../dto/organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService, 
              @UseGuards(JwtAuthGuard, RolesGuard)) {
  }

  @Get()
  async getAll() {
    return this.organizationService.getAll();
  }

  @Get('$id')
  async getById(@Param('id') id: string) {
    return this.organizationService.findById(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() dto: OrganizerDto) {
    return this.organizationService.create(dto);
  }

  @Put('update')
  async update(@Param('id'), @Body() dto: OrganizerDto) {
    return this.organizationService.update(id, dto);
  }

  @Delete('delete')
  async delete(@Param('id') id: string) {
    return this.organizationService.delete(id);
  }
}
