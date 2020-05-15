// PAGE PANIER
// -----------

//Création de chaque ligne du panier
//-----------------------------------

//Initialisation de l'incrémentation de l'id des lignes pour chaque produit

let i = 0;

const tableBody = document.querySelector('.table__body');

let panier = JSON.parse(localStorage.getItem("panier"));

// Tri du panier par ordre alphabétique sur le nom du produit
// ----------------------------------------------------------

panier.sort(function(a, b) {

  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }

});

localStorage.setItem("panier", JSON.stringify(panier));

// Fonction de création du panier dans la page html
// ------------------------------------------------

JSON.parse(localStorage.getItem("panier")).forEach((produit)=>{


  //Création de la ligne
  //--------------------

  let ligneProduit = document.createElement("tr");
  let nomProduit = document.createElement("td");
  let qteProduit = document.createElement("td")
  let prixProduit = document.createElement("td");
  let retirerProduit = document.createElement("td");
  let retirerProduitIcone = document.createElement("i");


  //Attribution des class pour le css
  //---------------------------------

  ligneProduit.setAttribute("class", "table__body--content");
  ligneProduit.setAttribute("id", "produit"+i);
  nomProduit.setAttribute("class", "overflow");
  retirerProduitIcone.setAttribute("id", "retirer"+i);
  retirerProduitIcone.setAttribute('class', "fas fa-trash-alt supprimerProduit");

  //Création d'un Event sur le clic de la corbeille pour retirer un produit du panier
  //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event

  retirerProduitIcone.addEventListener('click', supprimerProduit.bind(i));
  i++;

  //Insertion dans le HTML
  //----------------------

  tableBody.appendChild(ligneProduit);
  ligneProduit.appendChild(nomProduit);
  ligneProduit.appendChild(qteProduit);
  ligneProduit.appendChild(prixProduit);
  ligneProduit.appendChild(retirerProduit);
  retirerProduit.appendChild(retirerProduitIcone);

  //Contenu des lignes
  //------------------

  nomProduit.innerHTML = produit.name;
  qteProduit.textContent = parseInt(produit.qte);
  prixProduit.textContent = produit.subTotal + " €";
});

//Dernière ligne du tableau : Total
//---------------------------------

let totalPanier = document.createElement("tr");
totalPanier.setAttribute("class", "table__body--content");
let totalNom = document.createElement("td");
let celVide1 = document.createElement("td");
let celVide2 = document.createElement("td");
let totalMontant = document.createElement("td");

tableBody.appendChild(totalPanier);
totalPanier.appendChild(totalNom);
totalNom.innerHTML = "<strong>Total à payer</strong>"
totalPanier.appendChild(celVide1);
celVide1.textContent = "-";
totalPanier.appendChild(totalMontant);
totalMontant.setAttribute("id", "totalMontant")
totalPanier.appendChild(celVide2);
celVide2.textContent = "-";

//Calcul du montant total du panier
//---------------------------------
let montantPanier = 0;
JSON.parse(localStorage.getItem("panier")).forEach((produit)=>{
  montantPanier += produit.subTotal;
});

//Affichage du montant du panier
//------------------------------

document.getElementById("totalMontant").textContent = montantPanier + "€";

//Retirer un produit du panier
//----------------------------

function supprimerProduit (i) {

  //Retire l'élément avec l'indice i du panier
  panier.splice(i, 1);

  // Mettre à jour le localStorage avec le nouveau panier
  localStorage.setItem('panier', JSON.stringify(panier));

  //Relance la création de l'addition
  window.location.reload();
}


