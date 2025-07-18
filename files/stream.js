// more efficent 

const fs = require('fs')
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname,'hi.txt'),{encoding:'utf8'});
const ws = fs.createWriteStream(path.join(__dirname,'copy.txt'))

// rs.on('data',(data) => {
//     ws.write(data)

// })

rs.pipe(ws)