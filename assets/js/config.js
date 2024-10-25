import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjB7gwIhRn43H0_LFpJXk2HtXfheuD1Ak",
    authDomain: "academy-a2996.firebaseapp.com",
    projectId: "academy-a2996",
    storageBucket: "academy-a2996.appspot.com",
    messagingSenderId: "249035506580",
    appId: "1:249035506580:web:e43fa82c55fa9622940581",
    measurementId: "G-QTXSZZEDH5"
    apiKey: "AIzaSyAjB7gwIhRn43H0_LFpJXk2HtXfheuD1Ak",
    authDomain: "academy-a2996.firebaseapp.com",
    projectId: "academy-a2996",
    storageBucket: "academy-a2996.appspot.com",
    messagingSenderId: "249035506580",
    appId: "1:249035506580:web:e43fa82c55fa9622940581",
    measurementId: "G-QTXSZZEDH5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(); // Proveedor de Google

// Función para registrar un nuevo usuario
export function registerUser(email, password, fullName) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Registro exitoso. ¡Bienvenido!");
            addFullName(fullName);
        })
        .catch((error) => {
            console.error("Error al registrar:", error.code, error.message);
            alert("Error al registrar: " + error.message);
        });
}

function addFullName(fullName) {
    updateProfile(auth.currentUser, {
        displayName: fullName,
    }).then(() => {
        // Considera si realmente necesitas recargar la página
        console.log("Nombre actualizado exitosamente");
    }).catch((error) => {
        console.error("Error al actualizar el nombre:", error.message);
    });
}

// Función para iniciar sesión
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Inicio de sesión exitoso. ¡Bienvenido!");
            window.location.href = 'assets/html/casas.html';
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.code, error.message);
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Función para iniciar sesión con Google
export function loginWithGoogle() {
    return signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Inicio de sesión con Google exitoso. ¡Bienvenido!", result.user);
            window.location.href = 'assets/html/principal.html';//Cmbiar segun nombre de la carpeta del feed
            return result; // Retorna el resultado para que se maneje en script.js
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Google:", error.code, error.message);
            alert("Error al iniciar sesión con Google: " + error.message);
        });
}

// Función de prueba para leer datos de Firestore
const testFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    } catch (error) {
        console.error("Error al acceder a Firestore:", error);
    }
};

// Llama a la función de prueba (puedes descomentarla si deseas ejecutar la prueba)
testFirestore();