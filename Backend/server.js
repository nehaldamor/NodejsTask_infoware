import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const Port = process.env.PORT || 5000;

const server=http.createServer(app);

server.listen(Port,()=>{
    console.log(`Server is running on Port ${Port}`);
})