import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignController } from './campaign/campaign.controller';
import { CampaignService } from './campaign/campaign.service';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService],
  exports: [CampaignService],
})
export class CampaignModule {}