
import { state, affichage_cards, handletaskform, retry_btn } from './ui.js';
function fetchcards() {

    document.querySelector('#loading').classList.remove('hidden');

    fetch('https://flowboard-api-virid.vercel.app/cards')
        .then(Response => {
            if (Response.ok === false) {
                throw new Error('something went wrong!!!')
            }
            return Response.json()
        })
        .then(data => {
            state.cards = data;
            affichage_cards(state.cards )
            document.querySelector('#loading').classList.add('hidden')
            document.querySelector('#err-affichage').classList.add('hidden')
        })
        .catch(error200 => {
            document.querySelector('#loading').classList.remove('hidden')
            document.querySelector('#err-affichage').classList.remove('hidden');
            console.log(error200);

        })
}

fetchcards()
retry_btn(fetchcards)
handletaskform()