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
        
        console.log(allRowData.join('\n')); // Exibe todas as linhas separadas por quebra de linha
    } else {
        console.log('A tabela não possui nenhuma linha.');
    }
} else {
    console.log('A tabela com o ID "table" não foi encontrada.');
}
