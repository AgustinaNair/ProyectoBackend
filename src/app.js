import express from 'express'
// import ProductManager from './ProductManager.js'
import productsRouter from './routes/products.router.js'
import cartsRoutes from './routes/carts.router.js'
import { uploader } from './utils.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('src/public'))

// app.get('/', (req,res) => res.send('Bienvenidos'))
app.use('/subir-archivo', uploader.single('myFile'), (req,res)=>{
    if (!req.file){
        return res.send('no se pudo subir el archivo')
    }
    res.send('archivo subido')
})

app.use('/api/products', productsRouter)

app.use('api/carts', cartsRoutes)

app.use((error, req, res, next ) =>{
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

app.listen(8080, error =>{
    if(error) console.log(error)
    console.log('server escuchando en el puerto 8080')})

    // {
    //     "title":"producto prueba cambiado",
    //     "description":"Este es un producto cambiado de prueba", 
    //     "price":"222", 
    //     "thumbnail": "Sin imagen",
    //     "code":"abc12345", 
    //     "stock":"2545" 
    //  }