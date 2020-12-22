// const myfs = require('fs')
// myfs.writeFileSync('hello')

const chalk = require('chalk');
 
console.log(chalk.yellow('Hello'));

// console.log(process.argv)

// x= process.argv[2]
// y= process.argv[4]
// op=process.argv[3]
// switch(op){
//   case '+':console.log(+x + +y);break
// }

//myWork
// console.log(process.argv)
// x= process.argv[2]
// y= process.argv[4]
// task=process.argv[2]
// switch(task){
//   case 'edit':console.log("task edited");break
//   case 'add':console.log("task added");break
// }


// customers=[]
// const yargs = require('yargs')
// yargs.command({
//   command:'add',
//   describe:'add new',
//   builder:{
//     tasktitle:{
//       type:'string',
//       demandOption:true,
//       describe:'description'
//     },
//     taskContent:{
//       type:'string'
//     }
//     },
//     handler(argv){
//       customers.push({title:argv.tasktitle ,content:argv.taskContent})
//       // console.log(argv.taskContent)
      
//     }
//   }
// )

// yargs.parse()

// console.log(customers)



customers=[]
const yargs = require('yargs')
yargs.command({
  command:'add',
  describe:'add new Customer',
  builder:{
    customerName:{
     
      demandOption:true,
      describe:'description'
    },
    customerBalance:{
      type:'number'
    }
    },
    handler(argv){

      customers.push({Name:argv.customerName ,Balance:argv.customerBalance})
      
    }
  }
)

yargs.parse()

console.log(customers)