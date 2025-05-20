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
    // Étape finale : demande d'infos utilisateur
    document.getElementById("question-container").innerHTML = `
      <h2>Quiz terminé !</h2>
      <p>Votre score : ${score} / ${questions.length}</p>
      <p>Merci de renseigner vos informations :</p>
      <label>Prénom : <input type="text" id="prenom" required></label><br>
      <label>Nom : <input type="text" id="nom" required></label><br>
      <label>Âge : <input type="number" id="age" required min="1"></label><br><br>
      <button onclick="enregistrerEtRediriger()">Confirmer</button>
    `;
    document.getElementById("next-btn").style.display = "none";
  }
}

function enregistrerEtRediriger() {
  const prenom = document.getElementById("prenom").value.trim();
  const nom = document.getElementById("nom").value.trim();
  const age = document.getElementById("age").value.trim();

  if (!prenom || !nom || !age) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // On enregistre dans le localStorage
  const entry = {
    prenom: prenom,
    nom: nom,
    age: age,
    score: score,
    total: questions.length,
    date: new Date().toLocaleString()
  };

  // On récupère l'historique existant
  const data = JSON.parse(localStorage.getItem("resultatsQuiz") || "[]");
  data.push(entry);
  localStorage.setItem("resultatsQuiz", JSON.stringify(data));

  // Redirection vers la page de résultats
  window.location.href = "resultats.html";
}

window.onload = showQuestion;
