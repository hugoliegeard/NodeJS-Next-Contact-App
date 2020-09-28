const vCardJS = require('vcards-js');

module.exports = {
    /**
     * En partant d'un objet contact,
     * génère une vCard.
     * @param contact
     * @returns {String}
     */
    generateVCard: contact => {

        const vCard = vCardJS();
        vCard.firstName = contact.prenom;
        vCard.lastName = contact.nom;
        vCard.email = contact.email;
        vCard.cellPhone = contact.tel;

        return vCard.getFormattedString();

    }
};
