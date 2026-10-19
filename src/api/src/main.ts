import { NestFactory, ValidationPipe } from '@nestjs/core';
import { SwaggerModule, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  ConfigModule.forRoot({ isGlobal: true });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const options: SwaggerDocumentOptions = {
    title: 'NivaGlow API',
    description: 'AI WhatsApp Sales & Support OS API',
    version: '1.0',
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`NivaGlow API running on http://localhost:${port}`);
}

bootstrap();