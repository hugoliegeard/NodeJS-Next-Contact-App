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
    res.render('form-contact', {
        'pageName': 'Ajouter le Contact'
    });
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
            req.session.sessionFlash = {
                type: 'alert-success',
                message: 'Votre contact a bien été ajouté !'
            };

            // 4. Redirection sur la fiche du contact
            res.redirect('/contact/' + contact._id);

        });

    } else {

        // Si la validation échoue, on transmet les erreurs à la vue
        res.render('form-contact', {
            'errors': errors.array(),
            'pageName': 'Ajouter le Contact',
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
    Contact.findById(req.params.id, (err, contact) => {

        if (err) console.log(err);

        // -- Retour de la vue/page à l'utilisateur
        res.render('form-contact', {
            'body' : contact.toJSON(),
            'pageName': 'Modifier le Contact',
        });

    });
};

/**
 * Page Editer un Contact
 * ------------------------------
 * Traitement des données POST
 * @param req
 * @param res
 */
exports.update_post = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {

        // Il n'y a pas d'erreurs, mise à jour du contact dans la base.
        Contact.findByIdAndUpdate(req.params.id, req.body, (err, contact) => {

            req.session.sessionFlash = {
                type: 'alert-success',
                message: 'Votre contact a bien été modifié !'
            };

            // Redirection sur la fiche contact
            res.redirect('/contact/' + contact._id);

        });

    } else {

        // Il y a des erreurs, affichage des informations
        res.render('form-contact', {
            'body': req.body,
            'errors' : errors.array(),
            'pageName': 'Modifier le Contact',
        });

    }
};

/**
 * Page Supprimer un Contact
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    Contact.findByIdAndRemove(req.params.id, err => {

        if(err) {
            // Suppression impossible, une erreur est survenue
            req.session.sessionFlash = {
                type: 'alert-danger',
                message: 'Ooops, suppression impossible !'
            };

            res.redirect('/contacts');
        } else {
            // Suppression effectuée avec succès.
            req.session.sessionFlash = {
                type: 'alert-success',
                message: 'Votre contact a bien été supprimé !'
            };
            res.redirect('/contacts');
        }

    });
};
