from flask import Flask, request, jsonify
import csv
import os

app = Flask(__name__)

CSV_FILE = "resultats.csv"

# Créer le fichier CSV avec en-têtes si inexistant
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode="w", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Prénom", "Nom", "Âge", "Score"])

@app.route("/save", methods=["POST"])
def save_data():
    prenom = request.form.get("prenom")
    nom = request.form.get("nom")
    age = request.form.get("age")
    score = request.form.get("score")

    if not (prenom and nom and age and score):
        return "Données incomplètes", 400

    with open(CSV_FILE, mode="a", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([prenom, nom, age, score])

    return "Données enregistrées", 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
