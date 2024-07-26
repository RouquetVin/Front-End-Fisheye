// Creation of the Api class
export class Api {
	// Method to fetch data from a given JSON file path
	static async fetchData(filePath) {
		const response = await fetch(filePath);

		if (!response.ok) {
			throw new Error(
				'Erreur lors de la récupération du fichier JSON',
			);
		}

		return response.json();
	}
}
