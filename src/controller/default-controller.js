const Contact = require('../models/contact-model');

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
    // TODO : Récupération des données dans la base
    // -- Retour de la vue/page à l'utilisateur
    res.render('contact');
};
