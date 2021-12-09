const { createServer } = require("http");
const next = require("next");
const express = require("express");
const app = express();
require("dotenv").config({
    path: './config.env'
})
require('./utilServer/database');
const Port = process.env.PORT || 5000;
const server = createServer(app);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(()=>{
    
    app.use(express.json())
    app.use('/api',require('./routes/apiRoutes'))
    app.all('*',(req,res)=>{
        return handle(req,res)
    })
    server.listen(Port,(err)=>{
        if (err) throw err;
        console.log(`server started listening at ${Port}`) 
    })
}).catch(err=>{
    throw err
})