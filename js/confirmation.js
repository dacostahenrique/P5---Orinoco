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
    //Implatation du nom, de la date, du N° de commande et du montant de la commande dans le html sur la page de confirmation
    document.getElementById("nomConfirm").innerHTML = order.contact.Nom;
    document.getElementById("date").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    document.getElementById("orderId").innerHTML = order.orderId;
    document.getElementById("montantTTC").innerHTML = montantPanier + "€"
    //Remise à zéro du sessionStorage et du localStorage
    sessionStorage.clear();
    localStorage.clear();
  }else{
  //Avertissement et redirection vers l'accueil
    alert("Aucune commande passée, Revenir au choix des produits !");
    window.location.href = "index.html"
  }
}

affichageConfirmation();






