const compteur = document.querySelector('#compteur');

let x = (JSON.parse(localStorage.getItem("panier"))).length;

console.log(x);

compteur.innerHTML = "-" + (JSON.parse(localStorage.getItem("panier"))).length + "-";
