document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegisterLink = document.getElementById("showRegister");
    const showLoginLink = document.getElementById("showLogin");

    function showForm(formToShow, formToHide) {
        formToHide.style.display = "none";
        formToShow.style.display = "block";
        formToShow.classList.add("animate__animated", "animate__fadeIn");
    }

    showRegisterLink.addEventListener("click", function(e) {
        e.preventDefault();
        showForm(registerForm, loginForm);
    });

    showLoginLink.addEventListener("click", function(e) {
        e.preventDefault();
        showForm(loginForm, registerForm);
    });

    // Función para registrar un nuevo usuario
    registerForm.querySelector('form').addEventListener("submit", function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Guardar datos en localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert("Registro exitoso. Por favor, inicia sesión.");
        showForm(loginForm, registerForm);
    });

    // Función para iniciar sesión
    loginForm.querySelector('form').addEventListener("submit", function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert("Inicio de sesión exitoso!");
            window.location.href = 'index.html'; // Redirige a la página principal
        } else {
            alert("Email o contraseña incorrectos");
        }
    });

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

        // Separar el botón de modo nocturno
        darkModeToggle.style.marginLeft = "20px"; // Ajusta este valor según sea necesario
    // Llamar a la función al cargar la página
    showUserInfo();
});
