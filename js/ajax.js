// CONSTRUCTION D'UN OBJET AJAX GENERIQUE DE REQUETTE GET ET POST
//---------------------------------------------------------------

class Ajax {
  promiseGetData (method, url, data=null) {
  // On renvoie une promesse qui prend en paramettre une fonction
  // avec 2 paramètres, le callback de succès et d'erreur
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open(method, url, true);
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          if(this.status == 200)
            resolve(JSON.parse(this.responseText));
          else
            reject(request);
        }
      };
      request.send(data);
    })
  }
}


