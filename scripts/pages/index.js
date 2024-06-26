import { PhotographerTemplate } from '../templates/photographer.js';

// Creation of the Photographer class
class Photographer {
	constructor(id, name, city, country, tagline, price, portrait) {
		this._id = id;
		this._name = name;
		this._city = city;
		this._country = country;
		this._tagline = tagline;
		this._price = price;
		this._portrait = portrait;
	}

	// Getters to access the private properties of the photographer
	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get city() {
		return this._city;
	}

	get country() {
		return this._country;
	}

	get tagline() {
		return this._tagline;
	}

	get price() {
		return this._price;
	}

	get portrait() {
		return this._portrait;
	}
}

async function getPhotographers() {
	try {
		// Fetch request to get photographer data from a JSON file
		const response = await fetch('../../data/photographers.json');

		if (!response.ok) {
			throw new Error(
				'Erreur lors de la récupération du fichier JSON',
			);
		}

		const data = await response.json();
		console.log(data);

		// Create an array of photographers using the Photographer class
		const photographers = data.photographers.map((element) => {
			return new Photographer(
				element.id,
				element.name,
				element.city,
				element.country,
				element.tagline,
				element.price,
				element.portrait,
			);
		});

		// Return an object containing the array of photographers
		return { photographers };
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des données:',
			error,
		);
	}
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(
		'.photographer_section',
	);
	const photographerTemplate = new PhotographerTemplate();

	photographers.forEach((photographer) => {
		const userCardDOM =
			photographerTemplate.getUserCardDOM(photographer);
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Retrieves data from photographers
	const { photographers } = await getPhotographers();
	if (photographers) {
		displayData(photographers);
	} else {
		console.error(
			'Erreur: Aucune donnée de photographes récupérée.',
		);
	}
}

init();
