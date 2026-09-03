/* ==============================
   LÓGICA DE LA HOJA DE VIDA
   ============================== */

const experienceContainer = document.getElementById('experienceContainer');
const addExperienceButton = document.getElementById('addExpBtn');
const cvForm = document.getElementById('cvForm');

let experienceNumber = 0;

// Crear un bloque nuevo de experiencia laboral.
addExperienceButton.addEventListener('click', function () {
    experienceNumber++;

    const experienceBlock = document.createElement('div');
    experienceBlock.className = 'exp-block';
    experienceBlock.dataset.number = experienceNumber;

    experienceBlock.innerHTML = `
        <div>
            <label for="company-${experienceNumber}">Empresa</label>
            <input type="text" id="company-${experienceNumber}" class="exp-company" placeholder="Nombre de la empresa" required>
            <span class="error-message company-error"></span>
        </div>

        <div>
            <label for="role-${experienceNumber}">Cargo</label>
            <input type="text" id="role-${experienceNumber}" class="exp-role" placeholder="Cargo desempeñado" required>
            <span class="error-message role-error"></span>
        </div>

        <button type="button" class="remove-exp">Eliminar</button>
    `;

    experienceContainer.appendChild(experienceBlock);
});

// Eliminar una experiencia usando delegación de eventos.
experienceContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-exp')) {
        event.target.closest('.exp-block').remove();
    }
});

cvForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('cvName');
    const title = document.getElementById('cvTitle');
    const nameError = document.getElementById('cvNameErr');
    const titleError = document.getElementById('cvTitleErr');

    let isValid = true;

    nameError.textContent = '';
    titleError.textContent = '';

    if (name.value.trim() === '') {
        nameError.textContent = 'Ingrese su nombre completo.';
        isValid = false;
    }

    if (title.value.trim() === '') {
        titleError.textContent = 'Ingrese su título profesional.';
        isValid = false;
    }

    const experiences = document.querySelectorAll('.exp-block');

    experiences.forEach(function (experience) {
        const company = experience.querySelector('.exp-company');
        const role = experience.querySelector('.exp-role');
        const companyError = experience.querySelector('.company-error');
        const roleError = experience.querySelector('.role-error');

        companyError.textContent = '';
        roleError.textContent = '';

        if (company.value.trim() === '') {
            companyError.textContent = 'Ingrese la empresa.';
            isValid = false;
        }

        if (role.value.trim() === '') {
            roleError.textContent = 'Ingrese el cargo.';
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    const previewContent = document.getElementById('cvPreviewContent');
    previewContent.innerHTML = `
        <p><strong>Nombre:</strong> ${escapeHtml(name.value.trim())}</p>
        <p><strong>Título:</strong> ${escapeHtml(title.value.trim())}</p>
        <h4>Experiencia Laboral</h4>
    `;

    if (experiences.length === 0) {
        previewContent.innerHTML += '<p>No se agregó experiencia laboral.</p>';
    } else {
        experiences.forEach(function (experience) {
            const company = experience.querySelector('.exp-company').value.trim();
            const role = experience.querySelector('.exp-role').value.trim();

            previewContent.innerHTML += `
                <div class="cv-experience">
                    <strong>${escapeHtml(company)}</strong>
                    <div>${escapeHtml(role)}</div>
                </div>
            `;
        });
    }

    document.getElementById('cvPreview').classList.remove('hidden');
});

function escapeHtml(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}
