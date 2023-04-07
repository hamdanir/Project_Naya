const form = document.getElementById('register-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://simple-rest-api-production-6482.up.railway.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, email, password })
    });

    if (response.ok) {
        alert('Register Success, Lets Log in again..');
        window.location.href = '../pages/login.html';
    } else {
        alert('Failed to register');
    }
});