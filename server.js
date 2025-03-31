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

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
