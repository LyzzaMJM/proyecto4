import { registerUser, loginUser, loginWithGoogle } from "./config.js";

// Elementos del DOM
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

// Cambiar entre formularios
const toggleForms = (showLogin) => {
    if (showLogin) {
        loginForm.style.left = "50%";
        registerForm.style.left = "-50%";
        loginForm.style.opacity = 1;
        registerForm.style.opacity = 0;
    } else {
        loginForm.style.left = "150%";
        registerForm.style.left = "50%";
        loginForm.style.opacity = 0;
        registerForm.style.opacity = 1;
    }
};

loginBtn.addEventListener('click', () => toggleForms(true));
registerBtn.addEventListener('click', () => toggleForms(false));

// Envío formulario de registro
document.querySelector('.register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const fullName = document.getElementById('registerUser').value;

    if (email && password && fullName) {
        registerUser(email, password, fullName)
            .then(() => {
                document.querySelector('.register-form').reset();
            })
            .catch(error => {
                console.error(error);
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
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Iniciar sesión con Google
document.getElementById('loginGoogleBtn').addEventListener('click', (event) => {
    event.preventDefault();
    loginWithGoogle()
        .catch(error => {
            console.error(error);
            alert(`Error al iniciar sesión con Google: ${error.message}`);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const passwordField = document.getElementById('loginPassword');
    const registerPasswordField = document.getElementById('registerPassword');

    const eyeIcon = document.getElementById('eye-icon');
    const eyeSlashIcon = document.getElementById('eye-slash-icon');

    const eyeIcon2 = document.getElementById('eye-icon-2');
    const eyeSlashIcon2 = document.getElementById('eye-slash-icon-2');

    // Mostrar contraseña para el campo de inicio de sesión
    eyeIcon.addEventListener('click', function() {
        passwordField.type = 'text'; // Cambiar a texto para mostrar la contraseña
        eyeIcon.style.display = 'none'; // Ocultar el ícono de ojo
        eyeSlashIcon.style.display = 'inline'; // Mostrar el ícono de ojo tachado
    });

    // Ocultar contraseña para el campo de inicio de sesión
    eyeSlashIcon.addEventListener('click', function() {
        passwordField.type = 'password'; // Cambiar a contraseña para ocultarla
        eyeSlashIcon.style.display = 'none'; // Ocultar el ícono de ojo tachado
        eyeIcon.style.display = 'inline'; // Mostrar el ícono de ojo
    });

    // Mostrar contraseña para el campo de registro
    eyeIcon2.addEventListener('click', function() {
        registerPasswordField.type = 'text'; // Cambiar a texto para mostrar la contraseña
        eyeIcon2.style.display = 'none'; // Ocultar el ícono de ojo
        eyeSlashIcon2.style.display = 'inline'; // Mostrar el ícono de ojo tachado
    });

    // Ocultar contraseña para el campo de registro
    eyeSlashIcon2.addEventListener('click', function() {
        registerPasswordField.type = 'password'; // Cambiar a contraseña para ocultarla
        eyeSlashIcon2.style.display = 'none'; // Ocultar el ícono de ojo tachado
        eyeIcon2.style.display = 'inline'; // Mostrar el ícono de ojo
    });
});