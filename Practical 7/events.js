let events = [];
let currentPage = 1;
const itemsPerPage = 2;

fetch("events.json")
  .then(res => res.json())
  .then(data => {
    events = data;
    renderEvents();
  });

function renderEvents() {
  const search = document.getElementById("search").value.toLowerCase();
  const sortBy = document.getElementById("sort").value;

  let filtered = events.filter(e => e.title.toLowerCase().includes(search));
  filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const container = document.getElementById("event-container");
  container.innerHTML = paginated.map(e =>
    `<div><strong>${e.title}</strong> - ${e.date}</div>`
  ).join("");

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const container = document.getElementById("event-container");
  container.innerHTML += "<div>";

  for (let i = 1; i <= totalPages; i++) {
    container.innerHTML += `<button onclick="goToPage(${i})">${i}</button>`;
  }

  container.innerHTML += "</div>";
}

function goToPage(page) {
  currentPage = page;
  renderEvents();
}

document.getElementById("search").oninput = renderEvents;
document.getElementById("sort").onchange = renderEvents;
