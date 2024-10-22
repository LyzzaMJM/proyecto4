import { registerUser, loginUser, loginWithGoogle } from "./config.js";

<<<<<<< HEAD
// MOVIMIENTO DE LOGIN A REGISTER
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "21264D"; // Asegúrate de que sea un color válido
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "21264D";

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;

    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
});

// Envío formulario de registro
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const user = document.getElementById('registerUser').value;

    if (email && password && user) {
        registerUser(email, password) // Eliminar user de aquí si no es necesario
            .then(() => {
                document.getElementById('registerForm').reset();
=======
// Mostrar formulario de registro al hacer clic
document.getElementById('showRegisterForm').addEventListener('click', () => {
    document.getElementById('loginForm').classList.add('d-none');
    document.getElementById('registerForm').classList.remove('d-none');
});

// Volver al formulario de inicio de sesión
document.getElementById('backToLogin').addEventListener('click', () => {
    document.getElementById('registerForm').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
});

// Manejar el envío del formulario de registro
document.getElementById('register').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (email && password) {
        registerUser(email, password)
            .then(() => {
                document.getElementById('register').reset();
>>>>>>> c4d173336eb33f76a11acff5469a112539507d3b
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

<<<<<<< HEAD
// Envío formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', (event) => {
=======
// Manejar el envío del formulario de inicio de sesión
document.getElementById('login').addEventListener('submit', (event) => {
>>>>>>> c4d173336eb33f76a11acff5469a112539507d3b
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        loginUser(email, password)
            .then(() => {
<<<<<<< HEAD
                document.getElementById('loginForm').reset();
=======
                document.getElementById('login').reset();
>>>>>>> c4d173336eb33f76a11acff5469a112539507d3b
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
<<<<<<< HEAD
    loginWithGoogle(); 
});

=======
    loginWithGoogle();
});
>>>>>>> c4d173336eb33f76a11acff5469a112539507d3b
