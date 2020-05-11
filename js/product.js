let produit = null;

// REQUETTE APPEL API Produit sélectionné par son Id, en utilisant l'objet de requête Ajax contenant une promise
// --------------------------------------------------------------------------------------------------------------

const ajaxDetailsProduits = new Ajax();

ajaxDetailsProduits.promiseGetData('GET', API_URL,null)
  .then(function (response) {
    // Le serveur a correctement répondu
    produit=response;
    // Se positionner à l'endroit du DOM où insérer la fiche produit
    const itemArticleById = document.querySelector('.js-articleById');
    let data = response;
    console.log(data);
    // Appels de fonctions
    getArticleByIdData(itemArticleById,data); /* Intégration du détail produit sélectionné en page accueil catalogue dans la page produit.html */
    getSelectAllOption(data); /* Intégration dans la page produit.html du menu déroulant de choix des options produit */
    ajoutProduit(response); /* Ajout des produits au panier sur le clic bouton Ajouter au panier */
  })

  .catch(function () {
    console.log("Erreur, status = " + this.status);
  })


// FONCTION GET ARTICLE BY ID
// ---------------------------

function getArticleByIdData(itemArticleById,data) {
  itemArticleById.innerHTML = `<div class="card__thumb">
		<img class="card__thumb--img" src="${data.imageUrl}" alt="${data.name}" width="100"  height="100">
	</div>
	<div class="card__body">
		<h3 class="card__body--title">${data.name}</h3>
		<p class="card__body--name"><strong>Marque : </strong>${data.name}</p>
		<p class="card__body--varnish"><strong>Vernis : </strong>${data.varnish}</p>
		<P class="cards__item__body--description"><strong>Description : </strong>${data.description.slice(50)}</P>
		<p class="card__body--price"><strong>Prix : </strong>${data.price / 100}€</p>
		<form class="card__form" action="panier.html">
			<label class="card__form--label" for="varnish"><strong>Choisir un modèle : </strong> </label>
			<select id="varnish" class="card__form__select js-varnishSelectAllOption" aria-label="Sélectionner le modèle de votre choix">

			</select>
			<button class="btn" id="ajoutPanier" type="submit" aria-label="Valider et accéder au panier">Ajouter au panier</button>
		</form>
	</div>`;
}

// FONCTION CHOIX DES OPTIONS SUR L'RTICLE SELECTIONNE
// ---------------------------------------------------

function getSelectAllOption(data) {
  const varnishSelectAllOption = document.querySelector('.js-varnishSelectAllOption');
  for (let j = 0; j < data.varnish.length; j++) {
    varnishSelectAllOption.innerHTML += `<option class="card__form__select--option" value="${data.varnish[j]}">${data.varnish[j]}</option>`;
    console.log(data.varnish[j]);
  }
}

///VERIFICATION SI PANIER EXISTE DANS LOCALSTORAGE. SINON LE CREER
// ---------------------------------------------------------------

if(localStorage.getItem("panier")){
  console.log("Le panier existe dans LocalStorage");
}else{
  console.log("Le panier n'existe pas. => Le créer et l'enregistrer dans LocalStorage");
//Initialisation du panier
let initPanier = [];
localStorage.setItem("panier", JSON.stringify(initPanier));
};

//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];

//Le panier est disponible
let panier = JSON.parse(localStorage.getItem("panier"));


//AJOUT PRODUIT AU PANIER
//************************
/*
const ajoutPanier = new Ajax();

ajoutPanier.promiseGetData('GET', API_URL,null)
  .then(function (response) {
    // Le serveur a correctement répondu

    let produit = response;
    console.log(produit);
    // Appels de fonctions
    ajoutProduit(produit);
  })

  .catch(function () {
    console.log("Erreur, status = " + this.status);
  })
*/

function ajoutProduit(data) {
//Au clic sur le bouton Ajouter au panier => mettre le produit dans le panier
  let clicPanier = document.getElementById("ajoutPanier");
  console.log ("ajout panier");
  clicPanier.addEventListener("click", async function() {
    //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
    panier.push(data);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Produit ajouté au panier");
    alert("Produit ajouté au panier")
    let x = JSON.parse(localStorage.getItem("panier"));
    console.log(x);
  });
}
