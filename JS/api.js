
fetch('https://flowboard-api-virid.vercel.app/cards?status=todo')
.then(Response => Response.json())
.then(data => affichage_ToDo(data))


function affichage_ToDo(data){
    const todo_column = document.querySelector('#todo-cards')

    data.forEach(element => {
        let cart_holder = document.createElement('div')
    let cart_title = document.createElement('p')
    let cart_priority = document.createElement('span')
    cart_title.textContent = element.title
    cart_priority.textContent = element.priority
    cart_holder.classList.add("bg-slate-300","my-6")
    cart_priority.classList.add("bg-slate-500")
    todo_column.append(cart_holder)
    cart_holder.append(cart_priority)
    cart_holder.append(cart_title)
    });
// console.log(data[0].priority);
}