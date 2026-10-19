import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: { template: true },
    });
  }

  findById(id: string) {
    return this.prisma.campaign.findUnique({
      where: { id },
      include: { template: true, recipients: true },
    });
  }

  create(dto: any) {
    return this.prisma.campaign.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        type: dto.type,
        status: dto.status || 'DRAFT',
        audience: dto.audience || null,
        trigger: dto.trigger || null,
        templateId: dto.templateId || null,
        scheduleAt: dto.scheduleAt || null,
      },
    });
  }

  update(id: string, dto: any) {
    return this.prisma.campaign.update({
      where: { id },
      data: {
        name: dto.name,
        type: dto.type,
        status: dto.status,
        audience: dto.audience,
        trigger: dto.trigger,
        templateId: dto.templateId,
        scheduleAt: dto.scheduleAt,
      },
    });
  }

  delete(id: string) {
    return this.prisma.campaign.delete({ where: { id } });
  }

  async schedule(campaignId: string, at: Date) {
    return this.prisma.campaign.update({
      where: { id: campaignId },
      data: { status: 'SCHEDULED', scheduleAt: at },
    });
  }

  async activate(campaignId: string) {
    return this.prisma.campaign.update({
      where: { id: campaignId },
      data: { status: 'ACTIVE' },
    });
  }
}