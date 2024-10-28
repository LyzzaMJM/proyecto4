import { registerUser, loginUser, loginWithGoogle } from "./config.js";

// MOVIMIENTO DE LOGIN A REGISTER
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

// Cuervo volador
const crowContainer = document.getElementById('crow-container');

// Cambiar entre formularios
loginBtn.addEventListener('click', () => {
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
});

registerBtn.addEventListener('click', () => {
    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
});

// Envío formulario de registro
document.querySelector('.register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const fullName = document.getElementById('registerUser').value;

    if (email && password && fullName) {
        registerUser(email, password, fullName)
            .then(() => {
                crowContainer.style.display = 'none'; // Ocultar el cuervo al registrarse
                document.querySelector('.register-form').reset();
                console.log("Registro exitoso. ¡Bienvenido!");
                window.location.href = '/assets/html/feed.html'; // Cambiar según nombre de la carpeta del feed
            })
            .catch((error) => {
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
    loginWithGoogle()
        .then((result) => {
            const user = result.user; // Obtén el usuario
            const email = user.email;

            // Lógica para registrar el usuario con nombre de usuario y correo
            if (email) {
                registerUser(email, "someDefaultPassword", user.displayName) // Asegúrate de manejar la contraseña
                    .then(() => {
                        alert("Registro exitoso!");
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(`Error al registrar: ${error.message}`);
                    });
            } 
        })
        .catch((error) => {
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

// Cambiar color de botones
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    loginBtn.addEventListener('click', function() {
        this.classList.add('btn-inactive'); // Añadir clase al botón de Iniciar sesión
        registerBtn.classList.remove('btn-inactive'); // Quitar clase al botón de Regístrate
    });

    registerBtn.addEventListener('click', function() {
        this.classList.add('btn-inactive'); // Añadir clase al botón de Regístrate
        loginBtn.classList.remove('btn-inactive'); // Quitar clase al botón de Iniciar sesión
    });
});

// Animación de letras
const letters = document.querySelectorAll('.form-title span');
letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`; // Retraso de 0.1s entre letras
});


document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    
    // Espera a que el DOM esté completamente cargado y luego activa la animación
    body.classList.add('fade-in-active');
});

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "¡No te vayas!";
    
    // Algunos navegadores necesitan esta línea para mostrar el mensaje
    e.returnValue = confirmationMessage; 

    // Otros navegadores usan esta línea
    return confirmationMessage;
});
