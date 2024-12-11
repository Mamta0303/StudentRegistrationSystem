// References to form and table
const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');

// Add student
document.getElementById('add-button').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (!name || !studentId || !email || !contact) {
        alert('All fields are required!');
        return;
    }

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${studentId}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
    form.reset();
});

// Edit and Delete functionality
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
    } else if (e.target.classList.contains('edit')) {
        const row = e.target.parentElement.parentElement;
        document.getElementById('name').value = row.cells[0].textContent;
        document.getElementById('studentId').value = row.cells[1].textContent;
        document.getElementById('email').value = row.cells[2].textContent;
        document.getElementById('contact').value = row.cells[3].textContent;
        row.remove();
    }
});

// Save to local storage
function saveData() {
    const rows = Array.from(tableBody.children).map(row => ({
        name: row.cells[0].textContent,
        studentId: row.cells[1].textContent,
        email: row.cells[2].textContent,
        contact: row.cells[3].textContent,
    }));
    localStorage.setItem('students', JSON.stringify(rows));
}

// Load from local storage
function loadData() {
    const rows = JSON.parse(localStorage.getItem('students') || '[]');
    rows.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.studentId}</td>
            <td>${data.email}</td>
            <td>${data.contact}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Listen for changes and save
tableBody.addEventListener('DOMSubtreeModified', saveData);
document.addEventListener('DOMContentLoaded', loadData);
