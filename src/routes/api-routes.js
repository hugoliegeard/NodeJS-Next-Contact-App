const express = require('express');
const router = express.Router();

const apiController = require('../controller/api-controller');

// -- Chargement des routes de notre API

// Récupérer les contacts
router.get('/contacts', apiController.contacts_get);

// Ajouter un contact
router.post('/contacts', apiController.contacts_post);

// Récupérer un Contact
router.get('/contacts/:id', apiController.contact_get);

// Mettre a jour un Contact
router.put('/contacts/:id', apiController.contacts_put);

// Supprimer un Contact
router.delete('/contacts/:id', apiController.contacts_delete);

// -- Exportation du router avec nos routes
module.exports = router;
