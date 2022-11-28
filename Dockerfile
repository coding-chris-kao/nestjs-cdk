FROM public.ecr.aws/lambda/nodejs:16

COPY package*.json tsconfig*.json ./dist ./

RUN npm install --omit=dev