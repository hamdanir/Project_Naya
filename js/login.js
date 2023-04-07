const form = document.getElementById('login-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://simple-rest-api-production-6482.up.railway.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (success = "true") {
        window.location.href = '../pages/succes.html';
        // target halaman
    } else {
        alert('Invalid email or password');
    }
});