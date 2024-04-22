// const button = document.getElementById('buscar-products')

// button.addEventListener('click', async(e) =>{
//     const respuesta = await fetch('/api/products')
//     const data = await respuesta.json()
//     console.log(data)
// })













// const socket = io()
// const productos = document.getElementById('productos')
// const noteForm = document.querySelector("#noteForm");
// const title = document.querySelector("#title");
// const description = document.querySelector("#description");
// const price = document.querySelector("#price");
// const code = document.querySelector("#code");
// const stock = document.querySelector("#stock");
// const category = document.querySelector("#category");

// socket.on("server:newnote", appendNote);

// noteForm.addEventListener('submit', async(e) =>{
//     e.preventDefault();
//     // const respuesta = await fetch('/api/products') 
//     // const data = await respuesta.json()
//     // console.log(data)
//     if (savedId) {
//         updateNote(savedId, title.value, description.value, price.value, code.value, stock.value, category.value);
//       } else {
//         saveNote(title.value, description.value, price.value, code.value, stock.value, category.value);
//       }
    
//       title.value = "";
//       description.value = "";
//       price.value = "",
//       code.value = "",
//       stock.value = "",
//       category.value = ""
    
//       title.focus();
// })



















// socket.on('producto-agregado', producto=>{
//     const productoElement = document.createElement('div');
//                     productoElement.innerHTML = `
//                         <h3>${producto.title}</h3>
//                         <p>Precio: ${producto.price}</p>
//                         <p>Descripción: ${producto.description}</p>`
//     productos.appendChild(productoElement)

//     // aca poner para que se vea en el html todo
// })
// const button = document.getElementById('submit')
// button.addEventListener('click', async(e) =>{
//     const respuesta = await fetch('/api/products')
//     const data = await respuesta.json()
//     console.log(data)
// })