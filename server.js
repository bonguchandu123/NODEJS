// console.log("")
// console.log(global)



const os = require('os')
const path = require('path')
// const math = require('./math') // or 
const {add,mult,div,sub} = require('./math')
const { fileURLToPath } = require('url')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())


// console.log(__dirname)
// console.log(__filename)


// console.log(path.dirname(__dirname))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

console.log(path.parse(__dirname))


console.log(add(1,2))


// missing some js apis like fetch 