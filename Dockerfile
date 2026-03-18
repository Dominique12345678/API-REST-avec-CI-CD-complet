# Utiliser une image Node.js légère
FROM node:18-slim

# Créer le dossier de l'app
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier le reste du code
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application
CMD [ "npm", "start" ]
