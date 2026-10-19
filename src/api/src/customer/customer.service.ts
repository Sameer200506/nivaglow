import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.customer.findMany();
  }

  findById(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { conversations: true, tickets: true },
    });
  }

  create(dto: any) {
    return this.prisma.customer.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.customer.delete({ where: { id } });
  }

  async findOrCreate(organizationId: string, phone: string, name?: string) {
    let customer = await this.prisma.customer.findUnique({
      where: { organizationId_phone: { organizationId, phone } },
    });
    if (!customer) {
      customer = await this.prisma.customer.create({
        data: { organizationId, phone, name },
      });
    }
    return customer;
  }
}