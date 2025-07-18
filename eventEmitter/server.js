const logEvents = require('./logEvents')

const http = require('http')
const EventEmitter = require('events')
const path = require('path')
const fs =require('fs')
const { fips } = require('crypto')
const fsPromises = require('fs').promises

class MyEmitter extends EventEmitter {} ;
// initialize the object 
const myEmitter = new MyEmitter()
myEmitter.on('log',(msg,fileName) => logEvents(msg,fileName))

// add listener for the log events 

const PORT = process.env.PORT || 3500;

const serverFile = async (filePath,contentType,res) => {
    try {
        const rawData = await fsPromises.readFile(filePath,
            !contentType.includes('image')?'utf8':'')
        // json data
        const data = contentType === 'application/json'?JSON.parse(rawData):rawData

        res.writeHead(filePath.includes('404.html')?404:200,{'Content-type':contentType})
        res.end(
            contentType === 'application/json'?JSON.stringify(data):data
        )
        
    } catch (error) {
        console.log(error)
         myEmitter.emit('log',`${error.name}\t${error.message}`,'errLog.txt')
        res.statusCode = 500;
        res.end()
        
    }
    
}

const server = http.createServer((req,res) => {
    console.log(req.url)
    console.log(req.method)
     myEmitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt')

    let patht;
    // if(req.url ==='/' || req.url === 'index.html'){
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type','text/html')
    //     patht=path.join(__dirname,'views','index.html')
    //     fs.readFile(patht,'utf8',(err,data) => {
    //         res.end(data)
    //     })
    // }

    //----------- another way ------//
//     switch(req.url){
//         case '/':
//             res.statusCode = 200;
//             patht = path.join(__dirname,'views','index.html')
//             fs.readFile(patht,'utf8',(err,data) => {
//                 res.end(data)
//             })
//             break;

         
//     }
// })


//  -----------next way ----------------------?

const extension = path.extname(req.url)
let contentType;

switch (extension){
    case '.css':
        contentType ='text/css'
        break
    case '.js':
        contentType ='text/javascript'
        break
    case '.json':
        contentType ='application/json'
        break
    case '.txt':
        contentType ='text/plain'
        break
    default: 
    contentType = 'text/html'    
}

//  --------chain ternery statements

let filePath = contentType === 'text/html' && req.url ==='/'?
path.join(__dirname,'views','index.html'): contentType==='text/html'&& req.url.slice(-1) ==='/'
? path.join(__dirname,'views',req.url,'index.html'):contentType === 'index.html'? path.join(__dirname,'views',req.url):
path.join(__dirname,req.url)


if(!extension && req.url.slice('/') !== '/')  filePath+='.html'
const fileExists = fs.existsSync(filePath)


if(fileExists){
    // serve the file 
    serverFile(filePath,contentType,res)
}else{
    //  404
    // 301 redirect 
    // console.log(path.parse(filePath))

    switch(path.parse(filePath).base){
        case 'old-page.html':
            res.writeHead(301,{'Lcoation':'/new-page.html'})
            res.end()
            break;
        case 'www-page.html':
          res.writeHead(301,{'Lcoation':'/'})
            res.end()
            break;
        default:
            serverFile(path.join(__dirname,'views','404.html'),'text/html',res)
           

            
    }
}
})
//  mixing .html extention not required in the browser 





server.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)

})




// myEmitter.on('log',(msg) => logEvents(msg))

// setTimeout(() => {
//     // emit event 
//     myEmitter.emit('log','log event emitted')
// },2000);

// -------------------------server buildunig-----------------------------//
