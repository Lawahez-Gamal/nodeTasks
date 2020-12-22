const yargs = require('yargs')
const fs= require('fs')
data = []
try{
    data = JSON.parse(fs.readFileSync('myData.json').toString())
}
catch(e)
{
    fs.writeFileSync('myData.json', "[]")
}
yargs.command({
    command: 'add',
    describe: 'add new task',
    builder:{
        taskTitle:{
            type: 'string',
            demandOption:true,
            describe:'description'
        },
        taskContent:{
            type: 'string'
        }
    },
    handler(argv){
        let id = 200
        data.push(
            {
                title:argv.taskTitle, 
                content:argv.taskContent,
                Id:++id,
                status:'pending',
                
            })
           
            console.log('Done , Task id => ' + id)
           id++
            fs.writeFileSync('myData.json', JSON.stringify(data))

    }
})


yargs.command({
    command:'read',
    handler(){
      if(data.length>0){
        console.log(data)
      }
      else{
        console.log('No dats')
      }
    }
})


yargs.command({
    command: 'edit',
    describe: 'Edit task',
    builder:{
        // taskTitle:{
        //     type: 'string',
        //     demandOption:true,
        //     describe:'description'
        // },
        // taskContent:{
        //     type: 'string'
        // },
        Tid:{
            type:'number'
        }
    },
    handler(argv){
        // if(argv.id==data.id){
        //    for(let i=0;i<data.length;i++){
        //     for(let j=0;i<data.length-1;i++) {
               

        // data.push(
        //     {
        //             title:argv.taskTitle=data[i,j], 
        //             content:argv.taskContent =data[i,j],
        //             Id:argv.id
             
        //     })
        // } 
        // }
  
        if(data.length > 0){
            for (let i=0; i < data.length; i++) {
                if (data[i].id == argv.Tid) {
                    data[i].status = 'Done';
                //    argv.taskTitle=data[1,0]; 
                //    argv.taskContent =data[1,1];
            console.log('data edited', data)
            fs.writeFileSync('myData.json', JSON.stringify(data))
        }
    }
}

    }
})

yargs.command({
    command: 'delete',
    describe: 'del task',
    builder:{
        id:{
            type:'number'
        }
    },
    handler(argv){
        if(data.length >0){
         for(let i=0;i<data.length;i++){
            if(data.id == argv.id){
                data.splice(i,1)
                console.log(data) 
                fs.writeFileSync('myData.json', JSON.stringify(data))
                }
            } 
           
            console.log('deleted')
         } 
         else console.log('no data')  
      
            

    }
})

yargs.parse()

