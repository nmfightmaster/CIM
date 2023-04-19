// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("inventory");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function searchTables() {
    // Get the search input and table elements
    var searchInput = document.getElementById("deviceSearch");
    var tables = document.getElementsByTagName("table");

    // Loop through each table
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var rows = table.getElementsByTagName("tr");

        // Loop through each row in the table
        var visibleRowCount = 0;
        for (var j = 1; j < rows.length; j++) { // Start from index 1 to exclude the header row
            var row = rows[j];
            var cols = row.getElementsByTagName("td");
            var found = false;

            // Loop through each column in the row
            for (var k = 0; k < cols.length; k++) {
                var col = cols[k];
                var text = col.textContent || col.innerText;

                // Check if the column text contains the search input text
                if (text.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1) {
                    found = true;
                    break;
                }
            }

            // Toggle the row visibility based on whether it matched the search input
            if (found) {
                row.style.display = "";
                visibleRowCount++;
            } else {
                row.style.display = "none";
            }
            // Update the row count for the current status
            var status = table.id;
            var rowCountSpan = document.getElementById(status + "-count");
            if (rowCountSpan) {
                rowCountSpan.textContent = visibleRowCount;
            }
        }
    }
}


