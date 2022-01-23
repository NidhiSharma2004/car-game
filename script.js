var gameroad = document.querySelector(".gameroad");



// on click on startbtn show the road and hide start btn
// and show the road
// move the lines on road

function showroad(){
    var startbtn = document.querySelector(".startbtn");
    startbtn.classList.toggle("hide");
    gameroad.classList.toggle("show")
}
// lines function
// we want only 6 lines so we run loop for less than 7 times
// now we create a div and set the class and give style in css
for(x=0;x<6;x++){
    var div = document.createElement("div");
    div.setAttribute("class","lines");
    div.style.top = x*150 + "px";
    gameroad.appendChild(div)
}