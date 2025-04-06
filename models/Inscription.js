const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    dateEvenement: { type: String, required: true },
    telephone: { type: String, required: true },
    fonction: { type: String, required: true },
    entreprise: { type: String, required: true }
});

const Inscription = mongoose.model('Inscription', inscriptionSchema);
module.exports = Inscription;
