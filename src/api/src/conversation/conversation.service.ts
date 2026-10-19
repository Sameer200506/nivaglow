import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.conversation.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { customer: true, messages: true },
    });
  }

  findById(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: { messages: true, customer: true, tickets: true },
    });
  }

  create(dto: any) {
    return this.prisma.conversation.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.conversation.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.conversation.delete({ where: { id } });
  }

  async addMessage(conversationId: string, dto: any) {
    return this.prisma.message.create({
      data: { conversationId, ...dto },
    });
  }

  async toggleAI(conversationId: string) {
    const conv = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conv) throw new Error('Conversation not found');
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { aiActive: !conv.aiActive, status: !conv.aiActive ? 'HUMAN_ACTIVE' : 'AI_ACTIVE' },
    });
  }

  async resolve(conversationId: string) {
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { status: 'RESOLVED', closedAt: new Date() },
    });
  }
}