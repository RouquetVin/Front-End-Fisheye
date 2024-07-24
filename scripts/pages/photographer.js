import { MediaFactory } from '../factories/mediaFactory.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { PhotographerFilterSection } from '../templates/filter.js';
import { LikeSystem } from '../utils/like.js';
import { initLightbox } from '../utils/lightbox.js';
import { MediaFilter } from '../utils/filter.js';

// PhotographerPage class to manage the photographer's page
class PhotographerPage {
	constructor() {
		// DOM Elements
		this.photographHeader = document.querySelector(
			'.photograph-header',
		);
		this.main = document.querySelector('main');

		// Instantiating templates and utilities
		this.template = new PhotographerTemplate();
		this.lightbox = initLightbox();
		this.photographerData = null;
	}

	// Retrieve the photographer ID from the URL query parameters
	getPhotographerId() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('id');
	}

	// Fetch photographer data from a JSON file asynchronously
	async fetchPhotographerData() {
		try {
			const response = await fetch(
				'../../data/photographers.json',
			);
			if (!response.ok) {
				throw new Error('Error retrieving JSON file');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	// Filter photographer data based on the photographer ID
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

	// Update the contact modal title with the photographer's name
	updateContactModalTitle(name) {
		const contactModalTitle =
			document.querySelector('.photog-name');
		contactModalTitle.innerHTML = `Contactez-moi <br>${name}`;
	}

	// Display the photographer's profile data on the page
	displayPhotographerProfile(photographer) {
		const { id, name, city, country, tagline, portrait } =
			photographer;

		// Create and append elements for the photographer's profile section
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

		this.photographHeader.appendChild(containerImg);
		containerImg.appendChild(profileImage);
		this.photographHeader.prepend(containerInfos);
		containerInfos.appendChild(nameElement);
		containerInfos.appendChild(locationElement);
		containerInfos.appendChild(taglineElement);

		// Update the contact modal title
		this.updateContactModalTitle(name);
	}

	// Display the photographer's media data on the page
	displayPhotographerMedia(media) {
		const photographerMediaSection = document.querySelector(
			'.photographer-media',
		);
		photographerMediaSection.setAttribute('role', 'region');
		photographerMediaSection.innerHTML = '';

		media.forEach((mediaItem) => {
			const mediaObject = new MediaFactory(
				mediaItem,
				this.photographerData.photographer,
			);

			const mediaContainer = document.createElement('div');
			mediaContainer.classList.add(
				'photographer-media-container',
			);
			mediaContainer.setAttribute('tabindex', '0');

			const mediaElement = document.createElement(
				mediaObject.type === 'image' ? 'img' : 'video',
			);
			mediaElement.src = mediaObject.src;
			mediaElement.alt = mediaObject.alt;
			mediaElement.controls = mediaObject.controls;
			mediaElement.classList.add('photographer-media-item');
			mediaElement.setAttribute('tabindex', '0');

			const titleHeart = document.createElement('div');
			titleHeart.classList.add('titleHeart');

			const mediaTitle = document.createElement('h2');
			mediaTitle.textContent = mediaItem.title;

			const likesCount = document.createElement('span');
			likesCount.textContent = mediaItem.likes;
			likesCount.classList.add('likes-count');

			const likesHeart = document.createElement('div');
			likesHeart.classList.add('likesHeart');
			likesHeart.setAttribute('tabindex', '0');

			const heart = document.createElement('i');
			heart.classList.add('fa-solid', 'fa-heart');
			heart.setAttribute('tabindex', '0');
			heart.style.cursor = 'pointer';
			heart.setAttribute(
				'aria-label',
				'Ajouter ou retirer votre like',
			);

			titleHeart.appendChild(mediaTitle);
			likesHeart.appendChild(likesCount);
			likesHeart.appendChild(heart);
			titleHeart.appendChild(likesHeart);

			mediaContainer.appendChild(mediaElement);
			mediaContainer.appendChild(titleHeart);

			photographerMediaSection.appendChild(mediaContainer);

			// Add media item to lightbox for full-screen view
			this.lightbox.addMediaItem(mediaElement, mediaItem.title);

			// Add event listener for like button click
			heart.addEventListener('click', () =>
				this.likeSystem.handleLikeClick(likesCount, heart),
			);

			// Add event listener for like button keydown
			heart.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					this.likeSystem.handleLikeClick(
						likesCount,
						heart,
					);
				}
			});
		});
	}

	// Display the section for total likes and price
	displayTotalLikesAndPrice(totalLikes, price) {
		const counterHeart = document.createElement('section');
		counterHeart.setAttribute('role', 'region');
		counterHeart.classList.add('counterHeart');
		counterHeart.innerHTML = `
      <div class="counterHeart_price" tabindex="0">
        <div class="counterHeart_bloc">
          <p>${totalLikes}</p>
          <i class="fa-solid fa-heart" aria-label="like en tout"></i>
        </div>
        <p>${price} / jour</p>
      </div>
    `;
		this.main.appendChild(counterHeart);
	}

	// Initialize the photographer page by fetching data and displaying it
	async init() {
		const photographerId = this.getPhotographerId();
		const data = await this.fetchPhotographerData();
		this.photographerData = this.filterPhotographerData(
			data,
			photographerId,
		);

		this.displayPhotographerProfile(
			this.photographerData.photographer,
		);

		// Initialize the like system for the photographer
		this.likeSystem = new LikeSystem(
			this.photographerData.totalLikes,
		);

		// Create and append the photographer filter section
		const filterSection = new PhotographerFilterSection(
			this.photographerData.media,
		);
		const sectionElement =
			filterSection.createPhotogFilterSection();
		this.main.appendChild(sectionElement);

		const photographerMediaSection =
			document.createElement('section');
		photographerMediaSection.classList.add('photographer-media');
		this.main.appendChild(photographerMediaSection);

		// Display media sorted by default option (Popularity)
		this.displayPhotographerMedia(
			MediaFilter.sortMedia(
				this.photographerData.media,
				'Popularité',
			),
		);

		this.displayTotalLikesAndPrice(
			this.photographerData.totalLikes,
			this.photographerData.photographer.price,
		);

		// Add event listener for filter changes
		sectionElement
			.querySelector('#choice')
			.addEventListener('click', (event) => {
				if (event.target.tagName === 'LI') {
					const selectedOption = event.target.textContent;
					this.displayPhotographerMedia(
						MediaFilter.sortMedia(
							this.photographerData.media,
							selectedOption,
						),
					);
				}
			});
	}
}

// Initialize the PhotographerPage class and start the page initialization process
const photographerPage = new PhotographerPage();
photographerPage.init();
