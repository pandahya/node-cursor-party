// console.log("i get logged into the browser");
const socket = io();
const randomID = ("a" + Math.random()).replace(".", "");
const partyZone = document.querySelector("#cursor-zone");

//set up cursor tracking element
const cursorRect = document.createElement("div");
cursorRect.classList.add("cursor-rect");
partyZone.appendChild(cursorRect);

window.addEventListener("mousemove", function(event){
    //set cursor tracker position to mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    cursorRect.style.top = `${mouseY}px`;
    cursorRect.style.left = `${mouseX}px`;

    const mouseData = {
        mouseX: mouseX,
        mouseY: mouseY,
        id: randomID
    };
    socket.emit("move-mouse", mouseData);
});

socket.on("update-mouse-pos-for-everyone", function(mouseData){
    const mouseElement = document.getElementById(mouseData.id);
    if(!mouseElement){
        const newMouseElement = document.createElement("div");
        newMouseElement.id = mouseData.id;
        partyZone.appendChild(newMouseElement);
        newMouseElement.classList.add("cursor-rect");
        // newMouseElement.style.top = `${mouseY}px`;
        // newMouseElement.style.left = `${mouseX}px`;
    }else{
        mouseElement.style.top = `${mouseData.mouseY}px`;
        mouseElement.style.left = `${mouseData.mouseX}px`;
    }
});