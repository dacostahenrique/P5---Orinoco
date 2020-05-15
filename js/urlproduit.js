// RECUPERATION URL PAGE COURANTE
// -------------------------------

let id ="";
const host = "http://localhost:3000/api/furniture/";
let API_URL = host + id;
const API_URL_POST = host + "order";

let urlcourante = document.location.href;
console.log(urlcourante);
let params = (new URL(document.location)).searchParams;
id = params.get("id");

if (params.has("id")){
  console.log(id);
  API_URL = host + id;
  console.log(API_URL);
}
else{
  API_URL = host;
  console.log(API_URL);
}





