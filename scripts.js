document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("typewriter-text");
    const text = textElement.innerHTML;
    let i = 0;

    function typeWriter() {
        textElement.innerHTML = ""; // Reinicia el texto antes de empezar

        function addNextCharacter() {
            if (i < text.length) {
                textElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(addNextCharacter, 100); // Ajusta la velocidad de la animación aquí
            } else {
                i = 0; // Reinicia el índice para la próxima repetición
                setTimeout(typeWriter, 10000); // 10 segundos antes de repetir la animación
            }
        }

        addNextCharacter();
    }

    typeWriter(); // Inicia la animación la primera vez

    // Modo oscuro
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);

        // Ajusta la transición suave
        if (isDarkMode) {
            body.style.backgroundColor = "#333"; // Color de fondo oscuro
        } else {
            body.style.backgroundColor = ""; // Vuelve al color de fondo original
        }
    });

    // Verificar si el modo oscuro estaba activado anteriormente
    if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark-mode");
        body.style.backgroundColor = "#333"; // Color de fondo oscuro
    }

    // Función para mostrar la información del usuario
    function showUserInfo() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const headerContainer = document.querySelector('.header-top .container');
            const existingUserInfo = headerContainer.querySelector('.user-info');
            
            if (existingUserInfo) {
                existingUserInfo.remove();
            }

            const userInfoElement = document.createElement('div');
            userInfoElement.className = 'user-info';
            
            const userNameElement = document.createElement('span');
            userNameElement.className = 'user-name';
            userNameElement.textContent = `${currentUser.name}`;
            
            const logoutButton = document.createElement('button');
            logoutButton.className = 'logout-btn';
            logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            
            userInfoElement.appendChild(userNameElement);
            userInfoElement.appendChild(logoutButton);
            
            headerContainer.appendChild(userInfoElement);

            logoutButton.addEventListener('click', function() {
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        }
    }

    // Llamar a la función al cargar la página
    showUserInfo();
    
    // Separar el botón de modo nocturno
    darkModeToggle.style.marginLeft = "20px"; // Ajusta este valor según sea necesario

    // // Desenfoque al hacer scroll
    // window.addEventListener('scroll', function() {
    //     const scrollAmount = window.scrollY;
    //     const maxBlur = 2; // Máximo desenfoque en píxeles
    //     const blurValue = Math.min(scrollAmount / 100, maxBlur);
    //     document.body.style.filter = `blur(${blurValue}px)`;
    // });
});