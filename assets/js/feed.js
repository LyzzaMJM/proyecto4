import { auth, agregarPost, totalPost, obtenerPost, eliminar, actualizado } from "./config.js";//
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";//

let editStatus = false; //estado
let id = '';
const postImage = document.getElementById('formFile');
console.log(postImage);

$(document).ready(function () {

  $('#boton-post').click(function (e) {
    e.preventDefault();
    const mensaje = $('#opinion').val();
    const image = postImage.files[0];
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
        agregarPost(mensaje, image).then(() => {
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
        // Verificar si el usuario actual es el propietario del post
        const verificarAutorPost = auth.currentUser && auth.currentUser.uid === postData.uid;
        
        let fechaPublicacion;
        if (postData.timestamp) {
            // el timestamp, se convierte a un objeto Date y luego a una cadena legible
            fechaPublicacion = new Date(postData.timestamp.toDate()).toLocaleString();
        } else {
            fechaPublicacion = "Fecha no disponible";
        }
  
        console.log(postData);
        console.log(verificarAutorPost);
        
        
        postList.append(`
          <div class="feed mb-4 p-3 border" data-id="${doc.id}">
            <div class="d-flex mb-3">
              <img src="https://via.placeholder.com/50" class="profile-pic me-3" alt="Profile Picture">
              <div>
                <h4 id = "nombreUsuario" class="mb-1">${postData.displayName || 'Usuario anónimo'}</h4>
              </div>
              <h6>${fechaPublicacion}</h6>
              </div>
              <div class="card-body">
              <p>${postData.comentario}</p>
              ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Imagen de publicación" class="img-fluid rounded">` : ''}
              </div>
            <div class="d-flex justify-content-between">
              <button class="btn btn-outline-primary like-btn" data-id="${doc.id}">
                ${postData.likeContador} ❤️
              </button>
              <button id="boton-comentario" class="btn btn-outline-primary">Comment</button>
              ${verificarAutorPost ? `
                        <button class="btn btn-outline-primary edit-btn" data-id="${doc.id}">Editar</button>
                        <button class="btn btn-outline-primary delete-btn" data-id="${doc.id}">Eliminar</button>
                        ` : ''}
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

// Evento para Editar
$(document).on('click', '.edit-btn', function () {
  const postId = $(this).data('id');
  console.log("ingresaste al edit boton");

  obtenerPost(postId).then((doc) => {
    if (doc.exists()) { 
      const postData = doc.data();
      console.log("se encontro el post q quieres editar");
      
      
      $('#editComentario').val(postData.comentario);
      
      $('#editDocId').val(postId);
      
      $('#postModal').modal('show'); // Muestra el modal
    } else {
      console.error("El documento no existe.");
    }
  }).catch((error) => {
    console.error("Error al obtener el post:", error);
  });
});

// Evento de submit para guardar los cambios
$('#editForm').on('submit', function (e) {
  e.preventDefault(); 

  const postId = $('#editDocId').val(); 
  const comentarioActualizado = $('#editComentario').val(); 

  if (postId && comentarioActualizado) { 
    actualizado(postId, { comentario: comentarioActualizado }) 
      .then(() => {
        console.log("Comentario actualizado correctamente");
        
        $(`div[data-id="${postId}"] p`).text(comentarioActualizado); 
        
        $('#postModal').modal('hide'); 
        resetForm(); 
      })
      .catch((error) => {
        console.error("Error al actualizar el comentario:", error);
      });
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

// Evento para Eliminar
$(document).on('click', '.delete-btn', function () {
  const postId = $(this).data('id');
  if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
    eliminar(postId).then(() => {
      console.log("Publicación eliminada");
      $(`div[data-id="${postId}"]`).remove(); 
    }).catch((error) => {
      console.error("Error al eliminar la publicación:", error);
    });
  }
});

// Autenticar al usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user);
  } else {
    console.log("Usuario no autenticado.");
    window.location.href = '../../index.html';
  }
});
const btnLogout = document.getElementById("logout-button"); 

// Cerrar sesión, si funciona :D 
btnLogout.addEventListener('click', () => {
  console.log("click en salir");
  
  signOut(auth)
      .then(() => {
          console.log("Cierre de sesión exitoso.");
          window.location.href = '../../index.html';
      })
      .catch((error) => {
          console.error("Error al cerrar sesión:", error);
          alert("No se pudo cerrar sesión. Intenta de nuevo.");
      });
});