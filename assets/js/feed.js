import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { firebaseConfig } from './config.js';

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    } else {
        welcomeMessageElement.innerText = 'Bienvenido, visitante!';
        userAvatarElement.src = 'https://via.placeholder.com/100';
    }
});