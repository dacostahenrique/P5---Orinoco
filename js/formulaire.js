// FONCTION POST ENVOI DONNEES A L'API
// ----------------------------------

function ajaxPost (data) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/furniture/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
    request.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 201) {
          let response = JSON.parse(this.responseText)
          resolve(response)
        } else {
          reject(request)
        }
      }
    }
  })
}

// FONCTION DE VERIFICATION DU PANIER LORS DE L'ENVOI DU FORMULAIRE
// ----------------------------------------------------------------

let verifPanier = () =>{

  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("panier"));
  //Si le panier est vide ou null (suppression localStorage par)=>alerte
  if(etatPanier == null){
  //Si l'utilisateur à supprimé son localStorage etatPanier sur la page panier.html et qu'il continue le process de commande
    alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger");
    return false
  }else if(etatPanier.length < 1 || etatPanier == null){
    return false;
  }else{
    return true;
  }
};








// ENVOI DE LA REQUETE POSTE AU SUBMIT DU FORMULAIRE
// -------------------------------------------------

let form = document.getElementById("form");

if(verifPanier() == true){

  form.addEventListener("submit", function (event) { // Au moment du la soumission du formulaire :

    event.preventDefault();

    //Récupération des inputs du formulaire
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;

    ///Informations de contact saisie par l'utilisateur
    let contact = {
      Nom : nom,
      Prénom : prenom,
      Adresse : adresse,
      Ville : ville,
      Email : email
    };


    //On rempli le products envoyé à l'API
    let products = [];
    JSON.parse(localStorage.getItem("panier")).forEach((produit) =>{
      products.push(produit._id);
    });

    //Création de l'objet à envoyer à l'API
    let data = {
      contact,
      products
    };

    ajaxPost(data)
      .then(function (response) {
      //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans order-confirm.html

        const order = JSON.stringify(response);      // On transforme cet objet en chaine de caractère
        sessionStorage.setItem("order",order);


        //Chargement de la page de confirmation
        /*document.forms["formulaire"].action = './confirmation.html';*/
        window.location.href = "confirmation.html"
      })
      .catch(function (error) {
        console.error("Erreur lors de l'envoi des données: " + error);
        alert("erreur connexion");
      })
  })
}else{
  alert("Le panier est vide. Veuillez choir un produit");
  window.location.href = "index.html";
}

