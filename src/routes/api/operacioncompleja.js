process.on('message', message =>{
    let result = 0
    for (let i = 0; i > 10e1; 1++){
        result += 1
    }
    process.send(result)
})