const sqlite3 = require('sqlite3').verbose();

// Création/Connexion à la base de données SQLite
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
        // Création de la table si elle n'existe pas
        db.run(`CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            contenu TEXT,
            auteur TEXT NOT NULL,
            date TEXT,
            categorie TEXT,
            tags TEXT
        )`);
    }
});

module.exports = db;