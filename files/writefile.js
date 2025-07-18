const fsPromises = require('fs').promises
const path = require('path');


const fileops = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname,'start.txt'),'utf8');
        console.log(data)

        await fsPromises.unlink(path.join(__dirname,'start.txt'))
        await fsPromises.writeFile(path.join(__dirname,'promises.txt'),data)
        await fsPromises.appendFile(path.join(__dirname,'promises.txt'),'\n\nNIce to meet you')
        await fsPromises.rename(path.join(__dirname,'promises.txt'),path.join(__dirname,'prom.txt'))

         const newData= await fsPromises.readFile(path.join(__dirname,'prom.txt'),'utf8');
         console.log(newData)

       


        
    } catch (error) {
        console.log(error)
        
    }
}

fileops()

// fs.writeFile(path.join(__dirname,'reply.txt'),'Nce ot mett you',(err) => {
//     if(err) throw err;

//     console.log("write complete")
//     fs.appendFile(path.join(__dirname,'reply.txt'),'\n\nYes it is.',(err) => {
//     if(err) throw err;
//     console.log("Appen complete ");
//     fs.rename(path.join(__dirname,'reply.txt'),path.join(__dirname,'new.txt'),(err) => {
//         if(err) throw err;
//         console.log('Rename complete')
//     })
// })
// fs.writeFile(path.join(__dirname,'reply.txt'),'Nce ot mett you',(err) => {
//     if(err) throw err;

//     console.log("write complete")
//     fs.appendFile(path.join(__dirname,'reply.txt'),'\n\nYes it is.',(err) => {
//     if(err) throw err;
//     console.log("Appen complete ");
// })
// })
// 

// fs.appendFile(path.join(__dirname,'test.txt'),'Testing.txt',(err) => {
//     if(err) throw err;

//     console.log("Appen complete ")
// })

// fs.writeFile(path.join(__dirname,'start.txt'),'Nce ot mett you',(err) => {
//     if(err) throw err;

//     console.log("write complete")
// })

// fs.readFile(path.join(__dirname,'start.txt'),'utf-8',(err,data) => {
//     if(err) throw err;

//     console.log(data)
// })

//  exit uncaught errors 

// process.on('uncaughtException',err =>{
//     console.error(`There was an uncaught error: ${err}`)
//     process.exit(1);
// })