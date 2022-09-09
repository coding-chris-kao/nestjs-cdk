# nestjs-cdk

A template for building AWS Lambda Function with NestJS and deploying with AWS CDK.
Powered by AWS ECR, thus you need to build and push your docker image first.

## Getting Started

```
docker build -t <app-name> .
docker push <app-name>
cd cdk
cdk bootstrap
cdk deploy
```