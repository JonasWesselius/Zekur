const mainNavLinks = document.querySelectorAll(".main-header .navigation a");
const secondaryHeader = document.getElementById("secondary-header");
const secondaryContent = document.getElementById("secondary-content");

// Map for dynamic secondary content
const secondaryContentMap = {
    verzekering: `
        <li><a href="#zorg" data-section="zorg">Zorg</a></li>
        <li><a href="#wonen" data-section="wonen">Wonen</a></li>
        <li><a href="#op-weg" data-section="op-weg">Op weg</a></li>
        <li><a href="#ondernemen" data-section="ondernemen">Ondernemen</a></li>
    `,
    "over-zekur": `
        <li><a href="#visie" data-section="visie">Onze Visie</a></li>
        <li><a href="#missie" data-section="missie">Onze Missie</a></li>
        <li><a href="#waarden" data-section="waarden">Onze Waarden</a></li>
    `,
    klantenservice: `
        <li><a href="#faq" data-section="faq">FAQ</a></li>
        <li><a href="#contact" data-section="contact">Contact</a></li>
        <li><a href="#support" data-section="support">Support</a></li>
    `,
};

// Function to set the active link
const setActiveLink = (links, section) => {
    links.forEach((link) => {
        if (link.dataset.section === section) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

// Function to toggle secondary header visibility
const toggleSecondaryHeader = (section) => {
    if (secondaryContentMap[section]) {
        secondaryContent.innerHTML = secondaryContentMap[section];
        secondaryHeader.classList.add("active");

        // Add event listeners to the new secondary links
        const secondaryLinks = secondaryContent.querySelectorAll("a");
        setActiveLink(secondaryLinks, section); // Set default active link
        secondaryLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const subSection = link.dataset.section;
                setActiveLink(secondaryLinks, subSection); // Highlight clicked link
            });
        });
    } else {
        secondaryHeader.classList.remove("active");
    }
};

// Initialize active state and content on page load
document.addEventListener("DOMContentLoaded", () => {
    const currentSection = window.location.hash.slice(1) || null; // Default: null (no section active)
    if (currentSection && secondaryContentMap[currentSection]) {
        setActiveLink(mainNavLinks, currentSection);
        toggleSecondaryHeader(currentSection);
    }

    // Add click event listeners to main navigation
    mainNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            setActiveLink(mainNavLinks, section);
            toggleSecondaryHeader(section);
        });
    });
});
