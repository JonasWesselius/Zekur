document.addEventListener("DOMContentLoaded", () => {
    const dropdown1 = document.querySelector("#aanvullend .dropdown-title");
    const content1 = document.querySelector("#aanvullend .dropdown-content");
    const dropdown2 = document.querySelector("#tandarts .dropdown-title");
    const content2 = document.querySelector("#tandarts .dropdown-content");
    const nextButton = document.querySelector("#volgende");

    // Set initial state: First dropdown open, second closed
    content1.style.display = "block";
    content2.style.display = "none";

    // Add manual toggle functionality for the first dropdown
    dropdown1.addEventListener("click", () => {
        content1.style.display = content1.style.display === "block" ? "none" : "block";
    });

    // Add manual toggle functionality for the second dropdown
    dropdown2.addEventListener("click", () => {
        content2.style.display = content2.style.display === "block" ? "none" : "block";
    });

    // Handle the "next" button click
    nextButton.addEventListener("click", () => {
        content1.style.display = "none"; // Close the first dropdown
        content2.style.display = "block"; // Open the second dropdown
    });
});