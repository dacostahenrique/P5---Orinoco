
/*Requête serveur*/

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	        var data = JSON.parse(this.responseText);
	        console.log(data)
	        getArticleByIndiceData(data);
	        getSelectAllOption(data);
	    }
	};
	request.open("GET", "http://localhost:3000/api/furniture");
	request.send();

 /* Selection elements */

const itemArticleByIndice = document.querySelector('.js-articleById');

/* Récupération url page courante */

var urlcourante = document.location.href;

var params = (new URL(document.location)).searchParams;
var i = params.get("indice");
console.log(i);

 /* Function get article by ID */

function getArticleByIndiceData(data) {
    itemArticleByIndice.innerHTML = `<div class="card__thumb">
		<img class="card__thumb--img" src="${data[i].imageUrl}" alt="Meuble en chêne ${data[i].name}" width="100"  height="100">
	</div>
	<div class="card__body">
		<h3 class="card__body--title">Meuble en chêne ${data[i].name}</h3>
		<p class="card__body--name"><strong>Marque : </strong>${data[i].name}</p>
		<p class="card__body--varnish"><strong>Vernis : </strong>${data[i].varnish}</p>
		<P class="cards__item__body--description"><strong>Description : </strong>${data[i].description.slice(50)}</P>
		<p class="card__body--price"><strong>Prix : </strong>${data[i].price / 100}€</p>
		<form class="card__form" action="panier.html?id=${data[i]._id}">
			<label class="card__form--label" for="varnish"><strong>Choisir un modèle : </strong> </label>
			<select id="varnish" class="card__form__select js-varnishSelectAllOption" aria-label="Sélectionner le modèle de votre choix">

			</select>
			<button class="btn" type="submit" aria-label="Valider et accéder au panier">Valider</button>
		</form>
	</div>`;
}

function getSelectAllOption(data) {
  const varnishSelectAllOption = document.querySelector('.js-varnishSelectAllOption');
  for (let j = 0; j < data[i].varnish.length; j++) {
    varnishSelectAllOption.innerHTML += `<option class="card__form__select--option" value="${data[i].varnish[j]}">${data[i].varnish[j]}</option>`;
  console.log(data[i].varnish[j]);
  }
}


