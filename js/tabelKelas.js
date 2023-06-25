// Mengambil data dari API menggunakan fetch()
fetch("http://127.0.0.1:8080/class")
    .then((response) => response.json())
    .then((data) => {
        console.log(data.data);
        // Menambahkan data ke dalam tabel HTML
        let nomer = 1;
        let table = document.querySelector("#myTable tbody");
        data.data.forEach((item) => {
            let row = table.insertRow();
            row.insertCell().textContent = nomer++;
            row.insertCell().textContent = item.name;
            row.insertCell().textContent = item.level;
            row.insertCell().textContent = item.instructor;
        });
    })
    .catch((error) => console.error(error));