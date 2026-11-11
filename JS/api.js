
import { affichage_cards } from './ui.js';

fetch('https://flowboard-api-virid.vercel.app/cards')
.then(Response => Response.json())
.then(data => affichage_cards(data))

function handletaskform(){
    const add_btn = document.querySelector('#add-task')
    const cancelBtn = document.querySelector('#cancel-task')
    const form = document.querySelector('#task-form')

    add_btn.addEventListener('click', function(){
        form.classList.remove('hidden');
    });
    cancelBtn.addEventListener('click', function(){
        form.classList.add('hidden')
    });
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let title = document.querySelector('#title').value
        let priority = document.querySelector('#priority').value
        let status = document.querySelector('#status').value

        if(title ==="" || priority === "" || status === ""){
            alert('svp remplir tous les champs')
            return;
        }
        const newtask = {
            title: title,
            priority : priority,
            status: status
        };
        console.log(newtask);
        
        form.reset();
    });

}
handletaskform()