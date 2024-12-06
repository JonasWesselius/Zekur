const compareButtons = document.querySelectorAll('.option[data-card="income"]');
const comparisonContainer = document.getElementById('comparison-container');
const comparisonCards = document.getElementById('comparison-cards');

let comparedItems = []; 

compareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card4');
        const cardId = card.id; 

      
        const cardIndex = comparedItems.findIndex(item => item.id === cardId);

        if (cardIndex === -1) {
           
            if (comparedItems.length < 3) {
                comparedItems.push({ id: cardId, element: card });
                addCardToComparison(card, cardId); 
                button.textContent = "Verwijderen"; 
            } else {
                alert('Je kunt maximaal 3 pakketten vergelijken.');
            }
        } else {
           
            comparedItems.splice(cardIndex, 1);
            removeCardFromComparison(cardId);
            button.textContent = "Vergelijken"; 
        }

        
        comparisonContainer.classList.toggle('hidden', comparedItems.length === 0);
    });
});


function addCardToComparison(card, cardId) {
   
    const existingCard = comparisonCards.querySelector(`[data-card-id="${cardId}"]`);
    if (!existingCard) {
        const clone = card.cloneNode(true); 
        clone.dataset.cardId = cardId;
        const removeButton = clone.querySelector('.option[data-card="income"]');
        removeButton.textContent = 'Verwijderen'; 

    
        removeButton.addEventListener('click', () => {
            comparedItems = comparedItems.filter(item => item.id !== cardId); 
            removeCardFromComparison(cardId);
            comparisonContainer.classList.toggle('hidden', comparedItems.length === 0); 
            
            const originalButton = card.querySelector('.option[data-card="income"]');
            originalButton.textContent = 'Vergelijken';
        });

        clone.classList.add('comparison-card');
        comparisonCards.appendChild(clone); 
    }
}


function removeCardFromComparison(cardId) {
    const comparisonCard = comparisonCards.querySelector(`[data-card-id="${cardId}"]`);
    if (comparisonCard) {
        comparisonCards.removeChild(comparisonCard);
    }
}
