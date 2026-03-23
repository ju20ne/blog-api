const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Attention: la route /search doit être avant /:id pour éviter les conflits
router.get('/search', articleController.searchArticles);

router.post('/', articleController.createArticle);
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;