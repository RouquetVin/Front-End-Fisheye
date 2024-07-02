// Creation of the MediaFilter class
export class MediaFilter {
	// Sort media based on the selected filter option
	static sortMedia(media, option) {
		if (option === 'Popularité') {
			return media.sort((a, b) => b.likes - a.likes);
		} else if (option === 'Date') {
			return media.sort(
				(a, b) => new Date(b.date) - new Date(a.date),
			);
		} else if (option === 'Titre') {
			return media.sort((a, b) =>
				a.title.localeCompare(b.title),
			);
		}
		return media;
	}
}
