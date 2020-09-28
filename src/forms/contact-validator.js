const {check} = require('express-validator');

exports.contactValidator = [
    check('prenom').trim().notEmpty().withMessage('Vous devez saisir le prénom.'),
    check('nom').trim().notEmpty().withMessage('Vous devez saisir le nom.'),
    check('email').trim().normalizeEmail()
        .notEmpty().withMessage('Vous devez saisir un email.')
        .isEmail().withMessage('Le format de votre email est incorrect'),
    check('tel').blacklist(' ').isMobilePhone('fr-FR')
        .withMessage('Vérifiez le format de votre numéro de téléphone.')
];
