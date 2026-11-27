import {filter_cards , restore_filters ,fill_edit_member_select , fill_member_select,fill_assignees , reset_btn, selected_card_id, handletaskform, retry_btn, resolve, reject, filter_targets } from './ui.js';
import { fetchcards, modif_card } from './api.js';

// let local_propertie_value = "high"
// const local_propertie_key = "propertie" 
// localStorage.setItem(local_propertie_key , local_propertie_value)




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
        status: document.querySelector('#edit-status').value,
        assignee: document.querySelector('#edit-assignee').value
    };
    try {
        Swal.fire({
            didOpen : () => {
                    Swal.showLoading();
    }})
        await modif_card(selected_card_id, updated_card);
        edit_modal.classList.add('hidden');
        // let Response = await fetchcards()
        await filter_cards()
        Swal.close();
        //  document.querySelector('#todo-cards').innerHTML = ""
        // document.querySelector('#progress-cards').innerHTML = ""
        // document.querySelector('#done-cards').innerHTML = ""
        
    // resolve(Response.data)
        }
     catch (error) {
        Swal.close();
        reject()
        console.log(error);
        
        
    }
});



fill_edit_member_select()
fill_member_select()
await fill_assignees()
restore_filters()
filter_targets()
reset_btn()
retry_btn(fetchcards)
handletaskform()



