// const button = document.getElementById('buscar-products')

// button.addEventListener('click', async(e) =>{
//     const respuesta = await fetch('/api/products')
//     const data = await respuesta.json()
//     console.log(data)
// })
const socket = io()
const productos = document.getElementById('productos')

let todosLosProductos


socket.on('', producto=>{
    const productoElement = document.createElement('div');
                    productoElement.innerHTML = `
                        <h3>${producto.title}</h3>
                        <p>Precio: ${producto.price}</p>
                        <p>Descripción: ${producto.description}</p>`
    productos.appendChild(productoElement)

    // aca poner para que se vea en el html todo
})
