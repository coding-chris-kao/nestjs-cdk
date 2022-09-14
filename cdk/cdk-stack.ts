import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { resolve } from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const DockerfilePath = resolve(__dirname, '..');
    const nestjsLambda = new lambda.DockerImageFunction(this, 'nestjs-lambda', {
      code: lambda.DockerImageCode.fromImageAsset(DockerfilePath, {
        cmd: ['index.handler'],
      }),
      timeout: Duration.seconds(30),
      retryAttempts: 1,
      memorySize: 512,
    });

    new gateway.LambdaRestApi(this, 'nestjs-api-gateway', {
      handler: nestjsLambda,
    });
  }
}
