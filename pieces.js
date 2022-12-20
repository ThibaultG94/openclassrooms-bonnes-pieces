// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const responseData = await reponse.json();
const pieces = responseData.data;
// Création des balises
const article = pieces[0];

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

// Création des élements pour l'exercice
const descriptionElement = document.createElement('p');
descriptionElement.innerText =
	article.description ?? 'Pas de description pour le moment.';

const stockElement = document.createElement('p');
stockElement.innerText = article.disponibilite
	? 'En stock'
	: 'Rupture de stock';

// Rattachement de nos balises au DOM
const sectionFiches = document.querySelector('.fiches');
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);

// Ajout des éléments au DOM pour l'exercice
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(stockElement);

for (let i = 0; i < pieces.length; i++) {
	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionFiches = document.querySelector('.fiches');
	// Création d'une balise dédiée à une pièce automobile
	const pieceElement = document.createElement('article');
	// On crée l'élément img
	const imageElement = document.createElement('img');
	// On accède à l'indice i de la liste pieces pour configurer la source de l'image
	imageElement.src = pieces[i].image;
	// Idem pour le nom, le prix et la catégorie...

	// On rattache la balise article à la section Fiches
	sectionFiches.appendChild(pieceElement);
	// On rattache l'image à pieceElemeny (la balise article)
	pieceElement.appendChild(imageElement);
	// Idem pour le nom, le prix et la catégorie...
}
