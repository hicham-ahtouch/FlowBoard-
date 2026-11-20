
// import { state, affichage_cards } from './ui.js';
//  export  function fetchcards() {

//     // document.querySelector('#loading').classList.remove('hidden');

//     Swal.fire({ 
//                 title : 'loading cards...',
//                 text : 'please wait...',
//                 allowOutsideClick: false,
//                 didOpen : () => {
//                     Swal.showLoading();
//     }})
//     fetch('https://flowboard-api-virid.vercel.app/cards')
//         .then(Response => {
//             if (Response.ok === false) {
//                 throw new Error('something went wrong!!!')
//             }
//             return Response.json()
//         })
//         .then(data => {
//             state.cards = data;
//             affichage_cards(state.cards )
//             Swal.close();

//             document.querySelector('#err-affichage').classList.add('hidden')
//         })
//         .catch(error200 => {
//             Swal.close();
//             document.querySelector('#err-affichage').classList.remove('hidden');
//             console.log(error200);

//         })
// }

// fetchcards()
// retry_btn(fetchcards)
// handletaskform()
export async function fetchcards() {
    return await axios.get('https://flowboard-api-virid.vercel.app/cards' ,{
         headers: {
            'X-Workspace': 'hicham'
        },
        password: "1234"
    });
}

export async function getCard(id) {
    return await axios.get('https://flowboard-api-virid.vercel.app/cards/' + id ,{
        headers: {
            'X-Workspace': 'hicham'
        },
        password: "1234"
    })
}
export async function modif_card(id, data) {
    const Response = await axios.put('https://flowboard-api-virid.vercel.app/cards/' + id, data, {
        headers: {
            'X-Workspace': 'hicham'
        },
        params: {
            password: "1234"
        }
    })
    console.log(Response.data);
    return Response.data;
    
}

export async function status_card(id, status) {
    const Response = await axios.patch('https://flowboard-api-virid.vercel.app/cards/' + id, {status}, {
        
        headers: {
            'X-Workspace': 'hicham'
        },
        params: {
            password: "1234"
        }
    });

    return Response.status;
}
// status_card(2, "done")
// .then(Response => console.log(Response))
// .catch(error => console.log(error)
// )


export async function delete_card(id) {
    const Response = await axios.delete('https://flowboard-api-virid.vercel.app/cards/' + id , {
         headers: {
            'X-Workspace': 'hicham'
        },
        params: {
            password: "1234"
        }
    })
    return Response.data;
}
//named paramms
export async function reset_cards() {
    const Response = await axios.post('https://flowboard-api-virid.vercel.app/reset', {},
        {
        headers: {
            'X-Workspace': 'hicham'
        },
        params:{
            password : "1234"
        }
    })

    return Response.data;

// const options = {
//   method: 'POST',
//   url: 'https://flowboard-api-virid.vercel.app/reset?password=1234',
//   headers: {
//     'X-Workspace': 'hicham'
//   }
// }

// try {
//   const { data } = await axios.request(options)
//   console.log(data)
// } catch (error) {
//   console.error(error)
// }
}


