import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; //autentificacion de usuarios
import { getFirestore, collection, query, orderBy, addDoc, getDocs, 
    getDoc, deleteDoc, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; //almacena y gestiona datos
import { updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; //actualiza el perfil del usuario 
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; 
import { getStorage, ref, getDownloadURL,  uploadBytes } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyCf_lH7ndXTE405SZc8YDcwXFdg6LrTsQE",
    authDomain: "redsocialeduconect.firebaseapp.com",
    projectId: "redsocialeduconect",
    storageBucket: "redsocialeduconect.appspot.com",
    messagingSenderId: "654346742916",
    appId: "1:654346742916:web:b392def2f54a9b1e3466d1",
    measurementId: "G-C48L1Z9T1Q"
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
            window.location.href = 'assets/html/athena_feed.html';//Cmbiar segun nombre de la carpeta del feed
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
            window.location.href = 'assets/html/athena_feed.html';//Cambiar segun nombre de la carpeta del feed
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

//             FEEED 
// Función para agregar una post
export function agregarPost(comentario, imageUrl) {
    let imageUrl = null;
    console.log("guardando el post:", comentario);
    // Verifica si hay un archivo de imagen
    if (imageFile) {
        const storageRef = ref(storage, `images/${auth.currentUser.uid}/${imageFile.name}`);
        return uploadBytes(storageRef, imageFile).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
        }).then((url) => {
            imageUrl = url;
            // Guarda el post con el comentario y la URL de la imagen
            return addDoc(collection(db, 'publicaciones'), {
                comentario: comentario,
                uid: auth.currentUser.uid, 
                likeContador: 0, 
                imageUrl: imageUrl, 
                displayName: auth.currentUser.displayName || 'Usuario anónimo',
                timestamp: serverTimestamp() // Marca de tiempo del servidor
            });
        });
    } else {
        // Guarda el post sin imagen
        return addDoc(collection(db, 'publicaciones'), {
            comentario: comentario,
            uid: auth.currentUser.uid,
            likeContador: 0, // Contador de likes
            imageUrl: null, // Sin imagen
            displayName: auth.currentUser.displayName || 'Usuario anónimo',
            timestamp: serverTimestamp() // Marca de tiempo del servidor
        });
    }
}

export function totalPost() {
    console.log("publicaciones totales");
    //muestra todos los post de la coleccion de publicaiones
    return getDocs(query(collection(db, 'publicaciones'), orderBy("timestamp", "desc")));
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