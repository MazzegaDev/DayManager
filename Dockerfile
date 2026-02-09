# =====Build
FROM node:25-alpine AS base
WORKDIR /DAYMANAGER
RUN apk add --no-cache python3 make g++ openssl
COPY package*.json . 
#Instala os pacotes
RUN npm install
COPY . .
#Compila de ts para js
RUN npm run build

# =====Prod
FROM node:25-alpine AS production
WORKDIR /DAYMANAGER
COPY --from=base /DAYMANAGER/package*.json ./
RUN npm install --production
COPY --from=base /DAYMANAGER/dist ./dist
EXPOSE 5000
CMD [ "node", "dist/server.js" ]