/* ==============================
   LÓGICA DEL LOGIN
   ============================== */

const loginForm = document.getElementById('loginForm');
const loginPassword = document.getElementById('loginPassword');
const togglePassword = document.getElementById('togglePassword');

// Mostrar u ocultar la contraseña.
togglePassword.addEventListener('click', function () {
    const passwordIsHidden = loginPassword.type === 'password';

    loginPassword.type = passwordIsHidden ? 'text' : 'password';
    this.textContent = passwordIsHidden ? 'Ocultar' : 'Mostrar';
    this.setAttribute(
        'aria-label',
        passwordIsHidden ? 'Ocultar contraseña' : 'Mostrar contraseña'
    );
});

// Validar el formulario antes de mostrar la confirmación.
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    email.classList.remove('error');
    password.classList.remove('error');
    emailError.textContent = '';
    passwordError.textContent = '';

    // Validación del correo mediante expresión regular.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        emailError.textContent = 'Ingrese un correo electrónico válido.';
        isValid = false;
    }

    // Validación de la contraseña.
    if (password.value.length < 6) {
        password.classList.add('error');
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        isValid = false;
    }

    // Si todo es correcto, cambiar a la vista de confirmación.
    if (isValid) {
        loginForm.classList.add('hidden');

        const welcomeCard = document.getElementById('loginWelcome');
        document.getElementById('userEmailDisplay').textContent = email.value.trim();
        welcomeCard.classList.remove('hidden');
    }
});
