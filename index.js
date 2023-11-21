function CalminDate() {
    const today = new Date();
    return new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0];
}

function CalmaxDate() {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
}

const dobInput = document.getEleById('dob');
dobInput.setAttribute('min', CalminDate());
dobInput.setAttribute('max', CalmaxDate());

let userForm = document.getEleById("userForm");

const getEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = getEntries();

const dispEntries = () => {
    const entries = getEntries();
    const tableEntries = entries.map((entry) => {
        const name = `<td class="bor">${entry.name}</td>`;
        const email = `<td class="bor">${entry.email}</td>`;
        const password = `<td class="bor">${entry.password}</td>`;
        const dateOfBirth = `<td class="bor">${entry.dob}</td>`; 
        const atnc = `<td class="bor">${entry.atnc}</td>`;

        const row = `<tr>${name} ${email} ${password} ${dateOfBirth} ${atnc}</tr>`;
        return row;
    }).join("\n");

    const table = `<h1>Entries</h1><table class="table"><tr class="bor"><th class="bor">Name</th><th class="bor">Email</th><th class="bor">Password</th><th class="bor">Dob</th><th class="bor">Accepted terms?</th></tr>${tableEntries}</table>`;

    let details = document.getEleById("tableView");
    details.innerHTML = table;
}

dispEntries();

const formSubmit = (event) => {
    event.preventDefault();
    const name = document.getEleById("name").value;
    const email = document.getEleById("email").value;
    const password = document.getEleById("password").value;
    const dateOfBirth = document.getEleById("dob").value; 
    const atnc = document.getEleById("atnc").checked;

    const entry = {
        name, email, password, dob: dateOfBirth, atnc 
    }

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries)); 
    dispEntries();
}

userForm.addEventListener("submit", formSubmit);
