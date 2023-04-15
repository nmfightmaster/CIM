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
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("deviceSearch");
    filter = input.value.toUpperCase();
    var visibleRowCount = 0; // initialize visible row count to zero
    var tables = document.getElementsByTagName("table");
    for (var k = 0; k < tables.length; k++) {
        table = tables[k];
        tr = table.getElementsByTagName("tr");
        var tableHasMatch = false; // initialize table match flag to false
        for (i = 0; i < tr.length; i++) {
            if (i === 0) { // header row
                continue;
            }
            var display = false; // set display flag for each row
            for (j = 0; j < 3; j++) { // search first three columns
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        display = true; // if match found in any of the three columns, set display flag to true
                        tableHasMatch = true; // set table match flag to true
                    }
                }
            }
            if (display) {
                tr[i].style.display = ""; // show row if display flag is true
                visibleRowCount++; // increment visible row count
            } else {
                tr[i].style.display = "none"; // hide row if display flag is false
                tr[i].style.backgroundColor = ""; // reset row color for hidden rows
            }
        }
        // Show or hide header based on tableHasMatch flag
        var headerRow = tr[0];
        var tableTitle = table.previousElementSibling; // get previous sibling element of table
        var hr = table.nextElementSibling; // get next sibling element of tableTitle (assuming it's the <hr>)
        if (tableHasMatch) {
            headerRow.style.display = "";
            if (tableTitle.tagName == "H5") { // hide title if it exists and no rows are displayed in table
                tableTitle.style.display = "";
                hr.style.display = "";
            }
        } else {
            headerRow.style.display = "none";
            if (tableTitle.tagName == "H5") { // hide title if it exists and no rows are displayed in table
                tableTitle.style.display = "none";
                hr.style.display = "none";
            }
        }
    }
    var noResults = document.getElementById("noResults");
    if (visibleRowCount === 0) {
        noResults.style.display = "";
    } else {
        noResults.style.display = "none";
    }

}


