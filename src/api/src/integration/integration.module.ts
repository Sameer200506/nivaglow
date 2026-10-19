import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

@Module({
  controllers: [IntegrationController],
  providers: [IntegrationService, PrismaService],
  exports: [IntegrationService],
})
export class IntegrationModule {}