let questions = null;
let currentQuestion = 0;
let score = 0;
let isAnswered = false;

function loadQuestions(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'questions.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  
  function init() {
    loadQuestions(function(response) {
      questions = JSON.parse(response);
      displayQuestion();
    });
  }

function startQuiz() {
    document.getElementById("start").style.display = "none";
    displayQuestion();
}


function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question").innerHTML = question.question;
    const choices = document.getElementById("choices");
    choices.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const li = document.createElement("li");
        li.innerHTML = choice;
        li.onclick = () => {
          isAnswered = true;
            if (choice === question.answer) {
                score++;
                document.getElementById("score").innerHTML = "Score: " + score;
            }
        }
        choices.appendChild(li);
    }
}

function checkAnswer() {
    if (isAnswered === true) {
    currentQuestion++;
    isAnswered = false;
    if (currentQuestion >= questions.length) {
        document.getElementById("question").innerHTML = "You finished the quiz!";
        document.getElementById("choices").innerHTML = "";
        document.getElementById("score").innerHTML = "Final score: " + score;
    } else {
        displayQuestion();
    }
  } else {
    alert("Please select an answer");
  }
}

init();