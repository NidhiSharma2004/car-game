// on click on startbtn show the road and hide start btn
// and show the road
// move the lines on road

function showroad(){
    var startbtn = document.querySelector(".startbtn");
    startbtn.classList.toggle("hide");
    var gameroad = document.querySelector(".gameroad");
    gameroad.classList.toggle("show")
}