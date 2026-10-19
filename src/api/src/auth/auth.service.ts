import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });

    const org = await this.prisma.organization.create({
      data: {
        name: dto.orgName,
        slug: this.generateSlug(dto.orgName),
        businessName: dto.businessName,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
        aiAgents: {
          create: {
            name: 'NivaGlow AI Agent',
          },
        },
      },
    });

    const tokens = await this.generateTokens(user.id, org.id);
    return { user: this.sanitizeUser(user), organization: org, ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { memberships: { include: { organization: true } } },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const organization = user.memberships[0]?.organization;
    if (!organization) throw new UnauthorizedException('No organization found');

    const tokens = await this.generateTokens(user.id, organization.id);
    return { user: this.sanitizeUser(user), organization, ...tokens };
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { memberships: { include: { organization: true } } },
      });
      if (!user) throw new UnauthorizedException('User not found');

      const organization = user.memberships[0]?.organization;
      if (!organization) throw new UnauthorizedException('No organization found');

      return this.generateTokens(user.id, organization.id);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(userId: string, orgId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    const membership = await this.prisma.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId: orgId, userId } },
    });
    return { user: this.sanitizeUser(user), role: membership?.role };
  }

  private async generateTokens(userId: string, orgId: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, orgId },
      { secret: process.env.JWT_SECRET, expiresIn: '7d' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' },
    );
    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: any) {
    const { password, ...rest } = user;
    return rest;
  }

  private generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Math.random().toString(36).slice(2, 8);
  }
}