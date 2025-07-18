const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

// custom middle ware 

app.use((req,res,next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

// built in middleware
app.use(express.urlencoded({extended:false})) //handle urlencoded data
app.use(express.json()) //for json 
app.use(express.static(path.join(__dirname,'/public')))

// Serve index.html for "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve index.html for "/index" and "/index.html"
// app.get(['/index', '/index.html'], (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// Serve new-page.html for "/new-page" and "/new-page.html"
// app.get(['/new-page', '/new-page.html'], (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get('/*',(req,res) => {
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'))
// })

// app.get('/hello.html',(req,res,next) => {
//     console.log('attempted to load hello.html')
//     next()
// },(req,res) => {
//     res.send('hello world')
// })


const one = (req,res,next) => {
    console.log('one')
    next()
}

const two = (req,res,next) => {
    console.log('two')
    next()
}

const three = (req,res,next) => {
    console.log('three')
    next()
}

app.get('/chain.html',[one,two,three]);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
