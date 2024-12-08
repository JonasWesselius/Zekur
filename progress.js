// document.addEventListener("DOMContentLoaded", () => {
//     const progress = document.getElementById("progress");
//     const priceElement = document.getElementById("price");
//     const sections = document.querySelectorAll(".dropdown-container");
//     const totalSteps = sections.length;
//     let completedSteps = 0;
//     let currentPrice = 0.0;

//     sections.forEach((section) => {
//         const buttons = section.querySelectorAll(".option");

//         buttons.forEach((button) => {
//             button.addEventListener("click", () => {
//                 // Controleer of de knop een "vergelijk" knop is
//                 if (button.dataset.card === "income") {
//                     // Alleen actie uitvoeren als de knop een vergelijkknop is
//                     console.log("Vergelijk-knop geklikt: Geen impact op voortgangsbalk.");
//                     return;
//                 }

//                 // Deselecteer alle knoppen in de huidige sectie
//                 buttons.forEach((btn) => btn.classList.remove("selected"));

//                 // Markeer de geklikte knop als geselecteerd
//                 button.classList.add("selected");

//                 // Controleer of de sectie nieuw voltooid is
//                 if (!section.dataset.completed) {
//                     section.dataset.completed = "true"; // Markeer sectie als voltooid
//                     completedSteps++;
//                 }

//                 // Update voortgang en prijs
//                 updateProgress();
//                 updatePrice();
//             });
//         });
//     });

//     function updateProgress() {
//         const percentage = (completedSteps / totalSteps) * 100;
//         progress.style.width = `${percentage}%`;
//     }

//     function updatePrice() {
//         currentPrice = 0; // Reset prijs
//         sections.forEach((section) => {
//             const selectedButton = section.querySelector(".option.selected");
//             if (selectedButton) {
//                 // Vind de prijs in de bijbehorende kaart
//                 const card = selectedButton.closest(".card4");
//                 const priceElement = card.querySelector(".prijs");
//                 if (priceElement) {
//                     const priceText = priceElement.textContent.match(/[\d.,]+/);
//                     if (priceText) {
//                         const price = parseFloat(priceText[0].replace(",", "."));
//                         currentPrice += price;
//                     }
//                 }
//             }
//         });
//         priceElement.textContent = currentPrice.toFixed(2);
//     }
// });


// --------------------------------------------------------new---------------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
    const progress = document.getElementById("progress");
    const priceElement = document.getElementById("price");
    const sections = document.querySelectorAll(".dropdown-container");
    const totalSteps = 11; // Totaal aantal stappen over alle pagina's
    let completedSteps = parseInt(localStorage.getItem("completedSteps")) || 0;
    let currentPrice = parseFloat(localStorage.getItem("currentPrice")) || 0.0;

    // Update voortgangsbalk en prijs bij het laden
    updateProgress();
    updatePrice();

    sections.forEach((section) => {
        const buttons = section.querySelectorAll(".option");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                // Controleer of de knop een "vergelijk" knop is
                if (button.dataset.card === "income") {
                    console.log("Vergelijk-knop geklikt: Geen impact op voortgangsbalk.");
                    return;
                }

                // Deselecteer alle knoppen in de huidige sectie
                buttons.forEach((btn) => btn.classList.remove("selected"));

                // Markeer de geklikte knop als geselecteerd
                button.classList.add("selected");

                // Controleer of de sectie nieuw voltooid is
                if (!section.dataset.completed) {
                    section.dataset.completed = "true"; // Markeer sectie als voltooid
                    completedSteps++;
                    localStorage.setItem("completedSteps", completedSteps); // Opslaan
                }

                // Update voortgang en prijs
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
        currentPrice = 0; // Reset prijs
        sections.forEach((section) => {
            const selectedButton = section.querySelector(".option.selected");
            if (selectedButton) {
                const card = selectedButton.closest(".card4");
                const priceElement = card?.querySelector(".prijs");
                if (priceElement) {
                    const priceText = priceElement.textContent.match(/[\d.,]+/);
                    if (priceText) {
                        const price = parseFloat(priceText[0].replace(",", "."));
                        currentPrice += price;
                    }
                }
            }
        });
        localStorage.setItem("currentPrice", currentPrice.toFixed(2)); // Opslaan
        if (priceElement) priceElement.textContent = currentPrice.toFixed(2);
    }
});
