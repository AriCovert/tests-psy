const questions = [
  {
    text: "Quel est le plus grand pays du monde ?",
    answers: [
      { text: "Russie", score: 1 },
      { text: "Canada", score: 0 },
      { text: "Chine", score: 0.5 }
    ]
  },
  {
    text: "Quelle est la capitale de l'Italie ?",
    answers: [
      { text: "Rome", score: 1 },
      { text: "Venise", score: 0 },
      { text: "Milan", score: 0.5 }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question").textContent = question.text;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.onclick = () => {
      score += answer.score;
      document.getElementById("next-btn").style.display = "block";
    };
    answersDiv.appendChild(button);
  });

  document.getElementById("next-btn").style.display = "none";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("question-container").innerHTML = "<h2>Quiz terminé !</h2>";
    document.getElementById("score-display").textContent = `Votre score : ${score} / ${questions.length}`;
    document.getElementById("next-btn").style.display = "none";
  }
}

window.onload = showQuestion;
