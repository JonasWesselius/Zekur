document.addEventListener("DOMContentLoaded", () => {
    // Elementen
    const progress = document.getElementById("progress");
    const priceElement = document.getElementById("price");
    const toggleCart = document.getElementById("toggle-cart");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const resetCartButton = document.getElementById("reset-cart");

    const sections = document.querySelectorAll(".step");
    const totalSteps = 11;

    let completedSteps = parseInt(localStorage.getItem("completedSteps")) || 0;
    let currentPrice = parseFloat(localStorage.getItem("currentPrice")) || 0.0;
    const completedSections = new Set(localStorage.getItem("completedSections")?.split(",") || []);
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

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
        currentPrice = selectedItems.reduce((total, item) => total + item.price, 0);
        priceElement.textContent = `€${currentPrice.toFixed(2)}`;
    }

    function updateCart() {
        cartItems.innerHTML = "";
        selectedItems.forEach((item) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>€${item.price.toFixed(2)}</span>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    function saveProgress() {
        localStorage.setItem("completedSteps", completedSteps);
        localStorage.setItem("currentPrice", currentPrice.toFixed(2));
        localStorage.setItem("completedSections", Array.from(completedSections).join(","));
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }

    sections.forEach((section) => {
        const buttons = section.querySelectorAll(".option, .next-btn");
        const stepId = section.dataset.step;

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                // Verwijder 'selected' klasse van alle andere knoppen binnen dezelfde sectie
                buttons.forEach((btn) => btn.classList.remove("selected"));
                button.classList.add("selected"); // Markeer de huidige knop als geselecteerd

                if (!completedSections.has(stepId)) {
                    completedSections.add(stepId);
                    completedSteps++;
                }

                const card = button.closest(".card4");
                if (card) {
                    const packageName = card.querySelector(".pakket-naam")?.textContent || "Onbekend pakket";
                    const price = getPriceFromCard(card);

                    const existingIndex = selectedItems.findIndex((item) => item.stepId === stepId);
                    if (existingIndex !== -1) selectedItems.splice(existingIndex, 1);

                    selectedItems.push({ stepId, name: packageName, price });
                }

                updateProgress();
                updatePrice();
                updateCart();
                saveProgress();
            });
        });
    });

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

    function resetCart() {
        // Reset alle variabelen
        completedSteps = 0;
        currentPrice = 0.0;
        completedSections.clear();
        selectedItems.length = 0;

        // Reset de UI
        updateProgress();
        updatePrice();
        updateCart();

        // Verwijder uit localStorage
        localStorage.removeItem("completedSteps");
        localStorage.removeItem("currentPrice");
        localStorage.removeItem("completedSections");
        localStorage.removeItem("selectedItems");

        // Toon een melding of log
        console.log("Winkelmand en voortgang zijn gereset.");
    }

    // Voeg eventlistener toe aan de reset-knop
    if (resetCartButton) {
        resetCartButton.addEventListener("click", resetCart);
    }


    updateProgress();
    updatePrice();
    updateCart();
});
