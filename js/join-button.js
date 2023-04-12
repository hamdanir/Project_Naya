const checkoutBtn = document.getElementById('checkout')
const token = localStorage.getItem('token');
checkoutBtn.addEventListener('click', function() {
    fetch('https://simple-rest-api-production-6482.up.railway.app/enroll/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if (response.status === 200) {
            alert('Berhasil')
        } else {
            alert('Gagal')
        }
    })
})

const loginBtnContainer = document.querySelector('.loginBtnContainer')
if (token) {
    loginBtnContainer.innerHTML = '<button id="logout">Logout</button>'

    document.getElementById("logout").addEventListener('click',
    function() {
        localStorage.removeItem('token')
        window.location.href = '../pages/login.html'
    })
}