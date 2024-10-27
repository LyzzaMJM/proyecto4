const fullName = localStorage.getItem('fullName');
        
// Muestra el mensaje de bienvenida
if (fullName) {
    document.getElementById('welcomeMessage').innerText = `${fullName}`;
}