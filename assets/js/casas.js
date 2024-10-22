import { auth } from "./configuracion.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Evento para el botón de "Salir"
document.getElementById('logout-button').addEventListener('click', function() {
    // Aquí puedes agregar la funcionalidad que necesites al hacer clic en "Salir"
    alert('Has cerrado sesión');
    // Redireccionar a una página de inicio de sesión, por ejemplo:
    window.location.href = '/index.html';
});

// Controlar el carrusel usando los botones prev y next manualmente
document.getElementById('prevBtn').addEventListener('click', function() {
    $('#houseCarousel').carousel('prev');
});

document.getElementById('nextBtn').addEventListener('click', function() {
    $('#houseCarousel').carousel('next');
});

// Cambiar el color del texto del footer al hacer clic
document.getElementById('footer-p').addEventListener('click', function() {
    this.style.color = this.style.color === 'red' ? 'black' : 'red';
});

// Evento de clic en los botones "Unirme" de cada casa
const botonesUnirme = document.querySelectorAll('.btn-light');
botonesUnirme.forEach((boton, index) => {
    boton.addEventListener('click', function() {
        const casaSeleccionada = document.querySelector(`#carrusel-${String.fromCharCode(97 + index)} .card-header`).innerText;
        alert(`Te has unido a la ${casaSeleccionada}`);
    
    });
});



// onAuthStateChanged
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuario está autenticado:", user);
    } else {
        console.log("Usuario no está autenticado.");
        window.location.href = 'index.html'; // Redirige si no hay usuario
    }
});
