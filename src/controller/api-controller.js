const Contact = require('../models/contact-model');

/**
 * Afficher les contacts
 * @param req
 * @param res
 */
exports.contacts_get = (req, res) => {
    Contact.find((err, contacts) => {

        if (err) console.log(err);

        res.status(200).json({
           status: 200,
           method: req.method,
           data: contacts
        });

    });
};

/**
 * Ajouter un contact
 * @param req
 * @param res
 */
exports.contacts_post = (req, res) => {

    // Création du contact
    const body = req.body;
    const contact = new Contact({
        prenom: body.prenom,
        nom: body.nom,
        email: body.email,
        tel: body.tel,
    });

    // Sauvegarde du contact
    contact.save(err => {

        if (err) console.log(err);
        res.status(201).json({
            status: 201,
            method: req.method,
            data: contact
        });

    });
};

/**
 * Récupérer un contact
 * @param req
 * @param res
 */
exports.contact_get = (req, res) => {
    // TODO
};

// Ainsi de suite...
exports.contacts_put = (req, res) => {};
exports.contacts_delete = (req, res) => {};
