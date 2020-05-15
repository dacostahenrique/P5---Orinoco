// AFFICHAGE DES ELEMENTS DE CONFIRMATION DE COMMANDE
// --------------------------------------------------

affichageConfirmation = () =>{
  if(sessionStorage.getItem("order") != null){
    let date = new Date()
    //Calcul du montant total du panier
    //---------------------------------
    let montantPanier = 0;
    JSON.parse(localStorage.getItem("panier")).forEach((produit)=>{
      montantPanier += produit.subTotal;
    });
    //Parse du session storage
    let order = JSON.parse(sessionStorage.getItem("order"));
    //Implatation de prénom et de id de commande dans le html sur la page de confirmation
    document.getElementById("nomConfirm").innerHTML = order.contact.Nom;
    document.getElementById("date").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    document.getElementById("orderId").innerHTML = order.orderId;
    document.getElementById("montantTTC").innerHTML = montantPanier + "€"
    //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.clear();
    localStorage.clear();
  }else{
  //avertissement et redirection vers l'accueil
    alert("Aucune commande passée, Revenir au choix des produits !");
    window.location.href = "index.html"
  }
}

affichageConfirmation();






