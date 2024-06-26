// Creation of the MediaFactory class
export class MediaFactory {
	constructor(photogDataMdById, photoDtById) {
		// Determine the type of media (image or video) and set the source path and other properties accordingly
		if (
			Object.prototype.hasOwnProperty.call(
				photogDataMdById,
				'image',
			)
		) {
			this.type = 'image';
			this.src = `../../assets/images/${photoDtById.name}/${photogDataMdById.image}`;
			this.alt = photogDataMdById.title;
		} else if (
			Object.prototype.hasOwnProperty.call(
				photogDataMdById,
				'video',
			)
		) {
			this.type = 'video';
			this.src = `../../assets/images/${photoDtById.name}/${photogDataMdById.video}`;
			this.alt = photogDataMdById.title;
			this.controls = true;
		} else {
			throw new Error('Media inconnu');
		}
	}
}
