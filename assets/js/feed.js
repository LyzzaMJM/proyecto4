import { auth, agregarPost, totalPost, obtenerPost, eliminar, actualizado,  agregarComentario, cargarComentariosEnTiempoReal } from "./config.js";//
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";//

// Exporta otras funciones como agregarPost, totalPost, obtenerPost, actualizado, eliminar, etc.
//export { auth, agregarPost, totalPost, obtenerPost, actualizado, eliminar };





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

    if (mensaje === "") {
      alert("No puedes publicar un comentario vacío.");
    } else {
      if (editStatus) {
        actualizado(id, { comentario: mensaje }).then(() => {
          console.log("Post actualizado");
          resetForm();
          $('#postModal').modal('hide');
          cargarDatos();
          editStatus = false;
        }).catch((error) => {
          console.error("Error al actualizar el post: ", error);
        });
      } else {
        agregarPost(mensaje, image).then(() => {
          console.log("Post guardado");
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
        const postId = doc.id;
        const verificarAutorPost = auth.currentUser && auth.currentUser.uid === postData.uid;

        let fechaPublicacion = postData.timestamp ? new Date(postData.timestamp.toDate()).toLocaleString() : "Fecha no disponible";
        
        postList.append(`
          <div class="feed mb-4 p-3 border" data-id="${postId}">
            <div class="d-flex mb-3">
              <img src="https://via.placeholder.com/50" class="profile-pic me-3" alt="Profile Picture">
              <div>
                <h4 id="nombreUsuario" class="mb-1">${postData.displayName || 'Usuario anónimo'}</h4>
              </div>
              <h6>${fechaPublicacion}</h6>
            </div>
            <div class="card-body">
              <p>${postData.comentario}</p>
              ${postData.imageUrl ? `<img src="${postData.imageUrl}" alt="Imagen de publicación" class="img-fluid rounded">` : ''}
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn btn-outline-primary like-btn" data-id="${postId}">
                ${postData.likeContador} ❤️
              </button>
              ${verificarAutorPost ? `
                <button class="btn btn-outline-primary edit-btn" data-id="${postId}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline-primary delete-btn" data-id="${postId}">
                  <i class="fas fa-trash"></i>
                </button>
              ` : ''}
            </div>
            <br>
            <div class="comments-section" id="comments-${postId}">
              <div class="add-comment">
                <input type="text" class="comment-input" placeholder="Escribe un comentario" data-id="${postId}">
                <button class="btn btn-outline-primary submit-comment" data-id="${postId}">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
              <div class="comments-list" id="comments-list-${postId}"></div>
            </div>
          </div>
        `);
        

        // Cargar comentarios en tiempo real para cada publicación
        cargarComentariosEnTiempoReal(postId, (snapshot) => {
          const commentsList = $(`#comments-list-${postId}`);
          commentsList.html(""); // Limpiar comentarios previos
          snapshot.forEach((doc) => {
            const commentData = doc.data();
            let fechaComentario = commentData.timestamp ? new Date(commentData.timestamp.toDate()).toLocaleString() : "Fecha no disponible";
            
            commentsList.append(`
              <div class="comment mb-2">
                <strong>${commentData.displayName}</strong>: ${commentData.comentario}
                <br><small>${fechaComentario}</small>
              </div>
            `);
          });
        });
      });
    });
  }

  $(document).on('click', '.submit-comment', function () {
    const postId = $(this).data('id');
    const comentario = $(`#comments-${postId} .comment-input`).val();

    if (comentario !== "") {
      agregarComentario(postId, comentario).then(() => {
        $(`#comments-${postId} .comment-input`).val("");
      }).catch((error) => {
        console.error("Error al agregar comentario:", error);
      });
    } else {
      alert("No puedes publicar un comentario vacío.");
    }
  });

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









//CSS ARCHIVO
document.getElementById('custom-upload-btn').addEventListener('click', function() {
  document.getElementById('formFile').click(); // Disparar el input de archivo
});

function updateFileName() {
  const fileInput = document.getElementById('formFile');
  const fileName = document.getElementById('file-name');
  if (fileInput.files.length > 0) {
    fileName.textContent = fileInput.files[0].name; // Mostrar el nombre del archivo seleccionado
  } else {
    fileName.textContent = ''; // Limpiar el nombre si no hay archivo seleccionado
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const divCasa = document.getElementById("div-casa");

  // Verifica si hay una casa asignada en localStorage
  const casaAsignada = localStorage.getItem("casaAsignada");
  if (casaAsignada) {
      // Define las rutas de las imágenes para cada casa
      const imagenesCasas = {
          athena: "/assets/img/icons-cards/aguila.jpg",
          luminaria: "/assets/img/icons-cards/fenix.jpg",
          nova: "/assets/img/icons-cards/leon.jpg",
          salus: "/assets/img/icons-cards/cisne.jpg"
      };

      // Muestra el nombre de la casa y su imagen correspondiente
      divCasa.innerHTML = `
          <h2 class="text-primary">¡Tu casa es ${casaAsignada.charAt(0).toUpperCase() + casaAsignada.slice(1)}!</h2>
          <img src="${imagenesCasas[casaAsignada]}" alt="${casaAsignada}" class="img-fluid rounded" style="width: 200px;">
      `;
  } else {
      // Si no hay casa asignada, muestra el botón con estilo de Bootstrap
      divCasa.innerHTML = `
          <button class="btn btn-primary btn-lg" onclick="window.location.href='/assets/html/trivia.html'">Ir al Quiz de Asignación</button>
      `;
  }
});
