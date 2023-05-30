
let timer = 0
let timerSpan = document.querySelector(".timerSpan")


// nesecary variibales are defined Here
let queEle = document.querySelector(".que");
let ansEle = document.querySelector(".ans");
let nxtBtn = document.querySelector(".nxtBtn");
let queIndex = 0;
let points = 0;
let userName = document.querySelector(".userName");
let timeStart = false

function enterButtonEvent() {
    if (document.querySelector(".userName").value) {
        alert(`${document.querySelector(".userName").value}, You Have Registred Successfully`)
    } else {
        alert("Please Enter Your Name First")
    }
}
// controls the timer
setInterval(function startTimer() {
    if (timeStart) {
        if (queIndex < cat.length) {
            timer++
            timerSpan.innerHTML = timer
        }
        else {
            timer = 0
        }
    }
}, 1000)

// this function control what happens when user selects a category
function instructPage() {
    document.querySelector(".welcome").style.display = "none"
    document.querySelector(".cat").style.display = "none"
    document.querySelector(".instructions").style.display = "block"
}

// added four event listner for every category button so that when user slects a category, the Questio are according to selected category.
// then go to instruction page
document.querySelector(".cat1").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat1").innerHTML

    cat = quetions.queCat1
    if (userName.value == "") {
        alert("Enter Your Name First")
    } else {
        instructPage()
    }

})

document.querySelector(".cat2").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat2").innerHTML

    cat = quetions.queCat2

    if (userName.value == "") {
        alert("Enter Your Name First")
    } else {
        instructPage()
    }
})

document.querySelector(".cat3").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat3").innerHTML

    cat = quetions.queCat3

    if (userName.value == "") {
        alert("Enter Your Name First")
    } else {
        instructPage()
    }
})

document.querySelector(".cat4").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat4").innerHTML

    cat = quetions.queCat4

    if (userName.value == "") {
        alert("Enter Your Name First")
    } else {
        instructPage()
    }
})

// Go home button controls are here
function goHome() {
    document.querySelector(".welcome").style.display = "flex"
    document.querySelector(".queNumShow").style.display = "none"
    quizStart()
}
// This function is called When user click play Again Button
function quizStart() {
    document.querySelector(".goHomeBtn").style.display = "none"

    userName = document.querySelector(".userName");
    document.querySelector(".cat").style.display = "flex";
    document.querySelector(".queAndAns").style.display = "none";
    document.querySelector(".instructions").style.display = "none";
    queIndex = 0;
    points = 0;
    document.querySelector(".points").innerHTML = "Score: 0"
    cat = 0;
    nxtBtn.innerHTML = "Next"
    queReset()

}


/// Questions and Aswer are controled here and this is also the start point of java script execution for the question answer
function queStart() {
    timeStart = true
    document.querySelector(".goHomeBtn").style.display = "none"
    userName = document.querySelector(".userName");
    document.querySelector(".welcome").style.display = "none"
    // Qyetions are controlled here
    document.querySelector(".instructions").style.display = "none"
    document.querySelector(".queAndAns").style.display = "flex"
    queReset()
    let queCurrent = cat[queIndex];
    let queNumber = queIndex + 1;
    document.querySelector(".queNumShow").style.display = "block"
    document.querySelector(".queNumShow").style.backgroundColor = "black"
    document.querySelector(".queNumShow").innerHTML = "Q." + queNumber
    queEle.innerHTML = queCurrent.quetion;

    // Answers are controlled here
    queCurrent.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.ans;
        button.classList.add("answers");
        ansEle.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

// this functions resets the question answer when clicking next or clicking play again button
function queReset() {
    nxtBtn.style.display = "none"
    while (ansEle.firstChild) {
        ansEle.removeChild(ansEle.firstChild)
    }

}

// this function add the category for selced answer to display colred wrong or right answers
function selectAnswer(e) {

    //this marks the answer that is correct

    let selectedans = e.target;
    let isCorrect = selectedans.dataset.correct === "true"
    if (isCorrect) {
        selectedans.classList.add("correct")
        points += 10
        document.querySelector(".points").innerHTML = "Score: " + points
    }
    else {
        selectedans.classList.add("incorrect")
    }
    Array.from(ansEle.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nxtBtn.style.display = "block"
}

//This function controls the result of user and also converts next button into play again button
function showReslut() {
    queReset()
    queEle.innerHTML = "<b>Your Performance Analysis</b>"
    ansEle.innerHTML = `<div class="result">
                        <div class="resultItem"><span class="usernNameSpan">${userName.value}</span> your Score is ${points} out of 100</div>
                        <div class="resultItem">Time taken: ${timer}</div>
                        <div class="resultItem">Total Questions: ${cat.length}</div>
                        <div class="resultItem">Questions Attempted: 10</div>
                        <div class="resultItem">Right Answers: ${eval(points / cat.length)}</div>
                        <div class="resultItem">Wrong Answers: ${eval(10 - points / cat.length)}</div>
                        <div class="resultItem">Score Percentage: ${Math.floor(eval(((points / cat.length) / cat.length) * 100))}%</div>

                        </div`




    nxtBtn.innerHTML = "Start Again"
    nxtBtn.style.display = "block"
    document.querySelector(".goHomeBtn").style.display = "block"
    document.querySelector(".queNumShow").style.display = "none"
}

// This function controls what should next button do.
function nxtBtnWork() {
    queIndex++
    if (queIndex < cat.length) {
        queStart()
    } else {
        showReslut()
    }
}

// this button controls when the quiz should end calls quizstart() function to restart the quiz
nxtBtn.addEventListener("click", () => {
    if (queIndex < cat.length) {
        nxtBtnWork()
    }
    else {
        quizStart()
        timeStart = false
        document.querySelector(".queNumShow").style.display = "none"
    }
})
document.querySelector(".goHomeBtn").addEventListener("click", function () {
    timeStart = false
    goHome()
})