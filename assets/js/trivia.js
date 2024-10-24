$(document).ready(function () {
    // Variables
    let currentQuestion = 0;
    const totalQuestions = $(".pregunta").length - 1; // -1 para no contar el resultado final
    let hasChangedHouse = false;

    // Función para mostrar la siguiente pregunta
    function showNextQuestion() {
        // Oculta la pregunta actual
        $(".pregunta").eq(currentQuestion).hide();

        // Si aún hay más preguntas, muestra la siguiente
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            $(".pregunta").eq(currentQuestion).show();
        } else {
            // Si ya no hay más preguntas, muestra el resultado
            calculateHouse();
            $("#resultadoFinal").show();
            $("#siguienteBtn").hide(); // Oculta el botón de siguiente al terminar
        }
    }

    // Función para calcular la casa asignada
    function calculateHouse() {
        const houseScores = {
            athena: 0,
            luminaria: 0,
            nova: 0,
            salus: 0
        };

        // Recorrer todas las preguntas y sumar puntos según las respuestas
        $(".pregunta input[type='radio']:checked").each(function () {
            const selectedValue = $(this).val();
            houseScores[selectedValue]++;
        });

        // Determinar la casa con mayor puntuación
        let assignedHouse = Object.keys(houseScores).reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);

        // Mostrar la casa asignada con la primera letra en mayúscula
        $("#casaResultado").text(assignedHouse.charAt(0).toUpperCase() + assignedHouse.slice(1));
    }

    // Evento de clic para el botón "Siguiente"
    $("#siguienteBtn").click(function () {
        // Verifica si se ha seleccionado una respuesta en la pregunta actual
        if ($(".pregunta").eq(currentQuestion).find("input[type='radio']:checked").length > 0) {
            showNextQuestion();
        } else {
            alert("Por favor, selecciona una respuesta antes de continuar.");
        }
    });

    // Mostrar solo la primera pregunta al cargar
    $(".pregunta").eq(0).show();

    // Evento para el botón "Ir a mi feed"
    $("#goToFeedBtn").click(function () {
        const assignedHouse = $("#casaResultado").text().toLowerCase(); // Obtener la casa asignada
        switch (assignedHouse) {
            case 'athena':
                window.location.href = 'athena_feed.html'; // Redirige al feed de Athena
                break;
            case 'luminaria':
                window.location.href = 'luminaria_feed.html'; // Redirige al feed de Luminaria
                break;
            case 'nova':
                window.location.href = 'nova_feed.html'; // Redirige al feed de Nova
                break;
            case 'salus':
                window.location.href = 'salus_feed.html'; // Redirige al feed de Salus
                break;
            default:
                alert('No se ha podido asignar una casa.');
        }
    });

    // Evento para el botón "Quiero cambiar de casa"
    $("#changeHouseBtn").click(function () {
        if (!hasChangedHouse) {
            $("#warningMessage").show(); // Mostrar el mensaje de advertencia
            $("#changeHouseModal").show(); // Muestra el modal
        } else {
            alert("Ya has cambiado de casa una vez. No puedes cambiar nuevamente.");
        }
    });

    // Evento para cerrar el modal
    $(".close-button").click(function() {
        $("#changeHouseModal").hide();
    });

    // Confirmar el cambio de casa
    $("#confirmChangeBtn").click(function () {
        const newHouse = $("#newHouseInput").val().toLowerCase(); // Obtener valor de entrada

        if (newHouse === "athena" || newHouse === "luminaria" || newHouse === "nova" || newHouse === "salus") {
            $("#casaResultado").text(newHouse.charAt(0).toUpperCase() + newHouse.slice(1)); // Actualizar la casa
            alert("Has cambiado a la casa " + newHouse.charAt(0).toUpperCase() + newHouse.slice(1) + ". Este será tu último cambio.");
            hasChangedHouse = true; // Marcar que ya ha hecho un cambio
            $("#changeHouseModal").hide(); // Oculta el modal
        } else {
            alert("La casa ingresada no es válida.");
        }
    });

    // Evento para seleccionar la tarjeta
    $(".radio-option input[type='radio']").change(function () {
        // Quitar la clase 'selected' de todas las tarjetas
        $(".radio-option").removeClass("selected");
        // Agregar la clase 'selected' a la tarjeta seleccionada
        $(this).closest('.radio-option').addClass("selected");
    });
});
