// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-auto.json');
const pieces = await reponse.json();
