const form = document.getElementById('login-form');
const token = window.localStorage.token;

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json());
    if (success = "true") {
        window.localStorage.setItem('token', response.data)
        window.location.href = '../pages/homepage.html';
        // target halaman
    } else {
        alert('Invalid email or password');
    }
});