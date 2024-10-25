document.addEventListener("DOMContentLoaded", function () {
    // Obtén todos los botones "Unirme"
    const joinButtons = document.querySelectorAll("button:contains('Unirme')");

    // Agrega un evento de clic a cada botón
    joinButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Redirige a feed.html al hacer clic
            window.location.href = "feed.html";
        });
    });
});
