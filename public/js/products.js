// const button = document.getElementById('buscar-products')

// button.addEventListener('click', async(e) =>{
    //     const respuesta = await fetch('/api/products')
    //     const data = await respuesta.json()
    //     console.log(data)
    // })
    
    
    
    
    
    
    
    
    
    
    
    const socket = io()
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            socket.on('producto-agregado', producto=>{
                const productoElement = document.createElement('div');
                productoElement.innerHTML = `
                <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2 ">
                <div class="d-flex justify-content-between">
                <h1 class="card-title h3">${producto.title}</h1>
                <div>
                <button class="btn btn-danger delete" data-id=${producto.id}>delete</button>
                <button class="btn btn-secondary update" data-id=${producto.id}>update</button>
                </div>
                </div>
                <div>
                <p>${producto.description}</p>
                </div>
                </div>`
                productos.appendChild(productoElement)
                
            })
            
            socket.on('producto-eliminado', async products=>{
               const productosSubidos = document.getElementById('productos')
                productosSubidos.innerHTML =''
                products.forEach(product=>{

                    const productoElement = document.createElement('div');
                    productoElement.innerHTML = `
                    <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2 ">
                    <div class="d-flex justify-content-between">
                    <h1 class="card-title h3">${product.title}</h1>
                    <div>
                    <button class="btn btn-danger delete" data-id=${product.id}>delete</button>
                    <button class="btn btn-secondary update" data-id=${product.id}>update</button>
                    </div>
                    </div>
                    <div>
                    <p>${product.description}</p>
                    </div>
                    </div>`
                    productosSubidos.appendChild(productoElement)
                    console.log(product.id)
                })
                const deleteButtons = document.querySelectorAll('.delete')
                deleteButtons.forEach(button => {
                    button.addEventListener('click', async (e)=> {
                        const id = e.target.dataset.id;
                        
                        const respuesta = await fetch(`api/products/${id}`, {
                            method: 'DELETE'
                        })
                        
                        const data = await respuesta.json();
                        console.log(data);
                    })
                })
            })
            
            socket.on('producto-actualizado', async products=>{
                const productosSubidos = document.getElementById('productos')
                productosSubidos.innerHTML =''
                products.forEach(product=>{

                    const productoElement = document.createElement('div');
                    productoElement.innerHTML = `
                    <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2 ">
                    <div class="d-flex justify-content-between">
                    <h1 class="card-title h3">${product.title}</h1>
                    <div>
                    <button class="btn btn-danger delete" data-id=${product.id}>delete</button>
                    <button class="btn btn-secondary update" data-id=${product.id}>update</button>
                    </div>
                    </div>
                    <div>
                    <p>${product.description}</p>
                    </div>
                    </div>`
                    productosSubidos.appendChild(productoElement)
                    console.log(product.id)
                })
                const updateButtons = document.querySelectorAll('.update')
                updateButtons.forEach(button => {
                    button.addEventListener('click', async (e)=> {
                        const id = e.target.dataset.id;
                        let formData = new FormData(noteForm)
                        let jsonData = {}
                        
                        formData.forEach((value, key) => {
                            jsonData[key] = value
                        })
                        const respuesta = await fetch(`api/products/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify(jsonData),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        
                        const data = await respuesta.json();
                        console.log(data);
                    })
                })
            })
                    
    const button = document.getElementById('submit')
    const noteForm = document.getElementById('noteForm');

    button.addEventListener('click', async(e) =>{
    e.preventDefault();
    
    let formData = new FormData(noteForm)
    let jsonData = {}
    
    formData.forEach((value, key) => {
        jsonData[key] = value
    })
    
    const respuesta = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await respuesta.json()
    console.log(data)
})

const deleteButtons = document.querySelectorAll('.delete')
const updateButtons = document.querySelectorAll('.update')

deleteButtons.forEach(button => {
    button.addEventListener('click', async (e)=> {
        const id = e.target.dataset.id;
        
        const respuesta = await fetch(`api/products/${id}`, {
            method: 'DELETE'
        })
        
        const data = await respuesta.json();
        console.log(data);
    })
})

updateButtons.forEach(button => {
    button.addEventListener('click', async (e)=> {
        const id = e.target.dataset.id;
        let formData = new FormData(noteForm)
        let jsonData = {}
        
        formData.forEach((value, key) => {
            jsonData[key] = value
        })
        const respuesta = await fetch(`api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await respuesta.json();
        console.log(data);
    })
})