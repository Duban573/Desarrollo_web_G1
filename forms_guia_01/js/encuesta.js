/* ==============================
   LÓGICA DE LA ENCUESTA
   ============================== */

const reasonSelect = document.getElementById('reasonSelect');
const otherGroup = document.getElementById('otherGroup');
const otherReason = document.getElementById('otherReason');
const surveyForm = document.getElementById('surveyForm');

// Mostrar u ocultar el campo "Otro" según la selección.
reasonSelect.addEventListener('change', function () {
    if (this.value === 'Otro') {
        otherGroup.classList.remove('hidden');
        otherReason.focus();
    } else {
        otherGroup.classList.add('hidden');
        otherReason.value = '';
        document.getElementById('otherErr').textContent = '';
    }
});

surveyForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const academicLevel = document.getElementById('academicLevel');
    const languageSelect = document.getElementById('languageSelect');
    const academicError = document.getElementById('academicErr');
    const languageError = document.getElementById('languageErr');
    const reasonError = document.getElementById('reasonErr');
    const otherError = document.getElementById('otherErr');

    let isValid = true;

    academicError.textContent = '';
    languageError.textContent = '';
    reasonError.textContent = '';
    otherError.textContent = '';

    if (academicLevel.value === '') {
        academicError.textContent = 'Seleccione su nivel académico.';
        isValid = false;
    }

    if (languageSelect.value === '') {
        languageError.textContent = 'Seleccione un lenguaje.';
        isValid = false;
    }

    if (reasonSelect.value === '') {
        reasonError.textContent = 'Seleccione un motivo.';
        isValid = false;
    }

    if (reasonSelect.value === 'Otro' && otherReason.value.trim() === '') {
        otherError.textContent = 'Especifique el motivo.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const reason = reasonSelect.value === 'Otro'
        ? otherReason.value.trim()
        : reasonSelect.value;

    document.getElementById('summaryAcademic').textContent = academicLevel.value;
    document.getElementById('summaryLanguage').textContent = languageSelect.value;
    document.getElementById('summaryReason').textContent = reason;

    surveyForm.classList.add('hidden');
    document.getElementById('surveySummary').classList.remove('hidden');
});
