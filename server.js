require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Modèle d'inscription
const InscriptionSchema = new mongoose.Schema({
  nom: String,
  email: String,
  telephone: String,
  date: String,
});

const Inscription = mongoose.model("Inscription", InscriptionSchema);

// Route POST pour enregistrer une inscription
app.post("/api/inscription", async (req, res) => {
  try {
    const nouvelleInscription = new Inscription(req.body);
    await nouvelleInscription.save();
    res.status(201).json({ message: "Inscription réussie !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
});

// Route GET pour récupérer les inscriptions
app.get("/api/inscriptions", async (req, res) => {
  try {
    const inscriptions = await Inscription.find();
    res.json(inscriptions);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération des inscriptions", error });
  }
});

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Inscription à BizEvent',
          },
          unit_amount: 1500, // Montant en centimes (€15.00)
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5000/success.html',
      cancel_url: 'http://localhost:5000/cancel.html',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création de la session");
  }
});


// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
