/* ==============================
   LÓGICA DEL REGISTRO
   ============================== */

const regForm = document.getElementById('regForm');
const nameInput = document.getElementById('fullname');
const emailInput = document.getElementById('regEmail');
const passwordInput = document.getElementById('regPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

function showFieldError(input, errorElement, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorElement.textContent = message;
}

function showFieldValid(input, errorElement) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorElement.textContent = '';
}

// Validación en tiempo real del nombre.
nameInput.addEventListener('input', function () {
    const error = document.getElementById('nameErr');

    if (this.value.trim().length >= 3) {
        showFieldValid(this, error);
    } else {
        showFieldError(this, error, 'Mínimo 3 caracteres.');
    }
});

// Validación en tiempo real del correo.
emailInput.addEventListener('input', function () {
    const error = document.getElementById('regEmailErr');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(this.value.trim())) {
        showFieldValid(this, error);
    } else {
        showFieldError(this, error, 'Ingrese un correo electrónico válido.');
    }
});

// Validación en tiempo real de la contraseña.
passwordInput.addEventListener('input', function () {
    const error = document.getElementById('regPasswordErr');

    if (this.value.length >= 6) {
        showFieldValid(this, error);
    } else {
        showFieldError(this, error, 'Mínimo 6 caracteres.');
    }
});

// Confirmación de contraseñas.
confirmPasswordInput.addEventListener('input', function () {
    const error = document.getElementById('confirmPasswordErr');

    if (this.value !== '' && this.value === passwordInput.value) {
        showFieldValid(this, error);
    } else {
        showFieldError(this, error, 'Las contraseñas no coinciden.');
    }
});

regForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const gender = document.getElementById('gender');
    const terms = document.getElementById('terms');
    let isValid = true;

    // Reutilizar las validaciones para detectar campos vacíos al enviar.
    if (nameInput.value.trim().length < 3) {
        showFieldError(nameInput, document.getElementById('nameErr'), 'Mínimo 3 caracteres.');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, document.getElementById('regEmailErr'), 'Ingrese un correo electrónico válido.');
        isValid = false;
    }

    if (gender.value === '') {
        document.getElementById('genderErr').textContent = 'Seleccione una opción.';
        gender.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('genderErr').textContent = '';
        gender.classList.remove('error');
    }

    if (passwordInput.value.length < 6) {
        showFieldError(passwordInput, document.getElementById('regPasswordErr'), 'Mínimo 6 caracteres.');
        isValid = false;
    }

    if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === '') {
        showFieldError(confirmPasswordInput, document.getElementById('confirmPasswordErr'), 'Las contraseñas no coinciden.');
        isValid = false;
    }

    if (!terms.checked) {
        document.getElementById('termsErr').textContent = 'Debes aceptar los Términos y Condiciones.';
        isValid = false;
    } else {
        document.getElementById('termsErr').textContent = '';
    }

    if (isValid) {
        regForm.classList.add('hidden');

        const summary = document.getElementById('regSummary');
        document.getElementById('summaryText').textContent =
            `La cuenta de ${nameInput.value.trim()} (${emailInput.value.trim()}) fue registrada correctamente.`;
        summary.classList.remove('hidden');
    }
});
