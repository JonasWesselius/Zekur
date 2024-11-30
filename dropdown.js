


document.addEventListener("DOMContentLoaded", () => {
    const dropdown1 = document.querySelector("#aanvullend .dropdown-title");
    const content1 = document.querySelector("#aanvullend .dropdown-content");
    dropdown1.addEventListener("click", () => {
        content1.style.display = content1.style.display === "block" ? "none" : "block";
    });

    const dropdown2 = document.querySelector("#tandarts .dropdown-title");
    const content2 = document.querySelector("#tandarts .dropdown-content");
    dropdown2.addEventListener("click", () => {
        content2.style.display = content2.style.display === "block" ? "none" : "block";
    });
});

