fetch('https://simple-rest-api-production-6482.up.railway.app/class')
.then(function (response) {
    if (response.status === 200) {
        return response.json()
    }
})
.then(data => {
    printBuku(data.data)
})

function printBuku(data) {
    const booksContainer = document.querySelector('.books-cat .books');
    let html = ``;
    data.forEach((element) => {
        html = html + `
        <div class="book">
            <div class="img"><img src="https://wpvip.edutopia.org/wp-content/uploads/2022/10/iStock-996990478.jpg?w=1300&quality=85"></div>
            <div class="author">${element.name}</div>
            <div class="title">${element.level}</div>
            <div class="price">${element.instructor}</div>
            <div class="add-to-cart">
            <button id="checkout">Join</button>
            </div>
        </div>
    `
    });
    booksContainer.innerHTML = html;
}