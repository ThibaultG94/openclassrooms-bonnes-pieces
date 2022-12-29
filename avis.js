export const ajouterListenersAvis = () => {
	const piecesElements = document.querySelectorAll('.fiches article button');

	for (let i = 0; i < piecesElements.length; i++) {
		piecesElements[i].addEventListener('click', async (event) => {
			const id = event.target.dataset.id;
			await fetch(`http://localhost:8081/pieces/${id}/avis`);
			const avis = await reponse.json();
			window.localStorage.setItem(
				`avis-piece-${id}`,
				JSON.stringify(avis)
			);
			const pieceElement = event.target.parentElement;
			const avisElement = document.createElement('p');
			for (let i = 0; i < avis.length; i++) {
				avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b>${avis[i].commentaire} <br/>`;
			}
			pieceElement.appendChild(avisElement);
		});
	}
};

export const afficherAvis = (pieceElement, avis) => {
	const avisElement = document.createElement('p');
	for (let i = 0; i < avis.length; i++) {
		avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br />`;
	}
	pieceElement.appendChild(avisElement);
};

export function ajoutListenerEnvoyerAvis() {
	const formulaireAvis = document.querySelector('.formulaire-avis');
	formulaireAvis.addEventListener('submit', function (e) {
		e.preventDefault();
		// Création de l'objet du nouvel avis.
		const avis = {
			pieceId: parseInt(e.target.querySelector('[name=piece-id]').value),
			utilisateur: e.target.querySelector('[name=utilisateur]').value,
			commentaire: e.target.querySelector('[name=commentaire]').value,
			nbEtoiles: parseInt(
				e.target.querySelector('[name=nbEtoiles]').value
			),
		};
		// Création de la charge utile au format JSO?
		const chargeUtile = JSON.stringify(avis);
		// Appel de la fonction fetch avec toutes les informations nécessaires
		fetch('http://localhost:8081/avis', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: chargeUtile,
		});
	});
}
