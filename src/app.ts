import express from "express";


import cookieParser from "cookie-parser";

const server = express();

server.use(cookieParser());
server.use(express.json());



export default server;