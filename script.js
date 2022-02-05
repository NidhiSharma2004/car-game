let gameroad = document.querySelector(".gameroad");
let car = document.querySelector(".car");
let startbtn = document.querySelector(".startbtn");
let scoreContainer = document.querySelector(".scoreContainer");
let showScore = document.querySelector(".showScore");
let scorevalue = document.querySelector("#scorevalue");
let highScore = document.querySelector(".highScore")
let player = { speed: 5, score: 0 };
let score = 0;
// on click on startbtn run startgame function

startbtn.addEventListener("click", startgame);
// lines function
// we want only 6 lines so we run loop for less than 7 times
// now we create a div and set the class and give style in css
// now every div will started from top so 1st div index 0 and top also 0; but jaise
// index increase hoga ex.1,2,3 vasie hi top se value bhi increase hogi so that overlaping na ho

for (x = 0; x < 6; x++) {
  let roadlines = document.createElement("roadlines");
  roadlines.setAttribute("class", "lines");
  roadlines.y = x * 150;
  roadlines.style.top = roadlines.y + "px";
  gameroad.appendChild(roadlines);
}

// collision detection
function iscollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return (
    aRect.top < bRect.bottom &&
    aRect.bottom > bRect.top &&
    aRect.right > bRect.left &&
    aRect.left < bRect.right
  );
}

let enemyCarArr = ["images/car1.png", "images/car3.png", "images/car4.png"];
// enemy cars
for (x = 0; x < enemyCarArr.length; x++) {
  let div = document.createElement("div");
  div.setAttribute("class", "enemyCars");
  let img = document.createElement("img");
  img.src = enemyCarArr[x];
  div.appendChild(img);
  div.y = x * 190;
  div.style.top = div.y + "px";
  gameroad.appendChild(div);
}
//keys
// firstof all we have to know that ki user window pe konsi ki press kr rha ho or konsi release kr rha hai
// we add event lisetener for down the key and specify the that if particular key is pressed then what happen
// keycode 38 for toparrow and it can find by console e .keycode

function keyfunction(e) {
  let carposition = car.getBoundingClientRect();
  if (e.keyCode == 38) {
    let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
    if (carBottom < 700) {
      car.style.bottom = carBottom + 10 + "px";
    }
  }
  if (e.keyCode == 40) {
    let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
    if (carBottom > 100) {
      car.style.bottom = carBottom - 10 + "px";
    }
  }
  if (e.keyCode == 39) {
    let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
    if (carleft < 450) {
      car.style.left = carleft + 10 + "px";
    }
  }
  if (e.keyCode == 37) {
    let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
    if (carleft > 0) {
      car.style.left = carleft - 10 + "px";
    }
  }
}

//move the lines
//first select all the lines and run for each mthond on lines and added a value
//and give the direction that is top and also give condition if y axis se ye 875px
//chla jaye means height 875 ho jaye to isne se -900 kr do taki ye vapis top pr chla jaye
function movelines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (line) {
    if (line.y >= 875) {
      line.y -= 900;
    }
    line.y += player.speed;
    line.style.top = line.y + "px";
  });
}

// move the enemyCars
//same as line move yha pr hr baar alg alg postion ke liye math functon ke use krenge
function moveCars(car) {
  let enemyCars = document.querySelectorAll(".enemyCars");
  enemyCars.forEach(function (enemyCar) {
    if (iscollide(car, enemyCar)) {
      player.start = false;
      showScore.innerHTML = `you loose <br> your score is ${score + 1}`;
      scorevalue.value = score + 1;

      setScore();
      showScore.classList.add("show");
      window.removeEventListener("keydown", keyfunction);
      showScore.addEventListener("click", () => {
        window.location.reload();
      });
    }
    if (enemyCar.y >= 875) {
      enemyCar.y -= 900;
      enemyCar.style.left = Math.ceil(Math.random() * 130) * 3 + "px";
    }
    enemyCar.y += player.speed;
    enemyCar.style.top = enemyCar.y + "px";
  });
}

// if player is true then start the animations
function gameplay() {
  if (player.start) {
    moveCars(car);
    movelines();
    requestAnimationFrame(gameplay);
    // player.score++;
    score++;
    scoreContainer.innerHTML = `your score : ${score}`;
  }
}

// startgame game fun will run only if player is true and call the function game play
// cif collisio then player will be false so don't call the game play fun

function startgame() {
  player.start = true;
  gameroad.classList.add("show");
  startbtn.classList.add("hide");
  scoreContainer.classList.add("show");
  highScore.classList.add("show")
  window.addEventListener("keydown", keyfunction);
  window.requestAnimationFrame(gameplay);
}
//set score
let highScoreValue=''
function setScore() {
  let scoreinputval = scorevalue.value;
 
  let getScoreValue = localStorage.getItem("setscore");
 if(getScoreValue!=undefined){
  score_arr = JSON.parse(getScoreValue);
 }
  score_arr.push(scoreinputval);
  localStorage.setItem("setscore", JSON.stringify(score_arr));
  // console.log(score_arr)
  let acsarr = score_arr.sort(function(a, b){return a-b});;
 highScoreValue = acsarr.pop()
 
}
highScore.innerHTML=`high score : ${highScoreValue}`