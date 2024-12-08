document.addEventListener("DOMContentLoaded", () => {
    const progress = document.getElementById("progress");
    const priceElement = document.getElementById("price");
    const toggleCart = document.getElementById("toggle-cart");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const sections = document.querySelectorAll(".dropdown-container");
    const totalSteps = 11;

    let completedSteps = 0;
    let currentPrice = 0.0;

    if (toggleCart) {
        toggleCart.addEventListener("click", () => {
            if (cart.classList.contains("hidden")) {
                cart.classList.remove("hidden");
                toggleCart.textContent = "▲";
            } else {
                cart.classList.add("hidden");
                toggleCart.textContent = "▼";
            }
            updateCart();
        });
    }

    sections.forEach((section) => {
        const buttons = section.querySelectorAll(".option");
        buttons.forEach((button) => {
            button.addEventListener("click", () => handleButtonClick(button, buttons, section));
        });
    });

    function handleButtonClick(button, buttons, section) {
        if (button.dataset.card === "income") {
            console.log("Vergelijk-knop geklikt: Geen impact op voortgangsbalk.");
            return;
        }

        buttons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");

        if (!section.dataset.completed) {
            section.dataset.completed = "true";
            completedSteps++;
        }

        updateProgress();
        updatePrice();
    }

    function updateProgress() {
        const percentage = (completedSteps / totalSteps) * 100;
        progress.style.width = `${percentage}%`;
    }

    function getPriceFromCard(card) {
        const priceElement = card?.querySelector(".prijs");
        if (priceElement) {
            const priceText = priceElement.textContent.match(/[\d.,]+/);
            if (priceText) {
                return parseFloat(priceText[0].replace(",", "."));
            }
        }
        return 0;
    }

    function updatePrice() {
        currentPrice = 0;
        sections.forEach((section) => {
            const selectedButton = section.querySelector(".option.selected");
            if (selectedButton) {
                const card = selectedButton.closest(".card4");
                currentPrice += getPriceFromCard(card);
            }
        });

        priceElement.textContent = `€${currentPrice.toFixed(2)}`;
    }

    function updateCart() {
        cartItems.innerHTML = ""; // Leeg winkelmand
        sections.forEach((section) => {
            const selectedButton = section.querySelector(".option.selected");
            if (selectedButton) {
                const card = selectedButton.closest(".card4");
                if (!card) return;

                const packageName = card.querySelector(".pakket-naam")?.textContent || "Onbekend pakket";
                const price = getPriceFromCard(card);

                if (!price || !packageName) return;

                // Voeg item toe aan winkelmand
                const item = document.createElement("li");
                item.innerHTML = `
                    <span>${packageName}</span>
                    <span>€${price.toFixed(2)}</span>
                `;
                cartItems.appendChild(item);
            }
        });
    }

    // Update direct bij laden
    updateProgress();
    updatePrice();
});
