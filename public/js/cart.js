const botonEliminar = document.querySelector('.miBotonEliminar');
const botonComprar = document.querySelector('.miBotonComprar');
const producto = document.querySelectorAll('.titulo');
if(producto.length === 0){
    botonComprar.disabled = true;
}


const EliminarProducto = async (event, cart) => {
    const button = event.currentTarget;
    console.log(button);
    const cartId = button.dataset.id;
    console.log("carrito " + cartId);
    await fetch(`/api/carts/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Productos eliminados");
    location.reload();

        
}
const ComprarCarrito = async (event) => {
    const button = event.currentTarget;
    const cartId = button.dataset.id;
    const comprado = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('comprano:' + comprado)
    alert("Perfecto te enviaremos un email para continuar")
   
    
    location.reload();

        
}
botonEliminar.addEventListener('click', EliminarProducto);
botonComprar.addEventListener('click', ComprarCarrito);
