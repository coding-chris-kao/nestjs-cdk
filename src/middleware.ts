import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';

export function useMiddleware(app: INestApplication) {
  app.enableCors();
  app.use(json());
  useSwagger(app);
}

function useSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Serverless-NestJS')
    .setDescription('Basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
}
