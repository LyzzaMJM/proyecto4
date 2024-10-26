document.addEventListener("DOMContentLoaded", function() {
    const toggleNav = document.getElementById('toggle-nav');
    const navigation = document.querySelector('.navigation');
    const mainContent = document.querySelector('.main');

    // Alterna la clase 'active' en la navegación y el contenido principal
    toggleNav.addEventListener('click', () => {
        navigation.classList.toggle('active');
        mainContent.classList.toggle('active');
    });
});

