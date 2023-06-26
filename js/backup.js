console.log("aaaaaaaaaa");
const table = document.createElement('table');
const tableHeader = document.createElement('thead');
const tableHeaderRow = document.createElement('tr');
const tableBody = document.createElement('tbody');
// const tableFooter = document.createElement('tfoot');
// const tableFooterRow = document.createElement('tr');

tableHeaderRow.innerHTML = `
  <th>Nama Kelas</th>
  <th>Level</th>
  <th>Nama Instruktur</th>
  <th>Action</th>
`;

tableHeader.appendChild(tableHeaderRow);
table.appendChild(tableHeader);
table.appendChild(tableBody);

// ambil data dari API publik
function getData() {
    fetch("http://127.0.0.1:8080/class")
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error(error));
}

// tampilkan data di tabel HTML
function displayData(data) {
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.level}</td>
      <td>${item.instructur}</td>
      <td>
        <button class="edit-button" data-id="${item.id}">Edit</button>
        <button class="save-button hidden" data-id="${item.id}">Simpan</button>
        <button class="delete-button" data-id="${item.id}">Hapus</button>
      </td>
    `;
        tableBody.appendChild(row);
    });

    // tambahkan event listener untuk tombol edit, simpan, dan hapus
    const editButtons = document.querySelectorAll('.edit-button');
    const saveButtons = document.querySelectorAll('.save-button');
    const deleteButtons = document.querySelectorAll('.delete-button');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const id = row.querySelector('td:nth-child(1)').textContent;
            const nama = row.querySelector('td:nth-child(2)').textContent;
            const alamat = row.querySelector('td:nth-child(3)').textContent;
            const email = row.querySelector('td:nth-child(4)').textContent;
            showPopup(id, nama, alamat, email);
        });
    });

    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const id = row.querySelector('td:nth-child(1)').textContent;
            const nama = row.querySelector('td:nth-child(2) input').value;
            const alamat = row.querySelector('td:nth-child(3) input').value;
            const email = row.querySelector('td:nth-child(4) input').value;
            saveData(id, nama, alamat, email);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const id = row.querySelector('td:nth-child(1)').textContent;
            deleteData(id);
        });
    });
}

// tampilkan popup dengan data yang dipilih
function showPopup(id, nama, alamat, email) {
    const popup = document.createElement('div');
    popup.innerHTML = `
    <form>
    <input type="text" name="nama" value="${nama}">
    <label for="alamat">Alamat:</label>
    <input type="text" name="alamat" value="${alamat}">
    <label for="email">Email:</label>
    <input type="email" name="email" value="${email}">
    <button type="submit" data-id="${id}">Simpan</button>
  </form>
  <button class="close-button">Tutup</button>`;

    popup.classList.add('popup');
    document.body.appendChild(popup);

    const closeButton = popup.querySelector('.close-button');
    const form = popup.querySelector('form');

    closeButton.addEventListener('click', () => {
        popup.remove();
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const id = event.target.querySelector('button').getAttribute('data-id');
        const nama = event.target.querySelector('input[name="nama"]').value;
        const alamat = event.target.querySelector('input[name="alamat"]').value;
        const email = event.target.querySelector('input[name="email"]').value;
        saveData(id, nama, alamat, email);
        popup.remove();
    });
}

// simpan data ke API publik
function saveData(id, nama, alamat, email) {
    const data = {
        id: id,
        nama: nama,
        alamat: alamat,
        email: email
    };

    fetch("http://127.0.0.1:8080/class/${id}", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            getData();
        })
        .catch(error => console.error(error));
}

// hapus data dari API publik
function deleteData(id) {
    fetch("http://127.0.0.1:8080/class/${id}", {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            getData();
        })
        .catch(error => console.error(error));
}
