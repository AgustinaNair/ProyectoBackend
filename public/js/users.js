

// // Initializers
const socket = io()

// const botonRole = document.getElementsByClassName('miBotonRole');
// const botonesAgregar = document.getElementsByClassName('miBotonAgregar');


// API calls
const cambiaRole = async (uid) => {
    await fetch(`/api/users/role/${uid}`, {
        method: 'PUT'
    });
    window.location.reload();
}
const eliminar = async (uid) => {
    console.log('h')
    await fetch(`/api/users/${uid}`, {
        method: 'DELETE'
    });
    window.location.reload();
}

// const AddProduct = async () => {
//     let idDelBoton = event.target.id;
//     logger.info("agregando al carrito este producto: " + idDelBoton);
//     await fetch(`/api/carts/663d08c69f705cc63996f3c7/product/${idDelBoton}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({quantity: 1})
//     });
//     alert("El producto se ha agregado al carrito.");
        
// }
// for (let i = 0; i < botonesDelete.length; i++) {
//     botonesDelete[i].addEventListener('click', deleteProduct);
// }
// for (let i = 0; i < botonesAgregar.length; i++) {
//     botonesAgregar[i].addEventListener('click', AddProduct);
// }
// const updateProduct = async (id) => {
//     const [form, data] = parseDatafromForm();
//     await fetch(`/api/products/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     form.reset();
// }

// const createProduct = async (e) => {
//     e.preventDefault();
//     const [form, data] = parseDatafromForm();

//     await fetch('/api/products', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     form.reset();
// }

// const getProducts = async () => {
//     const response = await fetch('/api/products');
//     return response.json();
// }

// // Websockets

// socket.on('producto-agregado', async (message) => {
//     await renderProductList();
// })

// socket.on('producto-eliminado', async (message) => {
//     await renderProductList();
// })

// socket.on('producto-actualizado', async (message) => {
//     await renderProductList();
// })

// // Utils
// const parseDatafromForm = () => {
//     const noteForm = document.getElementById('noteForm');
//     let formData = new FormData(noteForm);
//     let jsonData = {};
                            
//     formData.forEach((value, key) => {
//         jsonData[key] = value
//     });

//     return [noteForm, jsonData];
// }

