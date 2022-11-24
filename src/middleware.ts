import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';

export function useMiddleware(app: INestApplication) {
  app.enableCors();
  app.use(json());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useSwagger(app);
}

function useSwagger(app: INestApplication) {
  const urlPrefix = '';
  let jsonLink = '/document-json';

  const configBuilder = new DocumentBuilder()
    .setTitle('Serverless-NestJS')
    .setVersion('1.0');

  if (process.env.NODE_ENV !== 'development') {
    configBuilder.addServer(urlPrefix);
    jsonLink = urlPrefix + jsonLink;
  }

  configBuilder.setDescription(
    `Right Click to get <a href="${jsonLink}">JSON Link<a/>`,
  );

  const config = configBuilder.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
}
