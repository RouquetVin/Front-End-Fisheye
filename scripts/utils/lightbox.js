// Creation of the initLightbox function
export function initLightbox() {
	// DOM elements
	const lightboxContainer = document.querySelector(
		'.lightbox-container',
	);
	const closeBtn = document.querySelector('.lightbox-close');
	const prevBtn = document.querySelector('.lightbox-prev');
	const imageContainer = document.querySelector(
		'.lightbox-image-container',
	);
	const nextBtn = document.querySelector('.lightbox-next');

	// Initialize the current index to keep track of the currently displayed media item
	let currentIndex = 0;
	// Array to store media items that will be shown in the lightbox
	let mediaItems = [];
	// Array to store titles for each media item in the lightbox
	let mediaTitles = [];
	// Variable to store the element that triggered the lightbox
	let triggerElement = null;

	// Variable to track if the last interaction was via keyboard
	// eslint-disable-next-line no-unused-vars
	let keyboardInteraction = false;

	// Function to open the lightbox with the media at the given index
	function openLightbox(index) {
		if (triggerElement === null) {
			triggerElement = document.activeElement;
		}
		currentIndex = index;
		const mediaItem = mediaItems[index];
		const mediaTitle = mediaTitles[index];
		imageContainer.innerHTML = '';
		const mediaElement = mediaItem.cloneNode(true);

		// Update the aria-label of the cloned media element
		mediaElement.setAttribute('aria-label', `${mediaTitle}`);

		imageContainer.appendChild(mediaElement);

		const mediaTitleElement = document.createElement('p');
		mediaTitleElement.classList.add('lightbox-title');
		mediaTitleElement.textContent = mediaTitle;

		imageContainer.appendChild(mediaTitleElement);

		lightboxContainer.classList.add('visible');
		lightboxContainer.setAttribute('aria-hidden', 'false');

		closeBtn.focus();

		// Add event listeners to close the lightbox and navigate to the next and previous media items
		closeBtn.addEventListener('click', closeLightbox);
		nextBtn.addEventListener('click', showNextMedia);
		prevBtn.addEventListener('click', showPrevMedia);

		closeBtn.addEventListener('keydown', handleCloseKeydown);
		prevBtn.addEventListener('keydown', handlePrevKeydown);
		nextBtn.addEventListener('keydown', handleNextKeydown);

		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('keydown', trapFocus);
	}

	// Function to close the lightbox
	function closeLightbox() {
		lightboxContainer.classList.remove('visible');
		lightboxContainer.setAttribute('aria-hidden', 'true');

		if (triggerElement) {
			triggerElement.focus();
			triggerElement = null;
		}

		closeBtn.removeEventListener('click', closeLightbox);
		nextBtn.removeEventListener('click', showNextMedia);
		prevBtn.removeEventListener('click', showPrevMedia);
		closeBtn.removeEventListener('keydown', handleCloseKeydown);
		prevBtn.removeEventListener('keydown', handlePrevKeydown);
		nextBtn.removeEventListener('keydown', handleNextKeydown);
		document.removeEventListener('keydown', handleKeydown);
		document.removeEventListener('keydown', trapFocus);
	}

	// Function to show the previous media item in the lightbox
	function showPrevMedia() {
		currentIndex =
			(currentIndex - 1 + mediaItems.length) %
			mediaItems.length;
		openLightbox(currentIndex);
		prevBtn.focus();
	}

	// Function to show the next media item in the lightbox
	function showNextMedia() {
		currentIndex = (currentIndex + 1) % mediaItems.length;
		openLightbox(currentIndex);
		nextBtn.focus();
	}

	// Function to handle keyboard events
	function handleKeydown(e) {
		if (lightboxContainer.classList.contains('visible')) {
			switch (e.key) {
				case 'Escape':
					closeLightbox();
					break;
				case 'ArrowRight':
					e.preventDefault();
					showNextMedia();
					break;
				case 'ArrowLeft':
					e.preventDefault();
					showPrevMedia();
					break;
				default:
					break;
			}
		}
	}

	// Handle keydown event for close button
	function handleCloseKeydown(e) {
		if (e.key === 'Enter') {
			closeLightbox();
		}
	}

	// Handle keydown event for previous button
	function handlePrevKeydown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			showPrevMedia();
			prevBtn.focus();
		}
	}

	// Handle keydown event for next button
	function handleNextKeydown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			showNextMedia();
			nextBtn.focus();
		}
	}

	// Function to trap focus within the lightbox
	function trapFocus(e) {
		const focusableElements = lightboxContainer.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		const firstElement = focusableElements[0];
		const lastElement =
			focusableElements[focusableElements.length - 1];

		if (e.key === 'Tab') {
			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			const activeIndex = Array.prototype.indexOf.call(
				focusableElements,
				document.activeElement,
			);
			const nextIndex =
				(activeIndex + 1) % focusableElements.length;
			focusableElements[nextIndex].focus();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const activeIndex = Array.prototype.indexOf.call(
				focusableElements,
				document.activeElement,
			);
			const prevIndex =
				(activeIndex - 1 + focusableElements.length) %
				focusableElements.length;
			focusableElements[prevIndex].focus();
		}
	}

	// Function to add a media element to the lightbox
	function addMediaItem(mediaItem, title) {
		const index = mediaItems.length;
		mediaItems.push(mediaItem);
		mediaTitles.push(title);

		mediaItem.setAttribute('tabindex', '0');
		mediaItem.setAttribute(
			'aria-label',
			`${title}, ouvrir la lightbox sur ce média`,
		);

		mediaItem.addEventListener('click', () => {
			keyboardInteraction = false;
			openLightbox(index);
		});
		mediaItem.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				keyboardInteraction = true;
				openLightbox(index);
			}
		});
	}

	return {
		addMediaItem,
	};
}

// Initializing the lightbox
document.addEventListener('DOMContentLoaded', () => {
	const lightbox = initLightbox();

	// Adding media items to the lightbox
	const mediaItems = document.querySelectorAll('.media-item');
	mediaItems.forEach((item) => {
		const title = item.getAttribute('data-title');
		lightbox.addMediaItem(item, title);
	});
});
