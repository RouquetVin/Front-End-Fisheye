// Creation of the PhotographerFilterSection
export class PhotographerFilterSection {
	constructor(photogDataMById = [], photogDataById = []) {
		// Initialize the properties with the provided data
		this._photogMedias = photogDataMById;
		this._photographers = photogDataById;
		// Define the sorting options
		this.options = ['Popularité', 'Date', 'Titre'];
	}

	createPhotogFilterSection() {
		// Create the main section element for the filter
		const photogFilterSection = document.createElement('section');
		photogFilterSection.classList.add('filter_container');

		// Set the inner HTML for the filter section
		photogFilterSection.innerHTML = `
            <div class='btn_container'>
                <label for="choice">Trier par</label>
                <button id='open_filter' type='button'>
                    <span>${this.options[0]}</span>
                    <i class="arrows fas fa-chevron-down"></i>
                </button>
            </div>
            <div class='select_container'>
                <ul id='choice'></ul>
            </div>
        `;

		// Initialize the elements for the filter button and option list
		const openFilterButton =
			photogFilterSection.querySelector('#open_filter');
		const selectContainer = photogFilterSection.querySelector(
			'.select_container',
		);
		const choiceList =
			photogFilterSection.querySelector('#choice');

		// Function to update the list of options based on the selected option
		const updateOptions = (selectedOption) => {
			choiceList.innerHTML = '';
			this.options.forEach((option) => {
				if (option !== selectedOption) {
					// Create a list item for each unselected option
					const listItem = document.createElement('li');
					listItem.textContent = option;
					const hr = document.createElement('hr');
					listItem.addEventListener('click', () => {
						// Update the selected option and toggle the dropdown
						openFilterButton.querySelector(
							'span',
						).textContent = option;
						selectContainer.classList.remove('active');
						openFilterButton.style.borderRadius = '5px';
						updateOptions(option);
						const icon =
							openFilterButton.querySelector('.arrows');
						icon.classList.remove('fa-chevron-up');
						icon.classList.add('fa-chevron-down');
					});
					choiceList.appendChild(hr);
					choiceList.appendChild(listItem);
				}
			});
		};

		// Add event listener to the filter button to toggle the dropdown visibility
		openFilterButton.addEventListener('click', () => {
			selectContainer.classList.toggle('active');
			const icon = openFilterButton.querySelector('.arrows');
			if (selectContainer.classList.contains('active')) {
				icon.classList.remove('fa-chevron-down');
				icon.classList.add('fa-chevron-up');
				openFilterButton.style.borderRadius = '5px 5px 0 0';
			} else {
				icon.classList.remove('fa-chevron-up');
				icon.classList.add('fa-chevron-down');
				openFilterButton.style.borderRadius = '5px';
			}
		});

		// Initialize the options list with the first option selected
		updateOptions(this.options[0]);

		// Return the constructed filter section
		return photogFilterSection;
	}
}
