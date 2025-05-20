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
    document.getElementById("question-container").innerHTML = `
      <h2>Quiz terminé !</h2>
      <p>Votre score : ${score} / ${questions.length}</p>
      <form id="save-form">
        <label>Prénom : <input type="text" name="prenom" required></label><br>
        <label>Nom : <input type="text" name="nom" required></label><br>
        <label>Âge : <input type="number" name="age" min="1" required></label><br>
        <button type="submit">Afficher mes données</button>
      </form>
      <p id="confirmation" style="color: green;"></p>
      <p><em>Copiez manuellement les données ci-dessous si vous souhaitez les enregistrer.</em></p>
      <div id="manual-data" style="white-space: pre-wrap; margin-top: 10px;"></div>
    `;

    document.getElementById("save-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const nom = formData.get("nom");
      const prenom = formData.get("prenom");
      const age = formData.get("age");

      const resultText = `Nom: ${nom}\nPrénom: ${prenom}\nÂge: ${age}\nScore: ${score} / ${questions.length}`;
      document.getElementById("manual-data").textContent = resultText;
      document.getElementById("confirmation").textContent = "Informations affichées ci-dessous.";
      this.remove();
    });

    document.getElementById("next-btn").style.display = "none";
  }
}

window.onload = showQuestion;
