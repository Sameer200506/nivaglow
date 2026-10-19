import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.ticket.findMany({
      orderBy: { createdAt: 'asc' },
      include: { customer: true, conversation: true },
    });
  }

  findById(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id },
      include: { customer: true, conversation: true },
    });
  }

  create(dto: any) {
    return this.prisma.ticket.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.ticket.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.ticket.delete({ where: { id } });
  }

  async createTicket(customerId: string, issue: string, priority: string) {
    return this.create({
      customerId,
      issue,
      priority,
      status: 'OPEN',
      createdAt: new Date(),
    });
  }
}