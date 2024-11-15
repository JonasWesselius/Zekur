const mainNavLinks = document.querySelectorAll('.main-header .navigation a');
const secondaryHeader = document.getElementById('secondary-header');
const secondaryContent = document.getElementById('secondary-content');


const secondaryContentMap = {
    verzekering: `
        <li><a href="#zorg">Zorg</a></li>
        <li><a href="#wonen">Wonen</a></li>
        <li><a href="#op-weg">Op weg</a></li>
        <li><a href="#ondernemen">Ondernemen</a></li>
    `,
    'over-zekur': `
        <li><a href="#visie">Onze Visie</a></li>
        <li><a href="#missie">Onze Missie</a></li>
        <li><a href="#waarden">Onze Waarden</a></li>
    `,
    klantenservice: `
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#support">Support</a></li>
    `,
};

mainNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;

        if (secondaryContentMap[section]) {
            secondaryContent.innerHTML = secondaryContentMap[section];
            secondaryHeader.style.display = 'flex';
        } else {
            secondaryHeader.style.display = 'none';
        }
    });
});
