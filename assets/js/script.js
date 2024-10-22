import { registerUser, loginUser, loginWithGoogle } from "./config.js";

// MOVIMIENTO DE LOGIN A REGISTER
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(33, 38, 77, 1)"; // Corregido
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "rgba(33, 38, 77, 1)"; // Corregido

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;

    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
});

// Envío formulario de registro
document.querySelector('.register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const user = document.getElementById('registerUser').value; // Añadido

    if (email && password && user) {
        registerUser(email, password, user)
            .then(() => {
                document.querySelector('.register-form').reset();
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Envío formulario de inicio de sesión
document.querySelector('.login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        loginUser(email, password)
            .then(() => {
                document.querySelector('.login-form').reset();
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