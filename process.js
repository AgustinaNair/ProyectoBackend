// import { Command } from "commander";

// const program = new Command();

// program
//   .option('-d', 'Variable para debug', false)
//   .option('-p <port>', 'Puerto del servidor', 8080)
//   .option('--mode <mode>', 'Modo de trabajo de mi server', 'producction')
//   .option('-u <user>', 'Usuarioutilizando el aplicativo', 'No se ha declarado user')
//   .option('-l, --letters [letters...]', 'specify letter')
//   .parse()
// // node process.js -d -p 3000 --mode development -u root --letters a b s 
//  console.log('Options: ', program.opts())
//  console.log('Argumentos: ', program.args)

process.on('exit', code => {
  console.log(`About to exit with code: ${code}`);
})
process.on('uncaughtException', err => {
  console.log(`Caught exception: ${err}`);
})
// process.on('message', message=>{
//   console.log('mandar a otro proceso')
// }) 

// procesos hijos



