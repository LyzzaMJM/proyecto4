import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export const firebaseConfig = {
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
const provider = new GoogleAuthProvider();

// Función para registrar un nuevo usuario
export function registerUser(email, password, fullName) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("Registro exitoso. ¡Bienvenido!");
            updateProfile(userCredential.user, { displayName: fullName })
                .then(() => {
                    localStorage.setItem('fullName', fullName);
                    window.location.href = '/assets/html/feed.html';
                });
        })
        .catch(error => {
            console.error("Error al registrar:", error.code, error.message);
            alert("Error al registrar: " + error.message);
        });
}

// Función para iniciar sesión
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("Inicio de sesión exitoso. ¡Bienvenido!", userCredential.user.displayName);
            localStorage.setItem('fullName', userCredential.user.displayName || '');
            window.location.href = '/assets/html/feed.html';
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error.code, error.message);
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Función para ingresar con Google
export function loginWithGoogle() {
    return signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            console.log("Ingreso con Google exitoso. ¡Bienvenido!", user);
            localStorage.setItem('fullName', user.displayName || 'Sin nombre');
            window.location.href = '/assets/html/feed.html';
        })
        .catch(error => {
            console.error("Error al iniciar sesión con Google:", error.code, error.message);
            alert("Error al ingresar con Google: " + error.message);
        });
}
//             FEEED 
// Función para agregar una post
export function agregarPost(comentario) {
    console.log("guardado el post:", comentario);
    //crea la coleccion en el firebase
    return addDoc(collection(db, 'publicaciones'), {
        comentario: comentario
    });
}
  
export function totalPost() {
      console.log("publicaciones totales");
      //muestra todos los post de la coleccion de publicaiones
      return getDocs(collection(db, 'publicaciones'));
}
  
export function obtenerPost(id) {
      console.log("post buscado:", id);
      return getDoc(doc(db, 'publicaciones', id));
}
  
export function actualizado(id, newFields) {
      console.log("actualizado:", id);
      return updateDoc(doc(db, 'publicaciones', id), newFields);
}
  
export function eliminar(id) {
      console.log("eliminado:", id);
      return deleteDoc(doc(db, "publicaciones", id));
}
  
export { auth };