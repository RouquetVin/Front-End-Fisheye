// Creation of the PhotographerTemplate class
export class PhotographerTemplate {
	// Method to create the profile image element
	createProfileImage(portrait, id, name) {
		const picture = `assets/photographers/${portrait}`;
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.classList.add('img_profile', `img_profile_${id}`);
		img.setAttribute('alt', `Photo de profil de ${name}`);
		return img;
	}

	// Method to create the name element
	createName(name) {
		const h2 = document.createElement('h2');
		h2.classList.add('name');
		h2.textContent = name;
		return h2;
	}

	// Method to create the location element
	createLocation(city, country) {
		const location = document.createElement('p');
		location.classList.add('location');
		location.textContent = `${city}, ${country}`;
		return location;
	}

	// Method to create the tagline element
	createTagline(tagline) {
		const taglineElem = document.createElement('p');
		taglineElem.classList.add('description');
		taglineElem.textContent = tagline;
		return taglineElem;
	}

	// Method to create the price element
	createPrice(price) {
		const priceElem = document.createElement('p');
		priceElem.classList.add('price');
		priceElem.textContent = `${price}€/jour`;
		return priceElem;
	}

	// Method to create the user card DOM structure
	getUserCardDOM(photographer) {
		// Destructure photographer object to extract properties
		const { id, name, city, country, tagline, price, portrait } =
			photographer;

		// Create the main elements for the user card
		const article = document.createElement('article');
		const link = document.createElement('a');
		const divImg = document.createElement('div');
		const img = this.createProfileImage(portrait, id, name);
		const h2 = this.createName(name);
		const location = this.createLocation(city, country);
		const tag = this.createTagline(tagline);
		const pr = this.createPrice(price);

		// Set attributes and classes for the link element
		link.classList.add('link');
		link.setAttribute('href', `photographer.html?id=${id}`);
		link.setAttribute('target', '_self');

		// Set class for the image container div
		divImg.classList.add('profile');

		// Append the created elements to their respective parent elements
		divImg.appendChild(img);
		link.appendChild(divImg);
		link.appendChild(h2);
		article.appendChild(link);
		article.appendChild(location);
		article.appendChild(tag);
		article.appendChild(pr);

		// Return the fully constructed user card article element
		return article;
	}
}
