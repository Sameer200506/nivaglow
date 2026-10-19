import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, PrismaService],
  exports: [OrganizationService],
})
export class OrganizationModule {}