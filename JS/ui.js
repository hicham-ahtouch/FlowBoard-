
import { getCard } from "./api.js"
export let cards = []
export let selected_card_id;
export function affichage_cards(data) {

    data.forEach(element => {

        let color = "";

        if (element.priority === "high") {
            color = "bg-red-500";
        }
        else if (element.priority === "medium") {
            color = "bg-yellow-500";
        }
        else if (element.priority === "low") {
            color = "bg-green-500";
        }

        let card = document.createElement('div');
        card.className = "bg-slate-300 my-6 flex flex-col gap-6 h-max";

        let priority = document.createElement('span');
        priority.textContent = element.priority;
        priority.className = `${color} w-max px-3 py-1 rounded`;

        let title = document.createElement('p');
        title.textContent = element.title;

        let btn_modif = document.createElement('button');
        let cancel_btn = document.querySelector('#cancel-edit')
        let edit_modal = document.querySelector('#edit-modal')
        // let edit_form = document.querySelector('#edit-form')

        cancel_btn.addEventListener('click', function () {
            edit_modal.classList.add('hidden');
        })
        btn_modif.textContent = "Modifier";
        btn_modif.type = "button";
        btn_modif.className = "bg-gray-600 text-white px-5 py-2 rounded-lg";
        btn_modif.dataset.id = element.id;

        btn_modif.addEventListener('click', async function (e) {
            // console.log(e.currentTarget.dataset.id);
            selected_card_id = e.currentTarget.dataset.id
            edit_modal.classList.remove('hidden');
            let { data } = await getCard(selected_card_id)
            console.log(data);
            document.querySelector('#edit-title').value = data.title;
            document.querySelector('#edit-priority').value = data.priority
            document.querySelector('#edit-status').value = data.status
            document.querySelector('#edit-description').value = data.description
        });

        card.appendChild(priority);
        card.appendChild(title);
        card.appendChild(btn_modif);

        if (element.status === "todo") {
            document.querySelector('#todo-cards').appendChild(card);
        }
        else if (element.status === "in-progress") {
            document.querySelector('#progress-cards').appendChild(card);
        }
        else if (element.status === "done") {
            document.querySelector('#done-cards').appendChild(card);
        }

    });
}

const form = document.querySelector('#task-form')
export function handletaskform() {
    const add_btn = document.querySelector('#add-task')
    const cancelBtn = document.querySelector('#cancel-task')

    add_btn.addEventListener('click', function () {
        form.classList.remove('hidden');
    });
    cancelBtn.addEventListener('click', function () {
        form.classList.add('hidden')
    });
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let title = document.querySelector('#title').value
        let priority = document.querySelector('#priority').value
        let status = document.querySelector('#status').value

        if (title === "" || priority === "" || status === "") {
            alert('svp remplir tous les champs')
            return;
        }
        const newtask = {
            title: title,
            priority: priority,
            status: status
        };
        // the_new_task(newtask)
        // console.log(newtask);

        cards.push(newtask)
        console.log(cards);

        document.querySelector('#todo-cards').innerHTML = ""
        document.querySelector('#progress-cards').innerHTML = ""
        document.querySelector('#done-cards').innerHTML = ""
        affichage_cards(cards);
        form.classList.add('hidden');
        form.reset();
    });

}

export function resolve(params) {
    cards = params
    affichage_cards(cards)
    // Swal.close()
    document.querySelector('#err-affichage').classList.add('hidden')

}
export function reject() {
    document.querySelector('#err-affichage').classList.remove('hidden');
    // Swal.fire({ 
    //             title : 'loading cards...',
    //             text : 'please wait...',
    //             allowOutsideClick: false,
    //             didOpen : () => {
    //                 Swal.showLoading();
    //                 document.querySelector('#err-affichage').classList.remove('hidden')
    // }})
}

export function retry_btn(fetchcards) {
    document.querySelector('#try_again').addEventListener('click', async function () {
        {
            
            try {
                Swal.fire({
            didOpen : () => {
                    Swal.showLoading();
    }})
                let Response = await fetchcards();
                document.querySelector('#todo-cards').innerHTML = ""
                document.querySelector('#progress-cards').innerHTML = ""
                document.querySelector('#done-cards').innerHTML = ""
                resolve(Response.data);
                Swal.close();
            } catch (error) {
                Swal.close();
                reject()
            }
        }
    })}
// handletaskform()
