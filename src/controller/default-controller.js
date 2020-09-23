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
 * @param req
 * @param res
 */
exports.contacts = (req, res) => {
    // TODO : Récupération des données dans la base
    // -- Retour de la vue/page à l'utilisateur
    res.render('contacts');
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
