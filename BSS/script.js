const questions = [
  {
    text: "Isolement",
    answers: [
      { text: "Quelqu'un de présent", score: 0 },
      { text: "Une personne est proche ou en contact visuel ou vocal (téléphone par exemple)", score: 1 },
      { text: "Isolement total (personne à proximité, pas de contact visuel ou vocal)", score: 2 }
    ]
  },
  {
    text: "Moment choisi",
    answers: [
      { text: "Intervention probable", score: 0 },
      { text: "Intervention improbable", score: 1 },
      { text: "Intervention très improbable", score: 2 }
    ]
  },{
    text: "Précautions prises contre la découverte et/ou l'intervention d'autrui",
    answers: [
      { text: "Acune prévention prise", score: 0 },
      { text: "Précautions passives (telles qu'éviter les autres sans empêcher leur intervention : Seul dzns sa chambre, porte non fermée à clefs)", score: 1 },
      { text: "Précautions actives (porte fermée à clefs...)", score: 2 }
    ]
  },{
    text: "Appel à l'aide pendant ou après la tentative",
    answers: [
      { text: "A avertir de son geste, une personne pouvant le secourir", score: 0 },
      { text: "A contacté quelqu'un sans l'avertir spécialement de son geste", score: 1 },
      { text: "N'a contacté ou averti personne", score: 2 }
    ]
  },{
    text: "Dispositions anticipant la mort (actes préparatoires, par exemple : testament, cadeaux, assurance vie...)",
    answers: [
      { text: "Aucune", score: 0 },
      { text: "A pris quelques dispositions ou a pensé les prendre", score: 1 },
      { text: "A pris toutes ses dispositions ou a fait des plans définitifs", score: 2 }
    ]
  },{
    text: "Lettre d'adieu",
    answers: [
      { text: "Pas de lettre", score: 0 },
      { text: "Lettre écrite mais déchirée ou jetée", score: 1 },
      { text: "Présence d'une lettre", score: 2 }
    ]
  },{
    text: "Appréciation de la létalité du geste par le patient",
    answers: [
      { text: "Pensait que son geste ne le tuerait pas", score: 0 },
      { text: "N'était pas sur que son geste le tuerait", score: 1 },
      { text: "Etait sur que son geste le tuerait", score: 2 }
    ]
  },{
    text: "Intention de mort",
    answers: [
      { text: "Ne voulait pas mourrir", score: 0 },
      { text: "Incertain ou mélange des deux", score: 1 },
      { text: "Voulait mourrir", score: 2 }
    ]
  },{
    text: "Préméditation",
    answers: [
      { text: "Aucune, geste impulsif", score: 0 },
      { text: "Suicide envisagé moins d'une heure avant la tentative", score: 1 },
      { text: "Suicide envisagé moins d'un jour avant la tentative", score: 2 },
      { text: "Suicide envisagé plus d'un jour avant la tentative", score: 3 }
    ]
  },{
    text: "Positions actuelle vis-à-vis de la tentative",
    answers: [
      { text: "Heureux de s'en être sorti", score: 0 },
      { text: "Incertain ou mélange des deux", score: 1 },
      { text: "Désolé d'avoir survécu", score: 2 }
    ]
  },{
    text: "Issue prévisible dans les circonstances du scénario choisi (exemple : si quelqu'un n'était pas venu lui porter secours ?)",
    answers: [
      { text: "Issue favorable certaine", score: 0 },
      { text: "Mort improbable", score: 1 },
      { text: "Mort probable ou certaine", score: 2 }
    ]
  },
  {
    text: "La mort serait-elle survenue en l'absence d'intervention médicale ?",
    answers: [
      { text: "Non", score: 0 },
      { text: "Incertain", score: 1 },
      { text: "Oui", score: 2 }
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
      // Empêche les clics multiples
      const allButtons = answersDiv.querySelectorAll("button");
      allButtons.forEach(btn => btn.disabled = true);

      // Ajoute le score
      score += answer.score;

      // Passe automatiquement à la suite
      setTimeout(() => {
        nextQuestion();
      }, 300);
    };

    answersDiv.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    // Étape finale : demande d'infos utilisateur
    document.getElementById("question-container").innerHTML = `
      <h2>Vos résultas ont bien été pris en compte et vont été redirigés vers la base de données.</h2>
      <p>Merci de renseigner vos informations pour le bon fonctionnement de l'enregistrement :</p>
      <form id="save-form">
        <label>Nom : <input type="text" name="nom" required></label><br>
        <label>Prénom : <input type="text" name="prenom" required></label><br>
        <label>Âge : <input type="number" name="age" min="1" required></label><br>
        <input type="hidden" name="score" value="${score}">
        <button type="submit">Confirmer mes données</button>
      </form>
      <p id="confirmation" style="color: green;"></p>
    `;

  document.getElementById("save-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nom = this.elements["nom"].value;
  const prenom = this.elements["prenom"].value;
  const age = this.elements["age"].value;
  const scoreValue = this.elements["score"].value;

  const formData = new FormData();
  formData.append("entry.1294777817", nom);       // Nom
  formData.append("entry.1766512048", prenom);    // Prénom
  formData.append("entry.596638300", age);        // Âge
  formData.append("entry.206687182", scoreValue); // Score

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSdxK2Ud_45jHNd9l5mcZGXIzDb9xVwkF0Tq-pr-2IPw__-DzA/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  document.getElementById("confirmation").textContent = "Merci ! Vos réponses ont été envoyées.";
  this.remove();
    
});

    });
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

  const entry = {
    prenom: prenom,
    nom: nom,
    age: age,
    score: score,
    total: questions.length,
    date: new Date().toLocaleString()
  };

  const data = JSON.parse(localStorage.getItem("resultatsQuiz") || "[]");
  data.push(entry);
  localStorage.setItem("resultatsQuiz", JSON.stringify(data));

  window.location.href = "resultats.html";
}

// ✅ Corrigé : pas de double onload
window.onload = showQuestion();
};

