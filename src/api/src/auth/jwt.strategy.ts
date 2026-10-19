import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends ServiceUniGuard {
  constructor(private jwt: JwtService, private prisma: PrismaService) {
    super();
  }

  async validate(payload: { sub: string; orgId: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const membership = await this.prisma.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId: payload.orgId, userId: payload.sub } },
    });
    if (!membership) {
      throw new UnauthorizedException('User not member of organization');
    }
    return { user, membership };
  }
}