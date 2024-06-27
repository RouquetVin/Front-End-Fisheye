import { MediaFactory } from '../factories/mediaFactory.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { PhotographerFilterSection } from '../templates/filter.js';

class PhotographerPage {
	constructor() {
		this.photographHeader = document.querySelector(
			'.photograph-header',
		);
		this.main = document.querySelector('main');
		this.template = new PhotographerTemplate();
	}

	getPhotographerId() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('id');
	}

	async fetchPhotographerData() {
		try {
			const response = await fetch(
				'../../data/photographers.json',
			);
			if (!response.ok) {
				throw new Error(
					'Erreur lors de la récupération du fichier JSON',
				);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'Erreur lors de la récupération des données:',
				error,
			);
		}
	}

	filterPhotographerData(data, id) {
		const photographer = data.photographers.find(
			(photographer) => photographer.id == id,
		);
		const media = data.media.filter(
			(media) => media.photographerId == id,
		);
		const totalLikes = media.reduce(
			(total, mediaItem) => total + mediaItem.likes,
			0,
		);
		return { photographer, media, totalLikes };
	}

	displayPhotographerData(data) {
		const { photographer, media, totalLikes } = data;
		const { id, name, city, country, tagline, portrait, price } =
			photographer;

		// Using PhotographerTemplate Methods
		const containerImg = document.createElement('div');
		containerImg.classList.add('profile');
		containerImg.style.marginBottom = '0';
		const profileImage = this.template.createProfileImage(
			portrait,
			id,
			name,
		);
		const containerInfos = document.createElement('div');
		const nameElement = this.template.createName(name);
		nameElement.style.fontSize = '64px';
		nameElement.style.fontWeight = '400';
		const locationElement = this.template.createLocation(
			city,
			country,
		);
		locationElement.style.fontSize = '24px';
		locationElement.style.fontWeight = '400';
		const taglineElement = this.template.createTagline(tagline);
		taglineElement.style.fontSize = '18px';
		taglineElement.style.fontWeight = '400';

		// Assembling the elements
		this.photographHeader.appendChild(containerImg);
		containerImg.appendChild(profileImage);
		this.photographHeader.prepend(containerInfos);
		containerInfos.appendChild(nameElement);
		containerInfos.appendChild(locationElement);
		containerInfos.appendChild(taglineElement);

		// Create and append the photographer filter section to the main container of the page
		const filterSection = new PhotographerFilterSection();
		const sectionElement =
			filterSection.createPhotogFilterSection();
		document.querySelector('main').appendChild(sectionElement);

		// Creation of the photographer's media section
		const photographerMediaSection =
			document.createElement('section');
		photographerMediaSection.classList.add('photographer-media');
		this.main.appendChild(photographerMediaSection);

		// Using MediaFactory to create and display media
		media.forEach((mediaItem) => {
			const mediaObject = new MediaFactory(
				mediaItem,
				photographer,
			);

			// Create a container for each media item and its title
			const mediaContainer = document.createElement('div');
			mediaContainer.classList.add(
				'photographer-media-container',
			);

			const mediaElement = document.createElement(
				mediaObject.type === 'image' ? 'img' : 'video',
			);
			mediaElement.src = mediaObject.src;
			mediaElement.alt = mediaObject.alt;
			mediaElement.controls = mediaObject.controls;
			mediaElement.classList.add('photographer-media-item');

			const mediaTitle = document.createElement('h2');
			mediaTitle.textContent = mediaItem.title;

			const heart = document.createElement('i');
			heart.classList.add('fa-solid', 'fa-heart');
			heart.style.cursor = 'pointer';

			const likesCount = document.createElement('span');
			likesCount.textContent = mediaItem.likes;
			likesCount.classList.add('likes-count');

			const likesHeart = document.createElement('div');
			likesHeart.classList.add('likesHeart');

			const titleHeart = document.createElement('div');
			titleHeart.classList.add('titleHeart');
			titleHeart.appendChild(mediaTitle);
			likesHeart.appendChild(likesCount);
			likesHeart.appendChild(heart);
			titleHeart.appendChild(likesHeart);

			mediaContainer.appendChild(mediaElement);
			mediaContainer.appendChild(titleHeart);
			photographerMediaSection.appendChild(mediaContainer);
		});

		const counterHeart = document.createElement('section');
		counterHeart.classList.add('counterHeart');
		counterHeart.innerHTML = `
            <div class="counterHeart_price">
                <div class="counterHeart_bloc">
                    <p>${totalLikes}</p>
                    <i class="fa-solid fa-heart"></i>
                </div>
                <p>${price} / jour</p>
            </div>
        `;
		this.main.appendChild(counterHeart);
	}

	async init() {
		const photographerId = this.getPhotographerId();
		const data = await this.fetchPhotographerData();
		const filteredData = this.filterPhotographerData(
			data,
			photographerId,
		);
		this.displayPhotographerData(filteredData);
	}
}

const photographerPage = new PhotographerPage();
photographerPage.init();
