import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { firebaseConfig } from './config.js';

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const avatarInput = document.getElementById('avatarInput');

// Manejo del estado de autenticación
onAuthStateChanged(auth, (user) => {
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    const userAvatarElement = document.getElementById('userAvatar');

    // Si el usuario está autenticado
    if (user) {
        console.log(user);
        const displayName = user.displayName || user.email.split('@')[0];
        const photoURL = user.photoURL || 'https://via.placeholder.com/100';

        welcomeMessageElement.innerText = `${displayName}`;
        userAvatarElement.src = photoURL;

        // Manejar el cambio de la imagen de perfil
        avatarInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    userAvatarElement.src = reader.result; // Muestra la imagen seleccionada
                    updateProfile(user, {
                        photoURL: reader.result // Actualiza la foto de perfil en Firebase
                    }).then(() => {
                        console.log("Foto de perfil actualizada exitosamente");
                    }).catch((error) => {
                        console.error("Error al actualizar la foto de perfil:", error);
                    });
                };
                reader.readAsDataURL(file); // Lee la imagen como una URL de datos
            }
        });
    } else {
        welcomeMessageElement.innerText = 'Bienvenido, visitante!';
        userAvatarElement.src = 'https://via.placeholder.com/100';
    }
});