export class PhotographerTemplate {
	createProfileImage(portrait, id, name) {
		const picture = `assets/photographers/${portrait}`;
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.classList.add('img_profile', `img_profile_${id}`);
		img.setAttribute('alt', `Photo de profil de ${name}`);
		return img;
	}

	createName(name) {
		const h2 = document.createElement('h2');
		h2.classList.add('name');
		h2.textContent = name;
		return h2;
	}

	createLocation(city, country) {
		const location = document.createElement('p');
		location.classList.add('location');
		location.textContent = `${city}, ${country}`;
		return location;
	}

	createTagline(tagline) {
		const taglineElem = document.createElement('p');
		taglineElem.classList.add('description');
		taglineElem.textContent = tagline;
		return taglineElem;
	}

	createPrice(price) {
		const priceElem = document.createElement('p');
		priceElem.classList.add('price');
		priceElem.textContent = `${price}€/jour`;
		return priceElem;
	}

	getUserCardDOM(photographer) {
		const { id, name, city, country, tagline, price, portrait } =
			photographer;

		const article = document.createElement('article');
		const link = document.createElement('a');
		const divImg = document.createElement('div');
		const img = this.createProfileImage(portrait, id, name);
		const h2 = this.createName(name);
		const location = this.createLocation(city, country);
		const tag = this.createTagline(tagline);
		const pr = this.createPrice(price);

		link.classList.add('link');
		link.setAttribute('href', `photographer.html?id=${id}`);
		link.setAttribute('target', '_self');
		divImg.classList.add('profile');

		divImg.appendChild(img);
		link.appendChild(divImg);
		link.appendChild(h2);
		article.appendChild(link);
		article.appendChild(location);
		article.appendChild(tag);
		article.appendChild(pr);

		return article;
	}
}
