import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateController } from './template/template.controller';
import { TemplateService } from './template/template.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService],
  exports: [TemplateService],
})
export class TemplateModule {}