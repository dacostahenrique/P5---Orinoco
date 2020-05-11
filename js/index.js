

/*Requête serveur*/

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	        var response = JSON.parse(this.responseText);
	        console.log(response);
	        getAllArticlesData(response);
	    }
	};
	request.open("GET", "http://localhost:3000/api/furniture");
	request.send();



/*Selection elements*/

const items = document.querySelector('.js-allArticlesByCategory');

/*Fonction get all articles*/

function getAllArticlesData(response) {
    for (let i = 0; i < response.length; i++) {
    	let data = response [i];
    	console.log(data);
      items.innerHTML += `<li class="articles__lists--item cards__item">
			<div class="cards__item__thumb">
				<img class="cards__item__thumb--img" src="${response[i].imageUrl}" alt="Meubles en chêne ${response[i].name}" width="300" height="300">
			</div>
			<div class="cards__item__body">
				<h3 class="cards__item__body--title">Meuble en chêne ${response[i].name}</h3>
				<p class="cards__item__body--name"><strong>Marque : </strong>${response[i].name}</p>
				<p class="cards__item__body--varnish"><strong>Vernis : </strong>${response[i].varnish}</p>
				<P class="cards__item__body--description"><strong>Description : </strong>${response[i].description.slice(30)}...</P>
				<p class="cards__item__body--price"><strong>Prix : </strong>${response[i].price / 100}€</p>
				<div class="cards__item--button">
					<a class="btn" href="produit.html?indice=${i}" aria-label="Sélection du modèle ${response[i].name}">Ajouter</a>
					</a>
				</div>
			</div>
		</li>`;

    }
  }




