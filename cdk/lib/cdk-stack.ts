import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as gateway from 'aws-cdk-lib/aws-apigateway';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = ecr.Repository.fromRepositoryName(
      this,
      'nestjs-app-image',
      'nestjs-app'
    );

    const backendLambda = new lambda.DockerImageFunction(
      this,
      'BackendHandler',
      {
        code: lambda.DockerImageCode.fromEcr(repository),
        timeout: Duration.seconds(30),
        retryAttempts: 1,
      }
    );

    new gateway.LambdaRestApi(this, 'BackendEndpoint', {
      handler: backendLambda,
    });
  }
}
