const mainSec = document.querySelector('.main');
const startBtn = document.querySelector('.start_btn');
const guideInfo = document.querySelector('.guideline-sec');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const queSec = document.querySelector('.ques-sec');
const queBox = document.querySelector('.que-box');
const finalResult = document.querySelector('.final-result');
const tryBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.gotoHome-btn');

let countque = 0;
let quenum = 1;
let userScore = 0;
let timer = 60; // initial timer value in seconds
let timerInterval;

const nextBtn = document.querySelector('.next-btn');
const timeDisplay = document.getElementById('time');

startBtn.onclick = () => {
    guideInfo.classList.add('active');
    mainSec.classList.add('active');
}

exitBtn.onclick = () => {
    guideInfo.classList.remove('active');
    mainSec.classList.remove('active');
}

continueBtn.onclick = () => {
    queSec.classList.add('active');
    guideInfo.classList.remove('active');
    mainSec.classList.remove('active');
    queBox.classList.add('active');
    QuesFunc(0);
    queCnt(1);
    headerScore();
    startTimer(); // Start the timer when the quiz starts
}

tryBtn.onclick = () => {
    resetQuiz();
}

goHomeBtn.onclick = () => {
    // resetQuiz();
    queSec.classList.remove('active');
    finalResult.classList.remove('active');
    nextBtn.classList.remove('active');
    
    countque=0;
    quenum=1;
    userScore=0;
    QuesFunc(countque);
    queCnt(quenum);
}

nextBtn.onclick = () => {
    if (countque < questions.length - 1) {
        countque++;
        QuesFunc(countque);
        quenum++;
        queCnt(quenum);
        nextBtn.classList.remove('active');
    } else {
        showResult();
    }
};

function resetQuiz() {
    queBox.classList.add('active');
    finalResult.classList.remove('active');
    nextBtn.classList.remove('active');
    countque = 0;
    quenum = 1;
    userScore = 0;
    timer = 60; // Reset the timer
    clearInterval(timerInterval); // Clear the previous interval
    QuesFunc(countque);
    queCnt(quenum);
    headerScore();
    startTimer(); // Restart the timer
}

const optionList = document.querySelector('.option-list');

function QuesFunc(index) {
    const queText = document.querySelector('.que-text');
    queText.textContent = `${questions[index].num}. ${questions[index].question}`;
    let selOption = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`

    optionList.innerHTML = selOption;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let inputAnswer = answer.textContent;
    let correctAnswer = questions[countque].answer;
    let oneOptionSelect = optionList.children.length;

    if (inputAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('wrong');
        // if user's answer is wrong, auto show correct answer
        for (let i = 0; i < oneOptionSelect; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // if user has selected one option, disable all options
    for (let i = 0; i < oneOptionSelect; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function queCnt(index) {
    const totalQue = document.querySelector('.total-que');
    totalQue.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const eachScore = document.querySelector('.score');
    eachScore.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResult() {
    clearInterval(timerInterval); // Stop the timer when showing the result
    queBox.classList.remove('active');
    finalResult.classList.add('active');
    const finalScore = document.querySelector('.final-score');
    finalScore.textContent = `You Scored ${userScore} out of ${questions.length}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}
