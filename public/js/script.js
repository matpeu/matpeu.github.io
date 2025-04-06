document.getElementById("inscriptionForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche l'envoi classique du formulaire

    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let email = document.getElementById("email").value.trim();
    let telephone = document.getElementById("telephone").value.trim();
    let date = document.getElementById("date").value;
    let fonction = document.getElementById("fonction").value.trim();
    let entreprise = document.getElementById("entreprise").value.trim();

    let inscriptionData = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        date: document.getElementById("date").value,
        fonction: document.getElementById("fonction").value,
        entreprise: document.getElementById("entreprise").value
    };

    try {
        let response = await fetch("http://localhost:5000/api/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inscriptionData)
        });

        let result = await response.json();
        if (response.ok) {
            document.getElementById("message").textContent = result.message;
            document.getElementById("message").style.display = "block";
        } else {
            alert("Erreur : " + result.message);
        }
    } catch (error) {
        console.error("Erreur :", error);
    }

    if (prenom === "" || nom === "" || email === "" || telephone === "" || date === "" || fonction === "" || entreprise === "") {
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

document.querySelector(".btn-ticket").addEventListener("click", function() {
    window.location.href = "https://lien-vers-billetterie.com";
});
