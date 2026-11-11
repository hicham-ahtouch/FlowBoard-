


export function affichage_cards(data) {

    data.forEach(element => {
        // console.log(element);
        let color = "";
        if(element.priority === "high"){
            color = "bg-red-500";
        }
        else if(element.priority === "medium"){
            color = "bg-yellow-500";
        }
        else if(element.priority === "low"){
            color = "bg-green-500";
        }
        
        let html = `
            <div class="bg-slate-300 my-6 flex flex-col gap-6 h-max">
            <span class= "${color} w-max px-3 py-1 rounded">${element.priority}</span>
                <p>${element.title}</p>
            </div>
        `;
        if (element.status === "todo") {
            document.querySelector('#todo-cards').innerHTML += html;
        }
        else if (element.status === "in-progress") {
            document.querySelector('#progress-cards').innerHTML += html;
        }
        else if (element.status === "done") {
            document.querySelector('#done-cards').innerHTML += html;
        }

    });
}

// function showtaskform(){
//     const form = document.querySelector('#task-form');
//     form.classList.remove('hidden');
// }
// function hidetaskform(){
//     const form = document.querySelector('#task-form');
//     form.classList.add('hidden');
// }
// function handletaskform(){
//     const add_btn = document.querySelector('#add-task')
//     const cancelBtn = document.querySelector('#cancel-task')
//     const form = document.querySelector('#form_task')

//     add_btn.addEventListener('click', function(){
//         form.classList.remove('hidden');
//     });
//     cancelBtn.addEventListener('click', function(){
//         form.classList.add('hidden')
//     });
//     form.addEventListener('submit', function(e){
//         e.preventDefault();
//         let title = document.querySelector('#title').value
//         let priority = document.querySelector('#priority').value
//         let status = document.querySelector('#status').value

//         const newtask = {
//             title: title,
//             priority : priority,
//             status: status
//         };
//         console.log(newtask);
        
//     })

// }