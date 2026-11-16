import { state, affichage_cards, handletaskform, retry_btn } from './ui.js';
import { fetchcards } from './api.js';


affichage_cards(state.cards)
fetchcards()
retry_btn(fetchcards)
handletaskform()