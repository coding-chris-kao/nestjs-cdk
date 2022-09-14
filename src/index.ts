import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { eventContext } from '@vendia/serverless-express/src/middleware';
import { APIGatewayProxyHandlerV2, Handler } from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';
import { useMiddleware } from './middleware';

let cachedServer: Handler;

/**
 * Get the cached server or create one
 * @returns server: Handler
 */
async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    useMiddleware(nestApp);
    nestApp.use(eventContext());

    await nestApp.init();

    cachedServer = serverlessExpress({
      app: expressApp,
      binarySettings: { contentTypes: [] },
    });
  }

  return cachedServer;
}

export const handler: APIGatewayProxyHandlerV2 = async (
  event,
  context,
  callback,
) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});

process.on('uncaughtException', (reason) => {
  console.error('uncaughtException:', reason);
});
