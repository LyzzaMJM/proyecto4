import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { updateHouseSelection } from "./casas-config.js"; // Asegúrate de que la ruta es correcta

const auth = getAuth();

// Manejo del botón de Logout
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Redirigir al login después de cerrar sesión
            window.location.href = '/index.html';
        }).catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
    });
}

// Asegurarse de que el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está autenticado, manejamos la selección de la casa
        document.querySelectorAll('.btn').forEach((button) => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();  // Evitar que se recargue la página

                // Obtener la tarjeta y el nombre de la casa seleccionada
                const houseElement = event.target.closest('.card');
                const houseName = houseElement.querySelector('.card-header').innerText.trim();

                // Actualizar la selección de la casa en Firestore
                try {
                    await updateHouseSelection(houseName);
                    // Redirigir a la página de feed con la casa seleccionada en la URL
                    window.location.href = `/assets/html/inicio.html?house=${houseName.toLowerCase()}`;
                } catch (error) {
                    console.error("Error al actualizar la casa:", error);
                }
            });
        });

    } else {
        // Si no está autenticado, redirigir al login
        window.location.href = "/index.html";
    }
});
