# build environment
FROM node:10.19.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk upgrade --update && apk add --no-cache python3 python3-dev gcc gfortran freetype-dev musl-dev libpng-dev g++ lapack-dev
COPY package.json ./
COPY package-lock.json ./
RUN npm i --silent
RUN npm install react-scripts@4.0.3 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]