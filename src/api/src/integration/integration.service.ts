import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntegrationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    // Create integration with organization, type, name, config
    return this.prisma.integration.create({
      data: {
        organizationId: dto.organizationId,
        type: dto.type,
        name: dto.name,
        config: dto.config,
      },
    });
  }

  async getByOrg(orgId: string) {
    const integrations = await this.prisma.integration.findMany({
      where: { organizationId: orgId },
      include: { type: true },
    });
    return integrations;
  }
}