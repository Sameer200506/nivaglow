import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.message.findMany({ orderBy: { createdAt: 'asc' } });
  }

  findById(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.message.create({ data: dto });
  }

  delete(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}