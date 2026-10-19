import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.organization.findMany();
  }

  findById(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
      include: { members: { include: { user: true } }, aiAgents: true },
    });
  }

  create(dto: any) {
    const { name, slug, businessName } = dto;
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const org = await tx.organization.create({
        data: { name, slug: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(), businessName },
      });
      return org;
    });
  }

  update(id: string, dto: any) {
    return this.prisma.organization.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.organization.delete({ where: { id } });
  }
}