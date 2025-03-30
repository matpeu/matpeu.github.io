document.getElementById("inscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi classique du formulaire

    let nom = document.getElementById("nom").value.trim();
    let email = document.getElementById("email").value.trim();
    let telephone = document.getElementById("telephone").value.trim();
    let date = document.getElementById("date").value;

    if (nom === "" || email === "" || telephone === "" || date === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    document.getElementById("message").style.display = "block"; // Affiche un message de succès

    // Réinitialiser le formulaire après soumission
    setTimeout(() => {
        document.getElementById("inscriptionForm").reset();
        document.getElementById("message").style.display = "none";
    }, 3000);
});
