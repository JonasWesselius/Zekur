document.addEventListener("DOMContentLoaded", () => {
    const progress = document.getElementById("progress");
    const priceElement = document.getElementById("price");
    const steps = document.querySelectorAll(".step");
    const totalSteps = steps.length; // Total number of steps
    let completedSteps = 0;
    let currentPrice = 0.0;

    // Add event listeners to all buttons
    steps.forEach((step) => {
        const buttons = step.querySelectorAll(".step-option");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                // Deselect all buttons in the current step
                buttons.forEach((btn) => btn.classList.remove("selected"));

                // Mark the clicked button as selected
                button.classList.add("selected");

                // Check if the step is newly completed
                if (!step.dataset.completed) {
                    step.dataset.completed = "true"; // Mark step as completed
                    completedSteps++;
                }

                // Update progress and price
                updateProgress();
                updatePrice();
            });
        });
    });

    function updateProgress() {
        const percentage = (completedSteps / totalSteps) * 100;
        progress.style.width = `${percentage}%`;
    }

    function updatePrice() {
        currentPrice = 0; // Reset price
        steps.forEach((step) => {
            const selectedButton = step.querySelector(".step-option.selected");
            if (selectedButton) {
                currentPrice += parseFloat(selectedButton.dataset.price);
            }
        });
        priceElement.textContent = currentPrice.toFixed(2);
    }
});
