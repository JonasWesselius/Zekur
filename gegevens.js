document.querySelectorAll('.dropdown-title').forEach(title => {
    title.addEventListener('click', function () {
        const container = this.parentElement;
        const content = this.nextElementSibling;

        // Alleen openen als het niet locked is
        if (!container.classList.contains('locked')) {
            content.classList.toggle('show');
        }
    });
});

function validateForm(formNumber) {
    const form = document.getElementById(`form-${formNumber}`);
    
    if (form.checkValidity()) {
        // Sluit huidige sectie
        const currentDropdown = form.parentElement.parentElement;
        currentDropdown.querySelector('.dropdown-content').classList.remove('show');

        // Ontgrendel de volgende sectie
        const nextDropdown = currentDropdown.nextElementSibling;
        if (nextDropdown) {
            nextDropdown.classList.remove('locked');
            nextDropdown.classList.add('unlocked');
        }
    } else {
        alert("Vul alle verplichte velden in.");
    }
}

