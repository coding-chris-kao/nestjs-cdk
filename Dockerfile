FROM public.ecr.aws/lambda/nodejs:16

COPY api /api

WORKDIR /api

RUN npm install && npm run build

WORKDIR /api/dist

CMD [ "main.hanlder" ]