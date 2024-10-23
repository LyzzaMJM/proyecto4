import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
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
export function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
    
        .then((userCredential) => {
            console.log("Registro exitoso. ¡Bienvenido!");
            // Redirigir solo si se ha creado el usuario exitosamente
            alert("Usuario registrado exitosamente");

        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use')
                alert("El correo ya esta en uso")
            else if(errorCode == 'auth/invalid-email')
                alert("El correo no es valido")
            else if(errorCode == 'auth/week-password')
                alert("La contraseña debe tener al menos 6 caracteres")
            console.error("Error al registrar:", error.code, error.message);
            alert("Error al registrar: " + error.message);
        });
}

// Función para iniciar sesión
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Inicio de sesión exitoso. ¡Bienvenido!");
            window.location.href = 'assets/html/principal.html';
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.code, error.message);
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Función para iniciar sesión con Google
// Función para iniciar sesión con Google
export function loginWithGoogle() {
    return signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Inicio de sesión con Google exitoso. ¡Bienvenido!", result.user);
            // Aquí no rediriges aún, ya que el registro se maneja en script.js
            return result; // Retorna el resultado para que se maneje en script.js
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Google:", error.code, error.message);
            alert("Error al iniciar sesión con Google: " + error.message);
        });
}
