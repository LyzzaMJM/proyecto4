import { auth, agregarPost, totalPost, eliminar, actualizado } from "./config.js";//
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";//consulta


let editStatus = false; //estado
let id = '';
//es un avance 
$(document).ready(function () {

  $('#boton-post').click(function (e) {
    e.preventDefault();
    const mensaje = $('#opinion').val();
    console.log("click publicado");
    
    if (mensaje == "") {
      alert("No puedes publicar un comentario vacío.");
    } else {
      //si se quiere editar actualiza el post 
      if (editStatus) {
        actualizado(id, { comentario: mensaje }).then(() => {
          console.log("Post actualizado");
          resetForm(); // Limpia el formulario
          $('#postModal').modal('hide'); // Oculta el modal
          cargarDatos(); // Recarga los posts
          editStatus = false; // Restablece el estado de edición
        }).catch((error) => {
          console.error("Error al actualizar el post: ", error);
        });

      } else {
        // Si no esta en edicion agrega un nuevo post
        agregarPost(mensaje).then(() => {
          console.log("Post guardado ");
          resetForm(); 
          $('#postModal').modal('hide'); 
          cargarDatos(); 
        }).catch((error) => {
          console.error("Error al guardar el post: ", error);
        });
      }
    }

  });

  cargarDatos();

  function cargarDatos() {
    const postList = $('#totalC');
    postList.html("");
    totalPost().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        postList.append(`
          <div class="feed mb-4 p-3 border">
            <div class="d-flex mb-3" id="${doc.id}">
              <img src="https://via.placeholder.com/50" class="profile-pic me-3" alt="Profile Picture">
              <div>
                <h6 class="mb-1">Jane Smith</h6>
              </div>
            </div>
            <p>${postData.comentario}</p>
            <div class="d-flex justify-content-between">
              <button id="boton-like" class="btn btn-outline-primary">Like</button>
              <button id="boton-comentario" class="btn btn-outline-primary">Comment</button>
            </div>
          </div>`);
      });
    });
  }

  function resetForm() {
    $('#opinion').val('');
    id = '';
    editStatus = false;
  }

});

// Autenticar al usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user);
  } else {
    console.log("Usuario no autenticado.");
    window.location.href = './index.html';
  }
});