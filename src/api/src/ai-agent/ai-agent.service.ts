import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AiAgentService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.aiAgent.findMany();
  }

  findByOrgId(orgId: string) {
    return this.prisma.aiAgent.findFirst({
      where: { organizationId: orgId },
    });
  }

  update(agentId: string, dto: any) {
    return this.prisma.aiAgent.update({ where: { id: agentId }, data: dto });
  }

  async getOrCreate(orgId: string) {
    let agent = await this.prisma.aiAgent.findFirst({
      where: { organizationId: orgId },
    });
    if (!agent) {
      agent = await this.prisma.aiAgent.create({
        data: {
          organizationId: orgId,
          name: 'NivaGlow AI Agent',
          tone: 'friendly',
          language: 'en',
          handleOrderTracking: true,
          handleProductQuestions: true,
          handleReturns: true,
          handleFAQs: true,
          escalatePaymentDisputes: true,
          escalateLegalIssues: true,
          escalateAngryCustomers: true,
          responseLength: 'normal',
          active: true,
        },
      });
    }
    return agent;
  }
}