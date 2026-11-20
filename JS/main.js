import {reset_btn, selected_card_id, handletaskform, retry_btn, resolve, reject } from './ui.js';
import { fetchcards, modif_card } from './api.js';

let local_propertie_value = "high"
const local_propertie_key = "propertie" 
localStorage.setItem(local_propertie_key , local_propertie_value)




try {
    const cards = await fetchcards();
    resolve(cards.data)
    // document.querySelector('#err-affichage').classList.remove('hidden')
} catch (error) {
    reject()
}


let edit_form = document.querySelector('#edit-form');
let edit_modal = document.querySelector('#edit-modal')

edit_form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let updated_card = {
        title: document.querySelector('#edit-title').value,
        description: document.querySelector('#edit-description').value,
        priority: document.querySelector('#edit-priority').value,
        status: document.querySelector('#edit-status').value
    };
    try {
        Swal.fire({
            didOpen : () => {
                    Swal.showLoading();
    }})
        await modif_card(selected_card_id, updated_card);
        edit_modal.classList.add('hidden');
        let Response = await fetchcards()
        Swal.close();
         document.querySelector('#todo-cards').innerHTML = ""
        document.querySelector('#progress-cards').innerHTML = ""
        document.querySelector('#done-cards').innerHTML = ""
        
    resolve(Response.data)
        }
     catch (error) {
        Swal.close();
        reject()
        console.log(error);
        
        
    }
});

reset_btn()
retry_btn(fetchcards)
handletaskform()


