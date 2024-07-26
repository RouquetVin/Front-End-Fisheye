import { Api } from '../api/api.js';
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

// Fetches photographers' data from a JSON file and returns it as an array of Photographer objects
async function getPhotographers() {
	try {
		const data = await Api.fetchData(
			'../../data/photographers.json',
		);
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

		return { photographers };
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des photographes:',
			error,
		);
	}
}

// Displays photographers' data on the webpage by generating DOM elements for each photographer
async function displayData(photographers) {
	const photographersSection = document.querySelector(
		'.photographer_section',
	);
	const photographerTemplate = new PhotographerTemplate();

	photographers.forEach((photographer) => {
		const userCardDOM =
			photographerTemplate.getUserCardDOM(photographer);
		userCardDOM.setAttribute('role', 'listitem');
		userCardDOM.setAttribute(
			'aria-label',
			`${photographer.name}, ${photographer.city}, ${photographer.country}, ${photographer.tagline}`,
		);
		photographersSection.appendChild(userCardDOM);

		const link = userCardDOM.querySelector('a');
		if (link) {
			link.setAttribute('role', 'link');
		}
	});
}

// Initializes the application by fetching photographers' data and displaying it on the webpage
async function init() {
	const { photographers } = await getPhotographers();
	if (photographers) {
		displayData(photographers);
	} else {
		console.error(
			'Erreur: Aucune donnée de photographes récupérée.',
		);
	}
}

// Call the init function to start the application
init();
