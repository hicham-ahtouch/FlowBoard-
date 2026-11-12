
import { affichage_cards, handletaskform } from './ui.js';

fetch('https://flowboard-api-virid.vercel.app/cards')
.then(Response => Response.json())
.then(data => affichage_cards(data))

