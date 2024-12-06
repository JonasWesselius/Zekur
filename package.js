// Get references to all "Kiezen" buttons and the Next button
const options = document.querySelectorAll('.card .option');
const nextButton = document.getElementById('next-button');

// Handle card selection
options.forEach(option => {
    option.addEventListener('click', () => {
        // Deselect all buttons
        options.forEach(opt => opt.classList.remove('selected'));

        // Select the clicked button
        option.classList.add('selected');

        // Enable the Next button
        nextButton.disabled = false;
        nextButton.classList.add('enabled');
    });
});

// Handle Next button navigation
nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('.card .option.selected');
    if (selectedOption) {
        const step = selectedOption.closest('.card').querySelector('.step').dataset.step; // Get the data-step value
        window.location.href = `stap${step}.html`; // Navigate to the corresponding step
    }
});
