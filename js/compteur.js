const compteur = document.querySelector('#compteur');

// Calcul du nombre d'articles présents dans le panier
// --------------------------------------------------
let countArticles = 0;

JSON.parse(localStorage.getItem("panier")).forEach((produit)=>{
  countArticles +=parseInt(produit.qte);
});

// Affichage du nombre d'articles dans la navbar
// ---------------------------------------------

compteur.innerHTML = "-" + countArticles + "-";



