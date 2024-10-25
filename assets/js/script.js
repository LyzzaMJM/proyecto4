import { registerUser, loginUser, loginWithGoogle } from "./config.js";

// MOVIMIENTO DE LOGIN A REGISTER
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const postRegisterSection = document.getElementById('postRegisterSection');
// Selecciona los botones de Trivia y Casas
const triviaBtn = document.getElementById('triviaBtn');
const housesBtn = document.getElementById('housesBtn');

// Cambiar entre formularios
loginBtn.addEventListener('click', () => {
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
});

registerBtn.addEventListener('click', () => {
    loginForm.style.left = "150%";
    registerForm.style.left = "50%";
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

    console.log(email, password, fullName); 

    if (email && password && fullName) {
        registerUser(email, password, fullName)
            .then(() => {
                document.querySelector('.register-form').reset();
                // Oculta el formulario de registro
                registerForm.style.display = 'none';
                // Muestra la nueva sección
                postRegisterSection.style.display = 'block';
                // Oculta los botones de iniciar sesión y registro
                document.querySelector('.btn-box').style.display = 'none'; // Asegúrate de que esta clase esté correcta
            })
            .catch((error) => {
                console.error(error); // Ver errores en la consola
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
                // Aquí podrías llamar a una función para registrar el usuario en Firestore, por ejemplo
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

// Evento para el botón de Trivia
triviaBtn.addEventListener('click', () => {
    window.location.href = 'assets/html/trivia.html'; // Cambia esta ruta a la ubicación de tu página de trivia
});

// Evento para el botón de Casas
housesBtn.addEventListener('click', () => {
    window.location.href = 'assets/html/casas.html'; // Cambia esta ruta a la ubicación de tu página de casas
});

//OJITO

const passwordField = document.getElementById('loginPassword');
const eyeIcon = document.getElementById('eye-icon');
const eyeSlashIcon = document.getElementById('eye-slash-icon');

eyeIcon.addEventListener('click', function() {
    passwordField.type = 'text'; // Cambiar a texto para mostrar la contraseña
    eyeIcon.style.display = 'none'; // Ocultar el ícono de ojo
    eyeSlashIcon.style.display = 'inline'; // Mostrar el ícono de ojo tachado
});

eyeSlashIcon.addEventListener('click', function() {
    passwordField.type = 'password'; // Cambiar a contraseña para ocultarla
    eyeSlashIcon.style.display = 'none'; // Ocultar el ícono de ojo tachado
    eyeIcon.style.display = 'inline'; // Mostrar el ícono de ojo
});
