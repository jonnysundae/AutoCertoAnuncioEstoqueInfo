function selecionarECopiar(){
    const table = document.getElementById('table');
    if (table) {
        const rows = table.querySelectorAll('tr');
        if (rows.length > 0) {
            const allRowData = Array.from(rows).map((row) => {
                const cells = row.querySelectorAll('td');
                const relevantCellIndices = [2, 3, 4, 8]; // Índices das células relevantes (3, 4, 5 e 9)
                const rowData = relevantCellIndices.map((index) => {
                    if (index === 2) {
                        const cellHTML = cells[index].innerHTML;
                        const parser = new DOMParser();
                        const cellDocument = parser.parseFromString(cellHTML, 'text/html');
                        const carName = cellDocument.querySelector('a').textContent.trim().split('-')[0];
                        
                        const placaElement = cellDocument.querySelector('h6');
                        const placaOnly = placaElement ? placaElement.textContent.trim().split(' ')[1].slice(0, -1) : 'N/A';
                        
                        const modeloText = cellDocument.body.textContent.trim();
                        const anoCarro = modeloText.split('-')[1].trim().substring(0, 9);
                        const modeloCarro = modeloText.slice(165, -895);
                        
                        return `${carName.split(' ')[0]}|${carName.split(' ')[1]} ${modeloCarro}|${placaOnly}|${anoCarro}`;
                    } else {
                        const button = cells[index].querySelector('button');
                        const buttonText = button ? button.textContent.replace(/\s/g, "") : 'N/A';
                        return buttonText;
                    }
                });
                
                return rowData.join('|');
            });
            
            var lista = allRowData.join('\n')
            console.log(lista); // Exibe todas as linhas separadas por quebra de linha
            copyToClipboard(lista);
        } else {
            console.log('A tabela não possui nenhuma linha.');
        }
    } else {
        console.log('A tabela com o ID "table" não foi encontrada.');
    }
}

function copyToClipboard(text) {
    var tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    console.log('Texto copiado via botão');
}

controleHTML = document.getElementsByClassName("controls")[0];
novoBotaoHTML = document.createElement('div');
novoBotaoHTML.classList.add("btn-group");
novoBotaoHTML.classList.add("btn-group-solid");
novoBotaoHTML.innerHTML = `
    <button type="button" onclick="selecionarECopiar()" class="btn dark dropdown-toggle" style="margin-bottom: 5px; height: 34px;padding: 4px 14px 7px" data-toggle="dropdown" aria-expanded="false">
        Copiar
    </button>`;
controleHTML.appendChild(novoBotaoHTML);
