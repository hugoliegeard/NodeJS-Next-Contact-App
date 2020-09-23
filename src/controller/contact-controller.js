const { validationResult } = require('express-validator');

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
    console.log(body);

    const errors = validationResult(req);
    console.log(errors);

    // 2. Sauvegarde des données dans la base
    // 3. Notification / Confirmation
    // 4. Redirection sur la fiche du contact

    res.end('POST SUBMITED');
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
