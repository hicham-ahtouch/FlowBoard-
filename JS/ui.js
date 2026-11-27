
import { clear_filters,save_filters, get_filters } from "./store.js"
import { fetch_members, add_card, reset_cards, delete_card, getCard, status_card, fetchcards } from "./api.js"
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

        let assignee = document.createElement('p');
        assignee.textContent = element.assignee;

        let btn_modif = document.createElement('button');
        let cancel_btn = document.querySelector('#cancel-edit')
        let btn_delete = delete_btn(element);
        let edit_modal = document.querySelector('#edit-modal')
        // let edit_form = document.querySelector('#edit-form')

        btn_delete.addEventListener('click', function () {

        })

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
            document.querySelector('#edit-assignee').value = data.assignee
        });
        let status_container = document.createElement('div');
        status_container.className = "flex items-center gap-9"

        let select_status = select_card_status(element);
        status_container.appendChild(select_status.select);
        status_container.appendChild(select_status.change);

        card.appendChild(btn_delete);
        card.appendChild(status_container)
        card.appendChild(priority);
        card.appendChild(title);
        card.appendChild(assignee);
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
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        let title = document.querySelector('#title').value
        let priority = document.querySelector('#priority').value
        let status = document.querySelector('#status').value
        let assignee = document.querySelector('#assignee').value

        if (title === "" || priority === "" || status === "") {
            alert('svp remplir tous les champs')
            return;
        }
        const newtask = {
            title: title,
            priority: priority,
            status: status,
            assignee: assignee
        };
        // the_new_task(newtask)
        // console.log(newtask);

        // cards.push(newtask)
        // console.log(cards);
        try {
            await add_card(newtask);

            document.querySelector('#todo-cards').innerHTML = ""
            document.querySelector('#progress-cards').innerHTML = ""
            document.querySelector('#done-cards').innerHTML = ""

            let Response = await fetchcards();
            let new_cards = Response.data
            affichage_cards(new_cards);
            fill_assignees();

            form.classList.add('hidden');
            form.reset();
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            Swal.fire("Error!", "could not add the card.", "error");
        }
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
                    didOpen: () => {
                        Swal.showLoading();
                    }
                })
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
    })
}

function select_card_status(element) {
    let select = document.createElement('select');
    select.className = "bg-white px-3 py-2 rounded-lg ";

    // let Default = document.createElement('option')
    // Default.textContent = "choose the status"
    // Default.value = "";
    // // Default.selected = true;
    // // Default.disabled = true;

    let todo = document.createElement('option');
    todo.value = "todo";
    todo.textContent = "To Do";
    todo.className = "bg-yellow-500";

    let progress = document.createElement('option');
    progress.value = "in-progress";
    progress.textContent = "In Progress";
    progress.className = "bg-green-500 ";

    let done = document.createElement('option');
    done.value = "done";
    done.textContent = "Done";
    done.className = "bg-red-500 ";

    let change = document.createElement('button');
    change.textContent = "Confirm change";
    change.type = "button";
    change.className = "bg-blue-600 text-white px-2 py-1 text-xs rounded";


    // select.appendChild(Default)
    select.appendChild(todo)
    select.appendChild(progress)
    select.appendChild(done)

    select.value = element.status

    // select.addEventListener('change', function () {
    //     console.log(select.value);
    // })
    if (todo.value === element.status) {
        todo.disabled = true;
    }
    else if (progress.value === element.status) {
        progress.disabled = true
    }
    else {
        done.disabled = true;
    }
    change.addEventListener('click', async function () {
        console.log(select.value);
        console.log(element.id);
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            }
        })
        try {
            await status_card(element.id, select.value)
            console.log("success");
            await filter_cards();
            // let Response = await fetchcards()

            // document.querySelector('#todo-cards').innerHTML = "";
            // document.querySelector('#progress-cards').innerHTML = "";
            // document.querySelector('#done-cards').innerHTML = "";

            // affichage_cards(Response.data);
            Swal.close();
        } catch (error) {
            Swal.close()
            Swal.fire("error", "We couldnt update the card", "error")
        }
    })
    return { select, change }
}

function delete_btn(element) {
    let delete_btn = document.createElement('button')
    delete_btn.textContent = "delete"
    delete_btn.type = "button"
    delete_btn.className = "bg-red-500 px-2 py-1 font-bold rounded"

    delete_btn.addEventListener('click', async function () {
        let result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this card!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel"
        });
        if (result.isConfirmed === true) {
            try {
                console.log(element.id);
                await delete_card(element.id);
                await filter_cards();
                // let Response = await fetchcards()
                // document.querySelector('#todo-cards').innerHTML = "";
                // document.querySelector('#progress-cards').innerHTML = "";
                // document.querySelector('#done-cards').innerHTML = "";

                // affichage_cards(Response.data)

                Swal.fire("Deleted!", "the card has been deleted.", "success");
            } catch (error) {
                console.log(error);

                Swal.fire("Error!", "could not delete the card.", "error");
            }
        }
    })
    return delete_btn;
}
export function reset_btn() {
    let reset_button = document.querySelector('#reset_btn')
    reset_button.addEventListener('click', async function () {
        let result = await Swal.fire({
            title: "Are you sure?",
            text: "This will reset all cards and members!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reset",
            cancelButtonText: "Cancel"
        })
        if (result.isConfirmed === true) {
            clear_filters()
            await reset_cards();
            let Response = await fetchcards();

            document.querySelector('#todo-cards').innerHTML = "";
            document.querySelector('#progress-cards').innerHTML = "";
            document.querySelector('#done-cards').innerHTML = "";
            affichage_cards(Response.data);
        }
    })
}

export async function filter_cards() {

    save_filters()
    let response = await fetchcards();
    let cards = response.data;

    let search_text = document.querySelector('#search').value.toLowerCase();
    let selected_priority = document.querySelector('#filter-priority').value;
    let selected_assignee = document.querySelector('#filter-assignee').value;
    // console.log(selected_priority);
    // console.log(selected_assignee);
    // console.log(search_text);

    let filtered_cards = cards.filter(element => {
        let matches_search = element.title.toLowerCase().includes(search_text);
        let matches_priority = selected_priority === "" || element.priority === selected_priority;
        let matches_assignee = selected_assignee === "" || element.assignee === selected_assignee;

        return matches_search && matches_priority && matches_assignee;
    });

    // console.log(filtered_cards);
    document.querySelector('#todo-cards').innerHTML = "";
    document.querySelector('#progress-cards').innerHTML = "";
    document.querySelector('#done-cards').innerHTML = "";

    affichage_cards(filtered_cards);
}

export function filter_targets() {
    let search = document.querySelector('#search')
    search.addEventListener('input', filter_cards)
    let priority = document.querySelector('#filter-priority')
    priority.addEventListener('change', filter_cards)
    let assigne = document.querySelector('#filter-assignee')
    assigne.addEventListener('change', filter_cards)
}

export async function fill_assignees() {
    let response = await fetchcards();
    let cards = response.data;

    let select = document.querySelector('#filter-assignee');
    select.innerHTML = '<option value="">les assignes</option>';

    let names = [];

    cards.forEach(card => {
        let name = card.assignee;

        if (!names.includes(name)) {
            names.push(name);
        }
    });
    names.forEach(name => {
        let option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
}

export async function fill_member_select() {
    let Response = await fetch_members();
    let memebers_names = Response.data
    let select = document.querySelector('#assignee');

    memebers_names.forEach(member => {
        let option = document.createElement('option');
        option.value = member.name;
        option.textContent = member.name;
        select.appendChild(option);
    });
}
export async function fill_edit_member_select() {
    let Response = await fetch_members();
    let memebers_names = Response.data
    let select = document.querySelector('#edit-assignee');

    memebers_names.forEach(member => {
        let option = document.createElement('option');
        option.value = member.name;
        option.textContent = member.name;
        select.appendChild(option);
    });
}

export function restore_filters() {
    let filters = get_filters();
    // console.log( filters);
    document.querySelector('#filter-priority').value = filters.priority;
    document.querySelector('#filter-assignee').value = filters.assignee;
    document.querySelector('#search').value = filters.q;
    filter_cards();
}