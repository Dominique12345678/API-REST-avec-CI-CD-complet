# User API

REST API pour gestion d'utilisateurs.

![CI Pipeline](https://github.com/USER/user-api/actions/workflows/ci.yml/badge.svg)

## Installation
```bash
npm install
```

## Utilisation
```bash
npm start
```
L'API sera disponible sur `http://localhost:3000`.

## Tests
```bash
npm test
npm run test:coverage
```

## Linting
```bash
npm run lint
```

## Endpoints
- `GET /api/users` — Liste tous les utilisateurs
- `GET /api/users/:id` — Récupère un utilisateur par ID
- `POST /api/users` — Crée un nouvel utilisateur
- `DELETE /api/users/:id` — Supprime un utilisateur (Bonus)
