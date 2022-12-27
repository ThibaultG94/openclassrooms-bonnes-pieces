import { ajouterListenersAvis } from './avis';

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:8081/pieces');
const pieces = await reponse.json();

const genererPieces = (pieces) => {
	for (let i = 0; i < pieces.length; i++) {
		const article = pieces[i];
		// Récupération de l'élément du DOM qui accueillera les fiches
		const sectionFiches = document.querySelector('.fiches');
		// Création d'une balise dédiée à une pièce automobile
		const pieceElement = document.createElement('article');
		// Création des balises
		const imageElement = document.createElement('img');
		imageElement.src = article.image;
		const nomElement = document.createElement('h2');
		nomElement.innerText = article.nom;
		const prixElement = document.createElement('p');
		prixElement.innerText = `Prix: ${article.prix} € (${
			article.prix < 35 ? '€' : '€€€'
		})`;
		const categorieElement = document.createElement('p');
		categorieElement.innerText = article.categorie ?? '(aucune catégorie)';
		const descriptionElement = document.createElement('p');
		descriptionElement.innerText =
			article.description ?? 'Pas de description pour le moment';
		const stockElement = document.createElement('p');
		stockElement.innerText = article.disponibilite
			? 'En stock'
			: 'Rupture de stock';

		const avisBouton = document.createElement('button');
		avisBouton.dataset.id = article.id;
		avisBouton.textContent = 'Afficher les avis';

		// On rattache la balise article à la section Fiches
		sectionFiches.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
		pieceElement.appendChild(prixElement);
		pieceElement.appendChild(categorieElement);
		pieceElement.appendChild(descriptionElement);
		pieceElement.appendChild(stockElement);
		pieceElement.appendChild(avisBouton);
	}
	// Ajout de la fonction ajoutListenerAvis
	ajouterListenersAvis();
};

// Premier affichage de la page
genererPieces(pieces);

// gestion des boutons
const boutonTrier = document.querySelector('.btn-trier');
boutonTrier.addEventListener('click', () => {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => {
		return a.prix - b.prix;
	});
	// Effacement de l'écran et regénération de la page
	document.querySelector('.fiches').innerHTML = '';
	genererPieces(piecesOrdonnees);
});

const boutonFilter = document.querySelector('.btn-filter');
boutonFilter.addEventListener('click', () => {
	const piecesFiltrees = pieces.filter((piece) => {
		return piece.disponibilite;
	});
	// Effacement de l'écran et regénération de la page
	document.querySelector('.fiches').innerHTML = '';
	genererPieces(piecesFiltrees);
});

const boutonDecroissant = document.querySelector('.btn-decroissant');
boutonDecroissant.addEventListener('click', () => {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => {
		return b.prix - a.prix;
	});
	// Effacement de l'écran et regénération de la page
	document.querySelector('.fiches').innerHTML = '';
	genererPieces(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector('.btn-nodesc');

boutonNoDescription.addEventListener('click', () => {
	const piecesFiltrees = pieces.filter((pieces) => {
		return pieces.description;
	});
	// Effacement de l'écran et regénération de la page
	document.querySelector('.fiches').innerHTML = '';
	genererPieces(piecesFiltrees);
});

const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		noms.splice(i, 1);
	}
}

// Création de la liste
const abordablesElements = document.createElement('ul');
for (let i = 0; i < noms.length; i++) {
	const nomElement = document.createElement('li');
	nomElement.innerText = noms[i];
	abordablesElements.appendChild(nomElement);
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables').appendChild(abordablesElements);

const nomsDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].disponibilite === false) {
		nomsDisponibles.splice(i, 1);
		prixDisponibles.splice(i, 1);
	}
}

const disponiblesElement = document.createElement('ul');
for (let i = 0; i < nomsDisponibles.length; i++) {
	const nomElement = document.createElement('li');
	nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
	disponiblesElement.appendChild(nomElement);
}
document.querySelector('.disponibles').appendChild(disponiblesElement);

const inputPrixMax = document.getElementById('prix-max');
inputPrixMax.addEventListener('input', () => {
	const piecesFiltrees = pieces.filter((piece) => {
		return piece.prix <= inputPrixMax.value;
	});
	document.querySelector('.fiches').innerHTML = '';
	genererPieces(piecesFiltrees);
});
