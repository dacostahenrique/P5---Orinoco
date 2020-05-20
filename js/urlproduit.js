// RECUPERATION URL PAGE COURANTE
// -------------------------------

let id ="";
const host = "http://localhost:3000/api/furniture/";
let API_URL = host + id;
const API_URL_POST = host + "order";

let urlcourante = document.location.href;
let params = (new URL(document.location)).searchParams;
id = params.get("id");

if (params.has("id")){
  API_URL = host + id;
}
else{
  API_URL = host;
}





