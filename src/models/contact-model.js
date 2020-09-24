const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Ici, je vais grâce au schema décrire
 * à quoi doit ressembler un contact dans ma base.
 * https://mongoosejs.com/docs/models.html
 */
const ContactSchema = Schema({
   prenom: String,
   nom: String,
   email: String,
   tel: String,
   createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Contact', ContactSchema);
