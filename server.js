const express = require('express');
const app = express();
app.use(express.json());

// Page d'accueil stylisée avec animations
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User API - Accueil</title>
        <style>
            :root {
                --primary: #6366f1;
                --primary-hover: #4f46e5;
                --bg: #f8fafc;
                --card-bg: #ffffff;
                --text: #1e293b;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: var(--bg);
                color: var(--text);
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
            }
            .container {
                text-align: center;
                background: var(--card-bg);
                padding: 3rem;
                border-radius: 1.5rem;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                transform: translateY(20px);
                opacity: 0;
                animation: slideUp 0.8s ease forwards;
                max-width: 500px;
                width: 90%;
            }
            @keyframes slideUp {
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: var(--primary);
                background: linear-gradient(to right, #6366f1, #a855f7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            p {
                font-size: 1.1rem;
                color: #64748b;
                margin-bottom: 2rem;
            }
            .btn {
                display: inline-block;
                background-color: var(--primary);
                color: white;
                padding: 0.8rem 2rem;
                border-radius: 0.75rem;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
            }
            .btn:hover {
                background-color: var(--primary-hover);
                transform: scale(1.05);
                box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.5);
            }
            .status-dot {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #22c55e;
                border-radius: 50%;
                margin-right: 8px;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>User API</h1>
            <p><span class="status-dot"></span> Serveur opérationnel</p>
            <p>Bienvenue sur votre interface de gestion d'utilisateurs sécurisée et performante.</p>
            <a href="/api/users" class="btn">Accéder aux utilisateurs</a>
        </div>
    </body>
    </html>
  `);
});

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user (Bonus)
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.status(200).json(deletedUser[0]);
});

// Pour les tests
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
