
// REQUETTE APPEL API Tous produits, en utilisant l'objet de requête Ajax contenant une promise
// --------------------------------------------------------------------------------------------

const ajaxCatalogueProduits = new Ajax();

ajaxCatalogueProduits.promiseGetData('GET', API_URL,null)
  .then(function (response) {
    // Le serveur a correctement répondu

    const items = document.querySelector('.js-allArticlesByCategory');
    for (let i = 0; i < response.length; i++) {
      let data = response [i];
      console.log(data);
      createItem (items, data, i);
    }
  })

  .catch(function (error) {
    console.error("Erreur lors de l'envoi des données: " + error)
  })

// CREATION DE LA PAGE PRODUITS DANS LE CORPS DU DOCUMENET HTML
// -----------------------------------------------------------

const createItem = function (items, product, i) {
  items.innerHTML += `<li class="articles__lists--item cards__item">
      <div class="cards__item__thumb">
        <img class="cards__item__thumb--img" src="${product.imageUrl}" alt="${product.name}" width="300" height="300">
      </div>
      <div class="cards__item__body">
        <h3 class="cards__item__body--title">${product.name}</h3>
        <p class="cards__item__body--name"><strong>Marque : </strong>${product.name}</p>
        <p class="cards__item__body--varnish"><strong>Vernis : </strong>${product.varnish}</p>
        <P class="cards__item__body--description"><strong>Description : </strong>${product.description.slice(30)}...</P>
        <p class="cards__item__body--price"><strong>Prix : </strong>${product.price / 100}€</p>
        <div class="cards__item--button">
          <a class="btn" href="produit.html?id=${product._id}" aria-label="Sélection du modèle ${product.name}">Choisir vos options</a>
          </a>
        </div>
      </div>
    </li>`;
}
