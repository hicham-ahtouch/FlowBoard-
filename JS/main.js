import { cards , affichage_cards, handletaskform, retry_btn, resolve , reject } from './ui.js';
import { fetchcards, getCard } from './api.js';

try {
    const cards = await fetchcards();
    resolve(cards.data)
    // document.querySelector('#err-affichage').classList.remove('hidden')
} catch (error) {
   reject()
}

async function modify(id) {
    try {
        const response = await getCard(id);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}



retry_btn(fetchcards)
handletaskform()