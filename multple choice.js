// Get references to all options and the Next button
const options = document.querySelectorAll('.option');
const nextButton = document.getElementById('next-button');

// Track selections for each card
const selections = {
    age: null,
    income: null,
    status: null,
};

// Handle option clicks
options.forEach(option => {
    option.addEventListener('click', () => {
        const cardType = option.dataset.card;

        // Mark all options for this card as not selected
        const siblingOptions = document.querySelectorAll(`.option[data-card="${cardType}"]`);
        siblingOptions.forEach(sibling => sibling.classList.remove('selected'));

        // Mark clicked option as selected
        option.classList.add('selected');

        // Save selection
        selections[cardType] = option.textContent;

        // Check if all selections are made
        const allSelected = Object.values(selections).every(value => value !== null);

        // Enable the Next button if all are selected
        if (allSelected) {
            nextButton.disabled = false;
            nextButton.classList.add('enabled');
        }
    });
});

nextButton.addEventListener('click', () => {
    if (!nextButton.disabled) {
        window.location.href = 'stap2.html'; 
    }
});
