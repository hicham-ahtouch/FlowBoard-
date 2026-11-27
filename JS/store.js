// let local_propertie_value = "high"
// const local_propertie_key = "propertie" 
// localStorage.setItem(local_propertie_key , local_propertie_value)
// // console.log(localStorage.getItem(local_propertie_key));
// document.addEventListener('DOMContentLoaded' ,() =>{
//     console.log(localStorage.getItem(local_propertie_key));
// })


const local_propertie_key = "flowboard:filters";

export function save_filters() {
    let filters = {
        priority: document.querySelector('#filter-priority').value,
        assignee: document.querySelector('#filter-assignee').value,
        q: document.querySelector('#search').value
    };

    localStorage.setItem(local_propertie_key, JSON.stringify(filters));
}

export function get_filters() {
    let filters = localStorage.getItem(local_propertie_key);
// in case is the first time visit
    if (filters === null) {
        return {
            priority: "",
            assignee: "",
            q: ""
        };
    }
    return JSON.parse(filters);
}