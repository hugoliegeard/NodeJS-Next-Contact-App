const express = require('express');
const router = express.Router();
const {contactValidator} = require('../forms/contact-validator');

// -- Importation de nos controleurs
const defaultController = require('../controller/default-controller');
const contactController = require('../controller/contact-controller');

// -- Chargement des Routes
router.get('/', defaultController.index);
router.get('/contacts', defaultController.contacts);

// -- Afficher, Editer, Supprimer un Contact
router.get('/contact/:id', defaultController.contact);
router.get('/contact/:id/edit', contactController.update_get);
router.post('/contact/:id/edit', contactValidator, contactController.update_post);
router.get('/contact/:id/delete', contactController.delete);

// -- Ajouter un Contact
router.get('/ajouter-un-contact', contactController.create_get);
router.post('/ajouter-un-contact', contactValidator, contactController.create_post);

// -- Exportation du router avec nos routes
module.exports = router;
