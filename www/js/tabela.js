$('.import').on('click', function() {
    var root = 'http://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/posts/1',
        method: 'GET'
    }).then(function(data) {
        var str = JSON.stringify(data, null, '\t')
        $('.mostrar').html(
            str.replace(/\n/g, '<br/>')
                .replace(/\\n/g, ' ')
                .replace(/\t/g, '&nbsp;&nbsp;')
            );
            
        var lista = '<table class="striped">';

        contatoArray = JSON.parse(data);
        lista = lista + '<thead> <tr> <th>User ID</th> <th>ID</th> <th>Title</th> <th>Body</th> <th></th> <th></th> </tr> </thead> <tbody>';
        lista = lista + '<tr><td>' + contatoArray.userId + '</td><td>' + contatoArray.id + '</td><td>' + contatoArray.title + '</td><td>' + contatoArray.body + '</td>';
        lista = lista + "<td><a href='atualizar.html?id=" + contatoArray.id + "'><img src='img/update.png' /></a></td>";
        lista = lista + "<td><img src='img/delete.png' id='" + contatoArray.id + "' onclick='apagar(this.id)' /></td></tr>";


        lista = lista + "</table>";

        lbUsers.innerHTML = lista;

        //var chave = GerarChave();
        //window.localStorage.setItem(chave, data);
    });
});


/*$('.import').on('click', function() {
    var root = 'http://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/posts',
        method: 'GET'
    }).then(function(data) {
        var str = JSON.stringify(data, null, '\t')
        $('.mostrar').html(
            str.replace(/\n/g, '<br/>')
                .replace(/\\n/g, ' ')
                .replace(/\t/g, '&nbsp;&nbsp;')
            );
        var table = document.getElementById("myTable");
        
        data.forEach(function(item, index){
            var row = table.insertRow(index + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = item.userId;
            cell2.innerHTML = item.id;
            cell3.innerHTML = item.title;
            cell4.innerHTML = item.body;

            var chave = GerarChave();
            window.localStorage.setItem(chave, item);
        });
    });
});

*/
/*function AddValue(){
  var contatoJson = MontarJson();
  var chave = GerarChave();

  window.localStorage.setItem(chave, contatoJson);

  alert("Contato cadastrado com sucesso");

  listarRegistros();

}*/


function GerarChave(){
    indiceArray = getIndice();

    if(indiceArray == null) {
       window.localStorage.setItem("indice", '[0]');
       novo = 0;
    }
    else{
      novo = indiceArray.length;
      indiceArray.push(novo);
      indiceJson = JSON.stringify(indiceArray);
      window.localStorage.setItem("indice", indiceJson);
    }

    return novo;
}

function getIndice(){
  indiceJson = window.localStorage.getItem("indice");
  indiceArray = JSON.parse(indiceJson);
  return indiceArray;
}

/*function listarRegistros(){

  indiceArray = getIndice();

  chave = indiceArray[0];

  if (chave != null){
    userJson = window.localStorage.getItem(chave);
    userArray = JSON.parse(userJson);
    var saida = "UserID: " + userArray.id +"; Title: " + userArray.title; 
  }

  document.getElementById("lbUsers").innerHTML = saida;

}*/

function listarRegistros(){

  indiceArray = getIndice();

  var lista = '<table class="striped">';

  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      contatoJson = window.localStorage.getItem(chave);

      contatoArray = JSON.parse(contatoJson);

      lista = lista + '<tr><td>' + chave + '</td><td>' + contatoArray.FirstName + '</td><td>' + contatoArray.LastName + '</td><td>' + contatoArray.Phone + '</td>';
      lista = lista + "<td><a href='atualizar.html?id=" + chave + "'><img src='img/update.png' /></a></td>";
      lista = lista + "<td><img src='img/delete.png' id='" + chave + "' onclick='apagar(this.id)' /></td></tr>";
    }
  }

  lista = lista + "</table>";

  document.getElementById(lbUsers).innerHTML = lista;
  //lbUsers.innerHTML = lista;

}