// Creation of the initLightbox function
export function initLightbox() {
	// DOM elements
	const lightboxContainer = document.querySelector(
		'.lightbox-container',
	);
	const closeBtn = document.querySelector('.lightbox-close');
	const prevBtn = document.querySelector('.lightbox-prev');
	const nextBtn = document.querySelector('.lightbox-next');
	const imageContainer = document.querySelector(
		'.lightbox-image-container',
	);

	// Initialize the current index to keep track of the currently displayed media item
	let currentIndex = 0;
	// Array to store media items that will be shown in the lightbox
	let mediaItems = [];
	// Array to store titles for each media item in the lightbox
	let mediaTitles = [];

	// Function to open the lightbox with the media at the given index
	function openLightbox(index) {
		currentIndex = index;
		const mediaItem = mediaItems[index];
		const mediaTitle = mediaTitles[index];
		imageContainer.innerHTML = '';
		const mediaElement = mediaItem.cloneNode(true);

		imageContainer.appendChild(mediaElement);

		const mediaTitleElement = document.createElement('div');
		mediaTitleElement.classList.add('lightbox-title');
		mediaTitleElement.textContent = mediaTitle;

		imageContainer.appendChild(mediaTitleElement);

		lightboxContainer.classList.add('visible');
	}

	// Function to close the lightbox
	function closeLightbox() {
		lightboxContainer.classList.remove('visible');
	}

	// Function to show the next media item in the lightbox
	function showNextMedia() {
		currentIndex = (currentIndex + 1) % mediaItems.length;
		openLightbox(currentIndex);
	}

	// Function to show the previous media item in the lightbox
	function showPrevMedia() {
		currentIndex =
			(currentIndex - 1 + mediaItems.length) %
			mediaItems.length;
		openLightbox(currentIndex);
	}

	// Add event listeners for closing the lightbox, and navigating to the next and previous media items
	closeBtn.addEventListener('click', closeLightbox);
	nextBtn.addEventListener('click', showNextMedia);
	prevBtn.addEventListener('click', showPrevMedia);

	return {
		// Method to add a media item to the lightbox
		addMediaItem: (mediaItem, title) => {
			const index = mediaItems.length;
			mediaItems.push(mediaItem);
			mediaTitles.push(title);
			mediaItem.addEventListener('click', () =>
				openLightbox(index),
			);
		},
	};
}
