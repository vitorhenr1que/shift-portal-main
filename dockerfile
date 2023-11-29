FROM node:alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install -g npm && \
    npm install --silent --legacy-peer-deps && \
    npm install react-scripts -g --silent
COPY . ./
RUN npm run build

FROM nginx:1.25-alpine-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html