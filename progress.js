

document.addEventListener("DOMContentLoaded", () => {
    const progress = document.getElementById("progress");
    const priceElement = document.getElementById("price");
    const sections = document.querySelectorAll(".dropdown-container");
    const totalSteps = sections.length;
    let completedSteps = 0;
    let currentPrice = 0.0;

    sections.forEach((section) => {
        const buttons = section.querySelectorAll(".option");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                // Deselect all buttons in the current section
                buttons.forEach((btn) => btn.classList.remove("selected"));

                // Mark the clicked button as selected
                button.classList.add("selected");

                // Check if the section is newly completed
                if (!section.dataset.completed) {
                    section.dataset.completed = "true"; // Mark section as completed
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
        sections.forEach((section) => {
            const selectedButton = section.querySelector(".option.selected");
            if (selectedButton) {
                // Find the price in the related card
                const card = selectedButton.closest(".card4");
                const priceElement = card.querySelector(".prijs");
                if (priceElement) {
                    const priceText = priceElement.textContent.match(/[\d.,]+/);
                    if (priceText) {
                        const price = parseFloat(priceText[0].replace(",", "."));
                        currentPrice += price;
                    }
                }
            }
        });
        priceElement.textContent = currentPrice.toFixed(2);
    }
});



