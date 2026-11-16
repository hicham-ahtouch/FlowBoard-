import { affichage_cards, handletaskform, retry_btn, resolve } from './ui.js';
import { fetchcards } from './api.js';


const cards = await fetchcards();
console.log(cards.data);
try {
    resolve(cards)
} catch (error) {
   reject()
}



function addtask(task) {
    console.log(task);

}

retry_btn(fetchcards)
handletaskform(addtask)