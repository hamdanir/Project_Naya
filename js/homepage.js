fetch('http://127.0.0.1:8080/class')
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
            <div class="img"><img src=""></div>
            <div class="author">${element.name}</div>
            <div class="title">${element.level}</div>
            <div class="price">${element.instructor}</div>
            <div class="add-to-cart">
            <button id="checkout">Add To Cart</button>
            </div>
        </div>
    `
    });
    booksContainer.innerHTML = html;
}