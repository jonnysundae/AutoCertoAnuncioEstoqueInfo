window.onload = function () {

    setTimeout(function() {
        const table = document.getElementById('table');
        const rows = table.querySelectorAll('tr');
        let listagemCarros = [];

    var controleHTML = document.getElementsByClassName("opcoesHeaderV2")[0];
    var novoBotaoHTML = document.createElement('li');
    novoBotaoHTML.classList.add("dropdown");
    novoBotaoHTML.innerHTML = `<a href="" role="button" data-toggle="modal" class="btn btn-sm blue melhoriasSistema" data-id="1" style="margin-top: 15px;color: #FFF;padding: 4px 10px;margin-right: 10px;background-color: #28aef6;text-transform: none;">Copiar</a>`;
    controleHTML.appendChild(novoBotaoHTML);
    novoBotaoHTML.onclick = function () {
    console.log(listagemCarros.join('\n'));

        for (let posicao = 0; posicao < rows.length; posicao++) {
            const carro = new Object();
            carro.marca = limparTexto(rows[posicao].children[2].children[0]).split('-')[0].slice(0, -1).split(" ")[0];
            marcaLengthNome = limparTexto(rows[posicao].children[2].children[0]).split('-')[0].slice(0, -1).split(" ")[0].length;
            carro.nome = limparTexto(rows[posicao].children[2].children[0]).split('-')[0].slice(marcaLengthNome);
            carro.ano = limparTexto(rows[posicao].children[2].children[0]).split("-")[1].slice(1,10);
            carro.modelo = limparTexto(rows[posicao].children[2]).split(carro.ano)[1].split('Placa')[0];
            carro.placa = rows[posicao].children[2].children[3].textContent.replace(/[ ]/g, '').replace(/\n/g, '').slice(6,14);
            // INFO WEBMOTORS
            carro.webMotors = limparTexto(rows[posicao].children[3],'classificado');
            // INFO ICARROS
            carro.iCarros = limparTexto(rows[posicao].children[4],'classificado');
            // INFO MOBIAUTO
            carro.mobiauto = limparTexto(rows[posicao].children[7],'classificado');
        
            listagemCarros.push(`${carro.marca}\t${carro.nome}${carro.modelo}\t${carro.placa}\t${carro.ano}\t${carro.webMotors}\t${carro.iCarros}\t${carro.mobiauto}`);
        }

        copyToClipboard(listagemCarros.join('\n'));
    };
}, 2000);
}

function limparTexto(texto, tipo){
    if (tipo == 'classificado'){
        return texto.textContent.replace(/ /g, '').replace(/\n/g, '').replace("Cliqueparaveroanúncio", '');
    }else{
        return texto.textContent.replace(/  /g, '').replace(/\n/g, '');
    }
}

// CopyToClipboard retirado do StackOverFlow: refazer esse código por conta propria!
function copyToClipboard(text) {
    var tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    console.log('Texto copiado via botão');
}
