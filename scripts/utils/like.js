// Creation of the LikeSystem class
export class LikeSystem {
	constructor(totalLikes) {
		// Initialize the total number of likes
		this.totalLikes = totalLikes;
	}

	// Handles the click event on the like button
	handleLikeClick(likesCountElement, heartElement) {
		// Check if the heart element has already been clicked (liked)
		const isLiked = heartElement.classList.contains('liked');
		// Retrieve the current number of likes from the DOM element
		const currentLikes = parseInt(
			likesCountElement.textContent,
			10,
		);

		// Update the number of likes for this element in the DOM
		likesCountElement.textContent = isLiked
			? currentLikes - 1
			: currentLikes + 1;

		// Update the total number of likes
		this.totalLikes += isLiked ? -1 : 1;
		// Call the method to update the display of the total number of likes
		this.updateTotalLikes();

		// Add or remove the 'liked' class to visually indicate if the element is liked
		heartElement.classList.toggle('liked', !isLiked);
	}

	// Updates the total number of likes displayed on the page
	updateTotalLikes() {
		// Select the DOM element that displays the total number of likes
		const totalLikesElement = document.querySelector(
			'.counterHeart_bloc p',
		);
		// Update its text content with the total number of likes
		totalLikesElement.textContent = this.totalLikes;
	}
}
