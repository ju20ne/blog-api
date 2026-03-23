const Article = require('../models/articleModel');

exports.createArticle = async (req, res) => {
    try {
        const { titre, contenu, auteur, date, categorie, tags } = req.body;
        // Validation des entrées (Exigence du TP)
        if (!titre || titre.trim() === '' || !auteur || auteur.trim() === '') {
            return res.status(400).json({ error: "Le titre et l'auteur sont obligatoires et ne peuvent pas être vides." });
        }
        const id = await Article.create({ titre, contenu, auteur, date, categorie, tags });
        res.status(201).json({ message: "Article créé avec succès", id: id });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur (Internal Server Error)" });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const { categorie, auteur, date } = req.query;
        const articles = await Article.findAll({ categorie, auteur, date });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: "Article non trouvé (Not Found)" });
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.searchArticles = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: "Le paramètre 'query' est requis." });
        const articles = await Article.search(query);
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { titre, contenu, categorie, tags } = req.body;
        const changes = await Article.update(req.params.id, { titre, contenu, categorie, tags });
        if (changes === 0) return res.status(404).json({ error: "Article non trouvé" });
        res.status(200).json({ message: "Article mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const changes = await Article.delete(req.params.id);
        if (changes === 0) return res.status(404).json({ error: "Article non trouvé" });
        res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

