let gameroad = document.querySelector(".gameroad");
let car = document.querySelector(".car")
let player = { speed: 5 }
let carposition = car.getBoundingClientRect();
console.log(carposition.x)
// on click on startbtn show the road and hide start btn
// and show the road
// move the lines on road

function showroad() {
    let startbtn = document.querySelector(".startbtn");
    startbtn.classList.toggle("hide");
    gameroad.classList.toggle("show");
}
// lines function
// we want only 6 lines so we run loop for less than 7 times
// now we create a div and set the class and give style in css
// now every div will started from top so 1st div index 0 and top also 0; but jaise
// index increase hoga ex.1,2,3 vasie hi top se value bhi increase hogi so that overlaping na ho
for (x = 0; x < 6; x++) {
    let roadlines = document.createElement("roadlines");
    roadlines.setAttribute("class", "lines");
    roadlines.y = x * 150
    roadlines.style.top = roadlines.y + "px";
    gameroad.appendChild(roadlines);
}

//main function
function gameplay() {
    movelines();
    moveCars(car);
    // gameOver();
    requestAnimationFrame(gameplay);
}

// collision
function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    console.log(aRect)
    return !((aRect.bottom < bRect.bottom))
}
//move the lines
//first select all the lines and run for each mthond on lines and added a value
//and give the direction that is top and also give condition if y axis se ye 875px 
//chla jaye means height 875 ho jaye to isne se -900 kr do taki ye vapis top pr chla jaye 
function movelines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function (line) {
        if (line.y >= 875) {
            line.y -= 900
        }
        line.y += player.speed
        line.style.top = line.y + "px"
        // console.log( `enemycar`,line.style.top = line.y + "px")
    })
}

//keys
// firstof all we have to know that ki user window pe konsi ki press kr rha ho or konsi release kr rha hai 
// we add event lisetener for down the key and specify the that if particular key is pressed then what happen
// keycode 38 for toparrow and it can find by console e .keycode
window.addEventListener("keydown", function (e) {
    // console.log(e.keyCode)
    if (e.keyCode == 38) {
        let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
        // console.log(carBottom)
        if (carBottom < 700) {
            car.style.bottom = carBottom + player.speed + "px"
            console.log(carposition.y)
        }
    }
    if (e.keyCode == 40) {
        let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
        if (carBottom > 100) {
            car.style.bottom = carBottom - player.speed + "px"
            console.log(carposition.y)
        }
    }
    if (e.keyCode == 39) {
        let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
        // console.log(carleft)
        if (carleft < 450) {
            car.style.left = carleft + player.speed + "px"
        }
    }
    if (e.keyCode == 37) {
        let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
        if (carleft > 0) {
            car.style.left = carleft - player.speed + "px"
        }
    }
})

let enemyCarArr = ["images/car1.png","images/car3.png","images/car4.png"]
// enemy cars
for (x = 0; x < enemyCarArr.length; x++) {
    let div = document.createElement("div");
    div.setAttribute("class", "enemyCars");
    let img = document.createElement("img");
    img.src = enemyCarArr[x];
    div.appendChild(img)
    div.y = x * 190
    div.style.top = div.y + "px";
    gameroad.appendChild(div);
}
// move the enemyCars
//same as line move yha pr hr baar alg alg postion ke liye math functon ke use krenge
function moveCars(car) {
    let enemyCars = document.querySelectorAll(".enemyCars");
    enemyCars.forEach(function (enemyCar) {
        if(isCollide(car,enemyCar)){
            console.log("hit")
        }
        if (enemyCar.y >= 825) {
            // if(isCollide(car,enemyCar))
            enemyCar.y -= 930;
            enemyCar.style.left = Math.ceil(Math.random() * 130)*3 + "px";
        }
        enemyCar.y += player.speed
        enemyCar.style.top = enemyCar.y + "px";
    })
}

// game over

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
}
window.requestAnimationFrame(gameplay);




