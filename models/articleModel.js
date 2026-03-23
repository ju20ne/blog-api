const db = require('../config/db');

const Article = {
    create: (article) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)`;
            db.run(sql,[article.titre, article.contenu, article.auteur, article.date, article.categorie, article.tags], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },
    findAll: (filters) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM articles WHERE 1=1`;
            let params =[];
            if (filters.categorie) { sql += ` AND categorie = ?`; params.push(filters.categorie); }
            if (filters.auteur) { sql += ` AND auteur = ?`; params.push(filters.auteur); }
            if (filters.date) { sql += ` AND date = ?`; params.push(filters.date); }
            
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM articles WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    update: (id, article) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?`;
            db.run(sql,[article.titre, article.contenu, article.categorie, article.tags, id], function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM articles WHERE id = ?`, [id], function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },
    search: (query) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?`;
            const searchQuery = `%${query}%`;
            db.all(sql,[searchQuery, searchQuery], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};

module.exports = Article;