var tombolMenu = document.getElementsByClassName('tombol-menu')[0];
var menu = document.getElementsByClassName('menu')[0];

tombolMenu.onclick = function () {
    menu.classList.toggle('active');
}

menu.onclick = function () {
    menu.classList.toggle('active');
}

let url = 'http://127.0.0.1:8080/class';
let classList = document.getElementById("kursus-list");


let data = {};

function getClasses() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            Classes = data.data;
            updateTable();

        })


}

getClasses();

function updateTable() {
    let data = "";

    if (Classes.length > 0) {
        for (i = 0; i < Classes.length; i++) {

            data += `<a href="#">
                    <div class="kartu-kursus">
                    <div class="class-kursus"><h1>${Classes[i]['name']}</h1></div>
                    <h2>${Classes[i]['name']}</h2>
                    <a href="#"><button>Web Development</button></a>
                    <p class="harga">Rp. 300.000</p>
                    <p class="diskon">Rp. 0</p>
                    <button>join</button>
                    </div>
                    </a>`
        }
        classList.innerHTML = data;
    }

}