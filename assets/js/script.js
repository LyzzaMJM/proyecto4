import { registerUser, loginUser, loginWithGoogle } from "./config.js";

// MOVIMIENTO DE LOGIN A REGISTER
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgraundColor = "21264D";
    registerBtn.style.backgraundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%"

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgraundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgraundColor = "21264D";

    loginForm.style.left = "150%";
    registerForm.style.left = "50%"

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;

    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
});


// Envio formulario de registro
document.getElementById('register').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    // const user = document.getElementById('registerUser').value;

    if (email && password && user) {
        registerUser(email, password, user)
            .then(() => {
                document.getElementById('register').reset();
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Envio formulario de inicio de sesion
document.getElementById('login').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        loginUser(email, password)
            .then(() => {
                document.getElementById('login').reset();
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Iniciar sesión con Google
document.getElementById('loginGoogleBtn').addEventListener('click', (event) => {
    event.preventDefault();
    loginWithGoogle(); 
});