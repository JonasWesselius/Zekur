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

document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById("next-button");

    nextButton.addEventListener("click", () => {
        // Extract the current step number from the URL
        const currentUrl = window.location.href;
        const currentStepMatch = currentUrl.match(/stap(\d+)\.html/); // Matches 'stap1.html', 'stap2.html', etc.

        if (currentStepMatch) {
            const currentStep = parseInt(currentStepMatch[1], 10); // Extract and convert the step number
            let nextPage = "";

            // Determine the next page based on the current step
            if (currentStep >= 1 && currentStep <= 3) {
                nextPage = `stap${currentStep + 1}.html`;
            } else if (currentStep === 4) {
                nextPage = "gegevens.html";
            }

            // Navigate to the next page if it is determined
            if (nextPage) {
                window.location.href = nextPage;
            }
        }
    });
});
