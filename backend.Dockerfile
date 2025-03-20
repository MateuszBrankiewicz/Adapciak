# Dockerfile
FROM node:20-alpine

# Ustawienie katalogu roboczego
WORKDIR /app

# Skopiowanie plików package.json i package-lock.json
COPY backend/package*.json ./

# Instalacja zależności
RUN npm install

# Instalacja nodemona i typescripta globalnie
RUN npm install -g nodemon typescript ts-node

# Skopiowanie reszty plików
COPY . .

# Expose port
EXPOSE 3000

# Ustawienie domyślnego polecenia
CMD ["npm", "run", "dev"]
