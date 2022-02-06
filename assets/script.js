let gameroad = document.querySelector(".gameroad");
let car = document.querySelector(".car");
let startbtn = document.querySelector(".startbtn");
let container = document.querySelector(".container");
let scoreContainer = document.querySelector(".scoreContainer");
let showScore = document.querySelector(".showScore");
let scorevalue = document.querySelector("#scorevalue");
let highScore = document.querySelector(".highScore");
let fire = document.querySelector(".fire");
let gameCountDown = document.querySelector(".gameCountDown");
let player = { speed: 5, score: 0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  5: false,
};
let carSpeed = {Cspeed:12}
let score = 0;
let carZindex = "";
let audio = new Audio();
let sound = [
  "assets/sounds/carStart.mp3",
  "./assets/sounds/carSoundAcc.m4a",
  "./assets/sounds/car crash.mp3",
  "./assets/sounds/carSound.wav",
];

// when 1 min passed increase speed of car and enemy car and trees
setInterval(() => {
  console.log("up")
  player.speed+=2
  carSpeed.Cspeed+=2
}, 60000);
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
// move tree
let treeArr = [
  "./assets/images/tree2.png",
  "./assets/images/tree2.png",
  "./assets/images/tree2.png",
];
for (x = 0; x < treeArr.length; x++) {
  let divtree = document.createElement("div");
  divtree.setAttribute("class", "trees");
  let imgtree = document.createElement("img");
  imgtree.src = treeArr[x];
  divtree.appendChild(imgtree);
  divtree.y = x * 350;
  divtree.style.top = divtree.y + "px";
  container.appendChild(divtree);
}
for (x = 0; x < treeArr.length; x++) {
  let divRighttree = document.createElement("div");
  divRighttree.setAttribute("class", "treesRight");
  let Rightimgtree = document.createElement("img");
  Rightimgtree.src = treeArr[x];
  divRighttree.appendChild(Rightimgtree);
  divRighttree.y = x * 350;
  divRighttree.style.top = divRighttree.y + "px";
  container.appendChild(divRighttree);
}
let enemyCarArr = [
  "./assets/images/car1.png",
  "./assets/images/car3.png",
  "./assets/images/car4.png",
  "./assets/images/truck.png",
];
// enemy cars
for (x = 0; x < enemyCarArr.length ; x++) {
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
  e.preventDefault();
  keys[e.key] = true;
  let carposition = car.getBoundingClientRect();
  if (keys[5]) {
    let carsize = parseInt(getComputedStyle(car).getPropertyValue("width"));
    if (carsize < 81) {
      car.style.width = carsize + 20 + "px";
      car.style.zIndex = 4;
      carZindex = car.style.zIndex;
      car.style.marginLeft = -32 + "px";
    }
    setInterval(() => {
      let carsize = parseInt(getComputedStyle(car).getPropertyValue("width"));
      if (carsize > 61) {
        car.style.width = carsize - 20 + "px";
        car.style.zIndex = 1;
        car.style.marginLeft = -18 + "px";
        carZindex = car.style.zIndex;
      }
    }, 900);
  }
  if (keys.ArrowUp) {
    let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
    if (carBottom < 700) {
      car.style.bottom = carBottom + carSpeed.Cspeed + "px";
    }
  }
  if (keys.ArrowDown) {
    let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
    console.log(carBottom);
    if (carBottom > 100) {
      car.style.bottom = carBottom -carSpeed.Cspeed  + "px";
    }
  }
  if (keys.ArrowRight) {
    let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
    if (carleft < 450) {
      car.style.left = carleft + carSpeed.Cspeed + "px";
    }
  }
  if (keys.ArrowLeft) {
    let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
    if (carleft > 0) {
      car.style.left = carleft - carSpeed.Cspeed + "px";
    }
  }
}

function keyUpfunction(e) {
  e.preventDefault();
  keys[e.key] = false;
}
// collision detection
function iscollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return (
    aRect.top < bRect.bottom &&
    aRect.bottom > bRect.top &&
    aRect.right > bRect.left &&
    aRect.left < bRect.right &&
    carZindex == 1
  );
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

// move trees
// when we call the function make display block
function movetrees() {
  let trees = document.querySelectorAll(".trees");
  trees.forEach(function (tree) {
    tree.style.display = "block";
    if (tree.y >= 875) {
      tree.y -= 1000;
    }
    tree.y += player.speed;
    tree.style.top = tree.y + "px";
  });
}
function moveRighttrees() {
  let treesRight = document.querySelectorAll(".treesRight");
  treesRight.forEach(function (treeRight) {
    treeRight.style.display = "block";
    if (treeRight.y >= 875) {
      treeRight.y -= 1000;
    }
    treeRight.y += player.speed;
    treeRight.style.top = treeRight.y + "px";
  });
}
// move the enemyCars
// same as line move yha pr hr baar alg alg postion ke liye math functon ke use krenge
function moveCars(car) {
  let enemyCars = document.querySelectorAll(".enemyCars");
  enemyCars.forEach(function (enemyCar) {
    if (iscollide(car, enemyCar)) {
      if ((audio.src = sound[1])) {
        audio.pause();
      }
      audio.src = sound[2];
      audio.play();
      player.start = false;
      showScore.innerHTML = `you loose <br> your score is ${score + 1}`;
      scorevalue.value = score + 1;
      fire.style.display = "block";
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
  scoreContainer.classList.add("show");
  highScore.classList.add("show");
  if (player.start) {
    moveCars(car);
    movetrees();
    moveRighttrees();
    movelines();
    requestAnimationFrame(gameplay);
    score++;
    scoreContainer.innerHTML = `your score : ${score}`;
  }
}

// startgame game fun will run only if player is true and call the function game play
// cif collisio then player will be false so don't call the game play fun

function startgame() {
  gameCountDown.classList.add("show");
  player.start = true;
  car.style.zIndex = 1;
  audio.src = sound[0];
  audio.play();
  carZindex = car.style.zIndex;
  gameroad.classList.add("show");
  startbtn.classList.add("hide");
  container.classList.add("blackBackGround");
  setScore();
  setTimeout(() => {
    window.addEventListener("keydown", keyfunction);
    audio.src = sound[1];
    audio.play();
    window.requestAnimationFrame(gameplay);
  }, 3000);
}
//set score
// score is golbal variable so can be access and call the function at the time of colllson
// and when game start

function setScore() {
  let scoreinputval = scorevalue.value;
  let score_arr = [];
  let getScoreValue = localStorage.getItem("setscore");
  if (getScoreValue != undefined) {
    score_arr = JSON.parse(getScoreValue);
  }
  score_arr.push(scoreinputval);
  localStorage.setItem("setscore", JSON.stringify(score_arr));
  let acsarr = score_arr.sort(function (a, b) {
    return a - b;
  });
  let highScoreValue = "";
  highScoreValue = acsarr.pop();
  highScore.innerHTML = `high score : ${highScoreValue}`;
}
window.addEventListener("keyup", keyUpfunction);
