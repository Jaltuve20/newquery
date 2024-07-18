function showUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current User:', currentUser); // Verifica el usuario actual

    if (currentUser) {
        const headerContainer = document.querySelector('.header-top .container');
        console.log('Header Container:', headerContainer); // Verifica el contenedor
        
        if (headerContainer) {
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
        } else {
            console.error('Contenedor de encabezado no encontrado.');
        }
    }
}
