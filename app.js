const leftpart = document.querySelector('#leftpart')
const rightpart = document.querySelector('#rightpart')
const next = document.querySelector('#next')
const leftBtn = document.querySelector('#btnLeft')
const rightBtn = document.querySelector('#btnRight')
const centerBtn = document.querySelector('#btnCenter')
const counter = document.querySelector('#counter')
let counterNum = 0
localStorage.setItem("userTime", JSON.stringify([]))
const generateBubbles = (part) => {
    part.textContent = ''
    let randomNumbers = Math.floor(Math.random() * 4) + 1
    let numbers = []
    for(let i=0;i<randomNumbers;++i){
        numbers.push(Math.floor(Math.random() * 10) + 1)
    }
    const colors = ['#260C1A','#AF8D86', '#BF0603', '#3B5249','#1B998B']

    numbers.forEach(value => {
        let bubbleColor = colors[Math.floor(Math.random() * 4) + 1]
        // console.log(bubbleColor)
        let bubble = document.createElement("span")
        bubble.className = 'bubble'
        bubble.style.backgroundColor = bubbleColor
        bubble.textContent = value
        part.appendChild(bubble)
    })
    return numbers.reduce((sum, value) => {
        return sum + value
    })
}

const addUserTimeTaken = (usedTime) => {
    let userTime = []
    let savedTimes = JSON.parse(localStorage.getItem("userTime"))
    console.log(savedTimes)
    userTime = [...savedTimes]
    userTime.push(usedTime)
    localStorage.setItem("userTime", JSON.stringify(userTime))
}

// FUNCTION FOR TIMERS 
// THIS IS FOR TEXT TIMER
function Countdown(elem, seconds) {
    var that = {};
  
    that.elem = elem;
    that.seconds = seconds;
    that.totalTime = seconds * 100;
    that.usedTime = 0;
    that.startTime = +new Date();
    that.timer = null;
  
    that.count = function() {
      that.usedTime = Math.floor((+new Date() - that.startTime) / 10);
  
      var tt = that.totalTime - that.usedTime;
      if (tt <= 0) {
        that.elem.innerHTML = '00.00';
        clearInterval(that.timer);
      } else {
        var mi = Math.floor(tt / (60 * 100));
        var ss = Math.floor((tt - mi * 60 * 100) / 100);
        var ms = tt - Math.floor(tt / 100) * 100;
  
        that.elem.innerHTML =  that.fillZero(ss) + "." + that.fillZero(ms);
      }
    };
    
    that.init = function() {
      if(that.timer){
        clearInterval(that.timer);
        that.elem.innerHTML = '00.00';
        that.totalTime = seconds * 100;
        that.usedTime = 0;
        that.startTime = +new Date();
        that.timer = null;
      }
    };
  
    that.start = function() {
      if(!that.timer){
         that.timer = setInterval(that.count, 1);
      }
    };
  
    that.stop = function() {
    //   console.log('usedTime = ' + countDown.usedTime);
      addUserTimeTaken(countDown.usedTime)
      if (that.timer) clearInterval(that.timer);
    };
  
    that.fillZero = function(num) {
      return num < 10 ? '0' + num : num;
    };
  
    return that;
  }
//   THIS IS FOR VISUALISATION
  function timerCountDown (){

    const timer = document.getElementById("timerBar")
    var that = {}
    that.timer = null
    that.width = 500

    that.init = function(){
        if(that.timer) {
            clearInterval(that.timer)
            timer.style.width = 500
        }
    }
    that.frame = function(){
        if(that.width <= 0){
            clearInterval(that.timer)
        } else {
            --that.width
            timer.style.width = that.width + 'px'
        }
    }  
    that.start = function() {
        if(!that.timer) {
            that.timer = setInterval(that.frame, 10)
        }
    }
    that.stop = function(){
        if(that.timer){
            clearInterval(that.timer)
        }
    }
    return that
}

// TO INCREMENT THE VALUE OF COUNTERR
const increment = ({sumLeft, sumRight, btnID}) => {
    if( sumLeft > sumRight && btnID === 'btnLeft') {
        counter.textContent = ++counterNum
    } else if (sumLeft < sumRight && btnID === 'btnRight' ) {
        counter.textContent = ++counterNum
    } else if( sumLeft === sumRight && btnID === 'btnCenter' ) {
        counter.textContent = ++counterNum
    }
}

// DRIVER CODESSS
let SUMRIGHT = 0, SUMLEFT = 0
let countDown, countViz
const time = document.querySelector('#time')
document.querySelector('#next').addEventListener('click',()=> {
    enableInput()
    SUMLEFT = generateBubbles(leftpart)
    SUMRIGHT = generateBubbles(rightpart)
    countDown = new Countdown(time, 5)
    countViz = new timerCountDown()
    countDown.start()
    countViz.start()
})


// HELPER FUNCTIONSS
const stopTimer = () => {
    countDown.stop()
    countViz.stop()
    disableInput()
}

const disableInput = () => {
    rightBtn.setAttribute("disabled",true)
    leftBtn.setAttribute("disabled",true)
    centerBtn.setAttribute("disabled",true)
}
const enableInput = () => {
    rightBtn.removeAttribute("disabled")
    leftBtn.removeAttribute("disabled")
    centerBtn.removeAttribute("disabled")
}


// ONCLICK EVENT LISTENERS
rightBtn.addEventListener('click',()=>{
    increment({sumLeft: SUMLEFT, sumRight:SUMRIGHT, btnID: 'btnRight'})
    stopTimer()
})
leftBtn.addEventListener('click',()=>{
    increment({sumLeft: SUMLEFT, sumRight:SUMRIGHT, btnID: 'btnLeft'})
    stopTimer()
})
centerBtn.addEventListener('click',()=>{
    increment({sumLeft: SUMLEFT, sumRight:SUMRIGHT, btnID: 'btnCenter'})
    stopTimer()
})






