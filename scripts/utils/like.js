export class LikeSystem {
	constructor(totalLikes) {
		this.totalLikes = totalLikes;
	}

	handleLikeClick(likesCountElement, heartElement) {
		const isLiked = heartElement.classList.contains('liked');
		const currentLikes = parseInt(
			likesCountElement.textContent,
			10,
		);

		likesCountElement.textContent = isLiked
			? currentLikes - 1
			: currentLikes + 1;
		this.totalLikes += isLiked ? -1 : 1;
		this.updateTotalLikes();

		heartElement.classList.toggle('liked', !isLiked);
	}

	updateTotalLikes() {
		const totalLikesElement = document.querySelector(
			'.counterHeart_bloc p',
		);
		totalLikesElement.textContent = this.totalLikes;
	}
}
