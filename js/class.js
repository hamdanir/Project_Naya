
// Konstanta untuk elemen-elemen pada halaman HTML
const btnAdd = document.getElementById('btn-add');
const btnCancel = document.getElementById('btn-cancel');
const btnCancelEdit = document.getElementById('btn-cancel-edit');
const formAdd = document.getElementById('form-add');
const formEdit = document.getElementById('form-edit');
const inputNama = document.getElementById('input-nama');
const inputLevel = document.getElementById('input-level');
const inputinstructor = document.getElementById('input-instructor');
const inputEditId = document.getElementById('input-edit-id');
const inputEditNama = document.getElementById('input-edit-nama');
const inputEditLevel = document.getElementById('input-edit-level');
const inputEditinstructor = document.getElementById('input-edit-instructor');
const tableBody = document.getElementById('table-body');
const popupAdd = document.getElementById('popup-add');
const popupEdit = document.getElementById('popup-edit');

// Fungsi untuk menampilkan data ke dalam tabel
function showData() {
    fetch('http://127.0.0.1:8080/class')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            tableBody.innerHTML = '';
            let number = 1
            data.data.forEach(item => {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td');
                const tdNama = document.createElement('td');
                const tdLevel = document.createElement('td');
                const tdinstructor = document.createElement('td');
                const tdAction = document.createElement('td');
                const btnEdit = document.createElement('button');
                const btnHapus = document.createElement('button');

                tdId.innerText = number++;
                tdNama.innerText = item.name;
                tdLevel.innerText = item.level;
                tdinstructor.innerText = item.instructor;

                btnEdit.innerText = 'Edit';
                btnEdit.addEventListener('click', () => {
                    showPopupEdit(item.id, item.name, item.level, item.instructor);
                });                

                btnHapus.innerText = 'Hapus';
                btnHapus.addEventListener('click', () => {
                    deleteData(item.id);
                });                

                tdAction.appendChild(btnEdit);
                tdAction.appendChild(btnHapus);

                tr.appendChild(tdId);
                tr.appendChild(tdNama);
                tr.appendChild(tdLevel);
                tr.appendChild(tdinstructor);
                tr.appendChild(tdAction);

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error(error));
}

// Fungsi untuk menambah event listener pada tombol edit
function addEventEditButton() {
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const id = button.getAttribute('data-id');
            const nama = button.getAttribute('data-nama');
            const level = button.getAttribute('data-level');
            const instructor = button.getAttribute('data-instructor');
            showPopupEdit(id, name, level, instructor);
        });
    });
}

// Fungsi untuk menambah event listener pada tombol hapus
function addEventDeleteButton() {
    const deleteButtons = document.querySelectorAll('.btn-hapus');
    deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const id = button.getAttribute('data-id');
            deleteData(id);
        });
    });
}

function deleteData(id) {
    fetch(`http://127.0.0.1:8080/class/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.ok) {
          alert('Berhasil menghapus');
          showData();
        } else {
          alert('Gagal menghapus data');
        }
      })
      .catch(error => console.error(error));
  }

// Fungsi untuk mereset form tambah data
function resetFormAdd() {
    inputNama.value = '';
    inputLevel.value = '';
    inputinstructor.value = '';
}

// Fungsi untuk menampilkan popup tambah data
function showPopupAdd() {
    popupAdd.style.display = 'block';
}

// Fungsi untuk menyembunyikan popup tambah data
function hidePopupAdd() {
    popupAdd.style.display = 'none';
    resetFormAdd();
}

// Fungsi untuk menampilkan popup edit data
function showPopupEdit(id, name, level, instructor) {
    popupEdit.style.display = 'block';
    inputEditId.value = id;
    inputEditNama.value = name;
    inputEditLevel.value = level;
    inputEditInstructor.value = instructor;
  }

// Fungsi untuk menyembunyikan popup edit data
function hidePopupEdit() {
    popupEdit.style.display = 'none';
}

// Fungsi untuk menambah data ke dalam API public
function addData() {
    const data = {
        name: inputNama.value,
        level: inputLevel.value,
        instructor: inputInstructor.value
    };
    fetch('http://127.0.0.1:8080/class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                hidePopupAdd();
                showData();
            } else {
                alert('Gagal menambah data');
            }
        })
        .catch(error => console.error(error));
}

// Fungsi untuk mengupdate data di dalam API public
function updateData() {
    const data = {
        nama: inputEditNama.value,
        level: inputEditLevel.value,
        instructor: inputEditinstructor.value
    };
    const id = inputEditId.value;
    fetch('http://127.0.0.1:8080/class/${id}', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                hidePopupEdit();
                showData();
            } else {
                alert('Gagal mengupdate data');
            }
        })
        .catch(error => console.error(error));
}

// Fungsi untuk menghapus data di dalam API public
function deleteData(id) {
    fetch(`http://127.0.0.1:8080/class/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (response.ok) {
                alert('Berhasil menghapus');
                showData(); // Refresh the data after deletion
            } else {
                alert('Gagal menghapus data');
            }
        })
        .catch(error => console.error(error));
}

// Menambahkan event listener pada tombol tambah
btnAdd.addEventListener('click', showPopupAdd);

// Menambahkan event listener pada tombol batal pada popup tambah data
btnCancel.addEventListener('click', hidePopupAdd);

// Menambahkan event listener pada tombol batal pada popup edit data
btnCancelEdit.addEventListener('click', hidePopupEdit);

// Menambahkan event listener pada tombol simpan pada popup tambah data
formAdd.addEventListener('submit', event => {
    event.preventDefault();
    addData();
});

// Menambahkan event listener pada tombol simpan pada popup edit data
formEdit.addEventListener('submit', event => {
    event.preventDefault();
    updateData();
});

// Menampilkan data ke dalam tabel saat halaman dimuat
showData();

