const compteur = document.querySelector('#compteur');

let compteurPanier = localStorage.getItem("panier");

if (compteurPanier===null) {
  compteur.innerHTML = "-0-";
}
else {
// Calcul du nombre d'articles présents dans le panier
// --------------------------------------------------
  let countArticles = 0;

  JSON.parse(localStorage.getItem("panier")).forEach((produit)=>{
    countArticles +=parseInt(produit.qte);
  });

  // Affichage du nombre d'articles dans la navbar
  // ---------------------------------------------

  compteur.innerHTML = "-" + countArticles + "-";
}



