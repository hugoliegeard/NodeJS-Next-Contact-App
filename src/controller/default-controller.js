const Contact = require('../models/contact-model');
const qrcode = require('qrcode');
const {generateVCard} = require('../services/vcard');

/**
 * Page Accueil
 * @param req
 * @param res
 */
exports.index = (req, res) => {
    // -- Redirection vers /contacts
    res.redirect('/contacts');
};

/**
 * Page Lister les Contacts
 * https://github.com/handlebars-lang/handlebars.js/issues/1642
 * @param req
 * @param res
 */
exports.contacts = (req, res) => {

    /**
     * Je récupère via mon model "Contact"
     * tous les documents "contacts"
     */
    Contact.find((err, contacts) => {

        if (err) console.log(err);

        /**
         * Je retourne à la vue les contacts
         * que j'ai récupéré.
         */
        res.render('contacts', {
            'contacts' : contacts.map(contact => contact.toJSON())
        });

    });
};

/**
 * Page Afficher un Contact
 * @param req
 * @param res
 */
exports.contact = (req, res) => {

    Contact.findById(req.params.id, (err, data) => {

        if (err) console.log(err);
        const contact = data.toJSON();

        // Génération de la vCard
        const vCard = generateVCard(contact);

        // Génération du QrCode
        qrcode.toDataURL(vCard, (err, image) => {

            // Ajout du qrCode au contact
            contact.qrcode = image;

            // -- Retour de la vue/page à l'utilisateur
            res.render('contact', {
                'contact' : contact,
            });

        });

    });

};
