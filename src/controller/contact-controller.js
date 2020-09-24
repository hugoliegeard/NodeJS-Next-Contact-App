const {validationResult} = require('express-validator');
const Contact = require('../models/contact-model');

/**
 * Page Ajouter/Créer un Contact
 * ------------------------------
 * Affiche le formulaire d'ajout
 * @param req
 * @param res
 */
exports.create_get = (req, res) => {
    res.render('new-contact');
};

/**
 * Page Ajouter/Créer un Contact
 * ------------------------------
 * Traitement des données POST
 * @param req
 * @param res
 */
exports.create_post = (req, res) => {

    // 1. Récupération & Vérification des données
    const body = req.body;
    // console.log(body);

    const errors = validationResult(req);
    console.log(errors);

    // 2. Sauvegarde des données dans la base
    if (errors.isEmpty()) {

        const contact = new Contact({
            prenom: body.prenom,
            nom: body.nom,
            email: body.email,
            tel: body.tel,
        });

        contact.save(err => {

            if (err) console.log(err);
            // 3. Notification / Confirmation
            // TODO
            // 4. Redirection sur la fiche du contact
            res.redirect('/contacts');

        });

    } else {

        // Si la validation échoue, on transmet les erreurs à la vue
        res.render('new-contact', {
            'errors': errors.array(),
            'body': body
        });

    }
};

/**
 * Page Editer un Contact
 * ------------------------------
 * Affiche le formulaire d'update
 * @param req
 * @param res
 */
exports.update_get = (req, res) => {
    // TODO
};

/**
 * Page Editer un Contact
 * ------------------------------
 * Traitement des données POST
 * @param req
 * @param res
 */
exports.update_post = (req, res) => {
    // TODO
};

/**
 * Page Supprimer un Contact
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    // TODO
};
