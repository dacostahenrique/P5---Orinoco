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

//Tableau et objet demandés par l'API pour la commande - Seront utilisés lors de l'envoi du formulaire
// --------------------------------------------------------------------------------------------------

let contact = {};
let products = [];


// FONCTION DE VERIFICATION DU PANIER LORS DE L'ENVOI DU FORMULAIRE
// ----------------------------------------------------------------

verifPanier = () =>{

  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("panier"));
  if(etatPanier.length < 1 || etatPanier == null){
    alert("Votre panier est vide. Veuillez choisir un produit");
    document.location.href = "index.html";
    return false;
  }else{
    //Si le panier contient au moins un article, on remplit le tableau demandé pour envoi à l'API
    JSON.parse(localStorage.getItem("panier")).forEach((produit) =>{
      products.push(produit._id);
      return true;
    });
  }
};


// VERIFICATION DES CHAMPS DU FORMULAIRE
// -------------------------------------

verifChampForm = () =>{
  //Controle Regex
  let verifText = /[a-zA-Z]/;
  let verifNumber = /[0-9]/;
  //Source pour vérification email => http://www.codeurjava.com/2017/10/valider-une-adresse-email-en-javascript.html
  let verifMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let verifCarSpec = /[§!@#$%^&*(),.?":{}|<>]/;

  //message fin de controle
  let verifMessage = "";

  //Récupération des inputs
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;


  //tests des différents input du formulaire
  //Test du nom => aucun chiffre ou charactère spécial permis
  if(verifNumber.test(nom) == true || verifCarSpec.test(nom) == true || nom == ""){
    verifMessage = "Vérifier/renseigner votre nom";
  }else{
    console.log("Nom conforme");
  }
  //Test du nom => aucun chiffre ou charactère spécial permis
  if(verifNumber.test(prenom) == true || verifCarSpec.test(prenom) == true || prenom == ""){
    verifMessage = verifMessage + "\n" + "Vérifier/renseigner votre prénom";
  }else{
    console.log("Prénom conform");
  }
  //Test du mail selon le regex de la source L256
  if(verifMail.test(email) == false){
    verifMessage = verifMessage + "\n" + "Vérifier/renseigner votre email";
  }else{
    console.log("Email conforme");
  }
  //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
  if(verifCarSpec.test(adresse) == true || adresse == ""){
    verifMessage = verifMessage + "\n" + "Vérifier/renseigner votre adresse";
  }else{
    console.log("Adresse conforme");
  }
  //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
  if(verifCarSpec.test(ville) == true && verifNumber.test(ville) == true || ville == ""){
    verifMessage = verifMessage + "\n" + "Vérifier/renseigner votre ville"
  }else{
    console.log("Ville conforme")
  }
  //Si un des champs n'est pas bon => message d'alert avec la raison
  if(verifMessage != ""){
    alert("Veuillez :" + "\n" + verifMessage);
  }
  //Si tout est ok construction de l'objet contact
  else {

    contact = {
      Nom : nom,
      Prénom : prenom,
      Adresse : adresse,
      Ville : ville,
      Email : email
    };
  }
};


// ENVOI DE LA REQUETE POSTE AU SUBMIT DU FORMULAIRE

// -------------------------------------------------
const confirm = document.getElementById("confirm");


confirm.addEventListener("click", function (event) { // Au moment du la soumission du formulaire :

  event.preventDefault();

  if(verifPanier()==false){
    alert("Votre panier est vide. Veuillez choisir un produit");
    document.location.href = "index.html";
  }else{

    /*verifPanier();*/

    verifChampForm();

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
        document.forms["formulaire"].submit();
      })
      .catch(function (error) {
        console.error("Erreur lors de l'envoi des données: " + error);
        alert("erreur connexion");
      })
  }})


