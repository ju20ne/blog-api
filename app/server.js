const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
app.use(express.json()); // Permet de lire le JSON dans les requêtes (body-parser intégré)

// Configuration de Swagger pour la documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API Backend (INF222)',
            version: '1.0.0',
            description: 'API pour gérer un blog simple (Création, Lecture, Modification, Suppression)',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./routes/*.js'], // Va lire les commentaires dans les routes (s'il y en a)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Utilisation des routes
app.use('/api/articles', articleRoutes);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});