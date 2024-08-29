# Stage 1: Install dependencies and build the project
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
