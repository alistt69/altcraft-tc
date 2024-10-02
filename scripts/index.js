const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search');


let allData = [];
let originalData = [];
let currentPage = 0;
const pageSize = 40;


async function loadData() {
    const response = await fetch('./db/db.json');
    allData = await response.json();
    originalData = [...allData]
    renderTable();
}


function renderTable() {
    const filteredData = allData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.class}</td>
            <td>${item.survived ? "Yes" : "No"}</td>
            <td>${item.ticket}</td>
            <td>${item.cabin}</td>
            <td>${item['home.dest']}</td>
        `;
        tableBody.appendChild(row);

    });
}


function searchTable() {
    const query = searchInput.value.toLowerCase();

    allData = originalData.filter(item => {
        return Object.values(item).some(value => String(value).toLowerCase().includes(query));
    });

    tableBody.innerHTML = '';
    currentPage = 0;
    renderTable();
}


searchInput.addEventListener('input', searchTable);
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentPage++;
        if (currentPage * pageSize < allData.length) {
            renderTable();
        }
    }

});

loadData().then();