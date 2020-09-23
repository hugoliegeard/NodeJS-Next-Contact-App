const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

// -- Importation de nos controleurs
const defaultController = require('../controller/default-controller');
const contactController = require('../controller/contact-controller');

// -- Chargement des Routes
router.get('/', defaultController.index);
router.get('/contacts', defaultController.contacts);

// -- Afficher, Editer, Supprimer un Contact
router.get('/contact/:id', defaultController.contact);
router.get('/contact/:id/edit', contactController.update_get);
router.post('/contact/:id/edit', contactController.update_post);
router.get('/contact/:id/delete', contactController.delete);

// -- Ajouter un Contact
router.get('/ajouter-un-contact', contactController.create_get);
router.post('/ajouter-un-contact', [
    check('prenom').trim().notEmpty().withMessage('Vous devez saisir le prénom.'),
    check('nom').trim().notEmpty().withMessage('Vous devez saisir le nom.'),
    check('email').trim().normalizeEmail()
        .notEmpty().withMessage('Vous devez saisir un email.')
        .isEmail().withMessage('Le format de votre email est incorrect'),
    check('tel').blacklist(' ').isMobilePhone('fr-FR')
        .withMessage('Vérifiez le format de votre numéro de téléphone.')
], contactController.create_post);

// -- Exportation du router avec nos routes
module.exports = router;
