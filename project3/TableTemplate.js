class TableTemplate {
    static fillIn(id, dict, columnName) {
        let table = document.getElementById(id);
        if (!table) return;

        let headers = table.rows[0].cells; // Assuming the first row is header
        let columnIndex = -1; // Initialize columnIndex to -1, indicating not found

        // Replace header templates and find columnIndex if columnName is specified
        for (let i = 0; i < headers.length; i++) {
            let headerContent = headers[i].innerHTML;
            let matchedHeader = headerContent.match(/{{\s*([^}]+)\s*}}/);
            if (matchedHeader) {
                let propertyName = matchedHeader[1];
                headers[i].innerHTML = headerContent.replace(matchedHeader[0], dict[propertyName] || '');
            }
            if (headers[i].textContent === columnName) columnIndex = i;
        }

        // Process either the specified column or the entire table
        for (let i = 1; i < table.rows.length; i++) { // Start from the second row
            let row = table.rows[i];
            for (let j = 0; j < row.cells.length; j++) {
                if (columnName && j !== columnIndex) continue; // If columnName is specified but not matched, skip
                let cellContent = row.cells[j].innerHTML;
                let matched = cellContent.match(/{{\s*([^}]+)\s*}}/g);
                if (matched) {
                    matched.forEach((template) => {
                        let propertyName = template.replace(/{{\s*|\s*}}/g, '');
                        row.cells[j].innerHTML = cellContent.replace(template, dict[propertyName] || '');
                        cellContent = row.cells[j].innerHTML; // Update cellContent after each replacement
                    });
                }
            }
        }

        // Make the table visible if it was hidden
        table.style.visibility = 'visible';
    }
}
