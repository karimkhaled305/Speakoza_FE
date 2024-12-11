
document.getElementById('signUpForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Sign-up successful! Please check your email to verify your account.');
        window.location.href = '../project/signin.html';
    } else {
        alert(data.message);
    }
});

document.getElementById('signInForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '../project/library.html';
    } else {
        alert(data.message);
    }
});
