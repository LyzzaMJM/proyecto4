import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; //autentificacion de usuarios
import { getFirestore, collection, query, orderBy, addDoc, getDocs, 
    getDoc, deleteDoc, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; //almacena y gestiona datos
import { updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; //actualiza el perfil del usuario 
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; 
import { getStorage, ref, getDownloadURL,  uploadBytes } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcT7oN_w4_xK4kOpxxy2GvmNGjQmIrnrg",
    authDomain: "proyecto-4-cdd43.firebaseapp.com",
    projectId: "proyecto-4-cdd43",
    storageBucket: "proyecto-4-cdd43.appspot.com",
    messagingSenderId: "890076953043",
    appId: "1:890076953043:web:12eecf50aa2d4683e4d726",
    measurementId: "G-7E9K50LP8N"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(); // Proveedor de Google
const storage = getStorage(app);

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
            window.location.href = './assets/html/feed.html';//Cmbiar segun nombre de la carpeta del feed
            window.location.href = './assets/html/feed.html';//Cmbiar segun nombre de la carpeta del feed
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
            window.location.href = './assets/html/feed.html';//Cambiar segun nombre de la carpeta del feed
            window.location.href = './assets/html/feed.html';//Cambiar segun nombre de la carpeta del feed
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









// Función para agregar un comentario
export function agregarComentario(postId, comentario) {
    const publicacionRef = doc(db, "publicaciones", postId);
    const comentariosRef = collection(publicacionRef, "comentarios");
    return addDoc(comentariosRef, {
        postId: postId,
        comentario: comentario,
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName || 'Usuario anónimo',
        timestamp: serverTimestamp()
    });
}

// Función para obtener comentarios en tiempo real
export function cargarComentariosEnTiempoReal(postId, callback) {
    const comentariosRef = collection(db, "publicaciones", postId, "comentarios");
    const q = query(comentariosRef, orderBy("timestamp", "asc"));
    return onSnapshot(q, callback);
}

// Función para obtener todos los comentarios de una publicaci
//export function cargarComentarios(postId) {
    //return getDocs(query(collection(db, "comentarios"), orderBy("timestamp", "desc")));
//}











//             FEEED 
// Función para agregar una post
export function agregarPost(comentario, imageFile) {
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

