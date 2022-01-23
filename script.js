let gameroad = document.querySelector(".gameroad");
let player = {speed:5}
let keys= {ArrowUp:"false",ArrowDown:"false",ArrowLeft:"false",ArrowRight:"false"}

// on click on startbtn show the road and hide start btn
// and show the road
// move the lines on road

function showroad(){
    let startbtn = document.querySelector(".startbtn");
    startbtn.classList.toggle("hide");
    gameroad.classList.toggle("show");
    let road = gameroad.getBoundingClientRect();
    console.log(road)
    // setTimeout(gameplay,500)
}
// lines function
// we want only 6 lines so we run loop for less than 7 times
// now we create a div and set the class and give style in css
// now every div will started from top so 1st div index 0 and top also 0; but jaise
// index increase hoga ex.1,2,3 vasie hi top se value bhi increase hogi so that overlaping na ho
for(x=0;x<6;x++){
    let roadlines = document.createElement("roadlines");
    roadlines.setAttribute("class","lines");
    roadlines.y = x*150
    roadlines.style.top = roadlines.y + "px";
    gameroad.appendChild(roadlines);
}

//main function
function gameplay(){
    movelines();
    requestAnimationFrame(gameplay);
}
//move the lines
//first select all the lines and run for each mthond on lines and added a value
//and give the direction that is top and also give condition if y axis se ye 875px 
//chla jaye means height 875 ho jaye to isne se -900 kr do taki ye vapis top pr chla jaye 
function movelines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(line){
        if(line.y>=875){
            line.y -= 900
        }
        line.y += player.speed
        line.style.top= line.y + "px"
    })
}
//keys
// firstof all we have to know that ki user konsi ki press kr rha ho or konsi release kr rha hai 
// we add 2 event lisetener for down the key and release the key

document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);

//now define the function keydown and keyup
function keyDown(e){
    keys[e.key]=true
}
function keyUp(e){
    keys[e.key]=false
}
window.requestAnimationFrame(gameplay);


