import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS before other configurations
  // In production, you'll set ALLOWED_ORIGIN in your environment variables
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:4200';

  app.enableCors({
    origin: allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Set Global Prefix
  // Note: Most GraphQL setups ignore the global prefix,
  // but if yours doesn't, your URI will be /api/graphql
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`📊 GraphQL: http://localhost:${port}/graphql (or /api/graphql)`);
}

bootstrap();
