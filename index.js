// const express = require("express"); // old method. doesnt work with "type": "module",
import express from "express"; //ES6 method, but must add "type": "module", in package.json file
import http from "http"; //http => express but in-built to node
import {Server} from "socket.io";

/* in terminal, in node-cursor-party folder, type 'npm run watch', open tabs at 'localhost:3000', ctrl+C to quit terminal programs */

/* set up socket.io + server connection*/
const app = express(); // use app.xyz to do all express stuff
const httpServer = http.createServer(app);
const io = new Server(httpServer);

/* set up the express app */
io.on("connection", function(socket){
    //will trigger
    // console.log("new friend connected! :)");
    socket.on("move-mouse", function(mouseData){
        // console.log(mouseData);
        socket.broadcast.emit("update-mouse-pos-for-everyone", mouseData);
        // console.log(socketID + " moved...")
    });
});

/* start hosting a web server */
const port = 3000;
httpServer.listen(port, function(){
    console.log("things happening at port " + port);
}); //listen- listening to a port in your computer

/* host some front-end HTMLCSS JS */
app.use(express.static("public")); // use- load in middleware, when someone connects to server without specific routing, serve whatevers inside folder named public

console.log("hi, this is node");