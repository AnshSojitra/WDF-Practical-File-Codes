// Parse JSON
const students = JSON.parse(studentsJSON);
const events = JSON.parse(eventsJSON);

// Pagination
const itemsPerPage = 2;
let currentPage = 1;

function renderStudents(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedStudents = students.slice(start, end);

  const container = document.getElementById("student-list");
  container.innerHTML = paginatedStudents.map(s =>
    `<div><strong>${s.name}</strong> (${s.course}, Age: ${s.age})</div>`
  ).join("");

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderStudents(currentPage);
    };
    pagination.appendChild(btn);
  }
}

// Display Events
function renderEvents() {
  const list = document.getElementById("event-list");
  events.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.title} - ${e.date}`;
    list.appendChild(li);
  });
}

// Country-State Dropdown
function setupLocationDropdowns() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  countrySelect.innerHTML = `<option value="">Select Country</option>` +
    Object.keys(locationData).map(c => `<option value="${c}">${c}</option>`).join("");

  countrySelect.onchange = () => {
    const states = locationData[countrySelect.value] || [];
    stateSelect.innerHTML = `<option value="">Select State</option>` +
      states.map(s => `<option value="${s}">${s}</option>`).join("");
  };
}

// CAPTCHA
let captchaText = "";

function generateCaptcha() {
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  captchaText = Math.random().toString(36).substring(2, 8);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#333";
  ctx.fillText(captchaText, 50, 30);
}

function validateCaptcha() {
  const input = document.getElementById("captchaInput").value;
  if (input === captchaText) {
    alert("CAPTCHA Verified!");
  } else {
    alert("Incorrect CAPTCHA. Try again.");
    generateCaptcha();
  }
}

// Initialize
window.onload = () => {
  renderStudents(currentPage);
  renderEvents();
  setupLocationDropdowns();
  generateCaptcha();
};
