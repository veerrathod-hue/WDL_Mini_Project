// dashboard.js

const rows = REGIONS.map(function(region) {
    return {
        id: region.id,
        name: region.name,
        t: region.t
    };
});

let sortKey = "t";
let asc = false;

function drawTable() {
    rows.sort(function(a, b) {
        if (a[sortKey] > b[sortKey]) {
            return asc ? 1 : -1;
        }
        if (a[sortKey] < b[sortKey]) {
            return asc ? -1 : 1;
        }
        return 0;
    });

    document.querySelector("#tbl tbody").innerHTML = rows.map(function(region) {
        // Place backtick directly after return (no newline in between)
        return `
            <tr>
                <td>${region.name}</td>
                <td>${region.t}°C</td>
                <td>${badge(sev(region.t))}</td>
            </tr>
        `;
    }).join("");
}

// Ensure DOM and global variables are available before running DOM manipulation
document.addEventListener("DOMContentLoaded", function() {
    const legendEl = document.getElementById("legend");
    if (legendEl && typeof legendHTML === "function") {
        legendEl.innerHTML = legendHTML();
    }

    document.querySelectorAll("th.sort").forEach(function(th) {
        th.addEventListener("click", function() {
            const key = th.dataset.k;

            if (key === sortKey) {
                asc = !asc;
            } else {
                sortKey = key;
                asc = true;
            }

            drawTable();
        });
    });

    drawTable();
});