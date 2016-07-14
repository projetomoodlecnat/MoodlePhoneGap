
function importar() {
    var p = document.getElementById("importar");
    p.style.display = 'block';
    time = setTimeout(fechar, 2000);
}

function exportar() {
    var p = document.getElementById("exportar");
    p.style.display = 'block';
    time = setTimeout(fechar, 2000);
}

function fechar() {
    var p = document.getElementsByTagName("P");
    for (i = 0; i < p.length; i++) {
        p[i].style.display = "none";
    }
}

function conexao() {
    var p = document.getElementById("banco");
    p.style.display = 'block';
}

$('.enviar').on('click', function() {
    var root = 'http://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/posts',
        method: 'GET'
    }).then(function(data) {
        
        //window.localStorage.clear();
        var lista = '<table class="striped centered" id="myTable">';
        lista = lista + '<thead> <tr> <th>ID</th> <th>User ID</th> <th>Title</th> <th>Body</th> <th></th> <th></th> </tr> </thead> <tbody>';

        data.forEach(function(item, index){
            lista = lista + '<tr><td>' + item.id + '</td><td>' + item.userId + '</td><td>' + item.title + '</td><td>' + item.body + '</td>';
            lista = lista + "<td><a href='atualizar.html?id=" + item.id + "'><img src='img/update.png' /></a></td>";
            lista = lista + "<td><img src='img/delete.png' id='" + item.id + "' onclick='apagar(this.id)' /></td></tr>";
            
            // var dados = JSON.stringify(item);
            // var chave = GerarChave();
            // window.localStorage.setItem(chave, dados);   
        });
        
        lista = lista + "</tbody></table>";

        document.getElementById("lbUsers").innerHTML = lista;
    });
});

$('.import').on('click', function() {
    var oTable = document.getElementById("myTable");

    //pegando as linhas
    var rowLength = oTable.rows.length;

    //loop linhas   
    for (i = 1; i < rowLength; i++){

        //pega celulas da linha atual
        var oCells = oTable.rows.item(i).cells;

        //qtd colunas 
        var cellLength = oCells.length;

        var id = oCells.item(0).innerHTML;
        var userId = oCells.item(1).innerHTML;
        var title = oCells.item(2).innerHTML;
        var body = oCells.item(3).innerHTML;
        //loops colunas
        // for(var j = 0; j < cellLength; j++){ 
        //     alert(oCells.item(j).innerHTML);
        //     conteudo[j] = oCells.item(j).innerHTML;
        // }

        var dado = JSON.stringify({
            id : id,
            userId : userId,
            title : title,
            body : body
        });

        var chave = GerarChave();
        window.localStorage.setItem(chave, dado);
    }

});

$('.export').on('click', function() {
    var root = 'http://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/posts',
        method: 'GET'
    }).then(function(data) {
        indiceArray = getIndice();

        var lista = '<table class="striped centered" id="myTable">';
        lista = lista + '<thead> <tr> <th>ID</th> <th>User ID</th> <th>Title</th> <th>Body</th> <th></th> <th></th> </tr> </thead> <tbody>';


        for(var i=0; i < indiceArray.length; i++){
            chave = indiceArray[i];

            if (chave != null) {
                dados = window.localStorage.getItem(chave);
                data = JSON.parse(dados);

                lista = lista + '<tr><td>' + data.id + '</td><td>' + data.userId + '</td><td>' + data.title + '</td><td>' + data.body + '</td>';
                lista = lista + "<td><a href='atualizar.html?id=" + data.id + "'><img src='img/update.png' /></a></td>";
                lista = lista + "<td><img src='img/delete.png' id='" + data.id + "' onclick='apagar(this.id)' /></td></tr>";
            }
        }

        lista = lista + "</tbody></table>";

        document.getElementById("lbUsers").innerHTML = lista;
    });
});

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
    indice = window.localStorage.getItem("indice");
    indiceArray = JSON.parse(indice);
    return indiceArray;
}

function MontarJson(){
    var nome = document.getElementById('txFirstName').value;
    var sobrenome = document.getElementById('txLastName').value;
    var telefone = document.getElementById('txPhone').value;
    var contatoJson = JSON.stringify({
        FirstName : nome,
        LastName : sobrenome,
        Phone : telefone
    });

    return contatoJson;
}