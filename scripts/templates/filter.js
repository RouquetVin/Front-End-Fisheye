// Creation of the PhotographerFilterSection
export class PhotographerFilterSection {
	constructor(photogMedias = []) {
		// Initialize the properties with the provided data
		this._photogMedias = photogMedias;
		// Define the sorting options
		this.options = ['Popularité', 'Date', 'Titre'];
	}

	createPhotogFilterSection() {
		// Create the main section element for the filter
		const photogFilterSection = document.createElement('section');
		photogFilterSection.classList.add('filter_container');
		photogFilterSection.setAttribute('role', 'region');

		// Set the inner HTML for the filter section
		photogFilterSection.innerHTML = `
            <div class='btn_container'>
                <label id="filterLabel" for="choice">Trier par</label>
                <button id='open_filter' aria-haspopup="listbox" aria-expanded="false" aria-labelledby="filterLabel currentSelection" aria-selected="true" role="option">
                    <span id="currentSelection">${this.options[0]}</span>
                    <em class="arrows fas fa-chevron-down"></em>
                </button>
            </div>
            <div class='select_container'>
                <ul id='choice' role="listbox" aria-labelledby="filterLabel"></ul>
            </div>
        `;

		// Creates a live region to announce changes to screen readers
		const liveRegion = document.createElement('div');
		liveRegion.setAttribute('aria-live', 'polite');
		liveRegion.classList.add('sr-only');
		photogFilterSection.appendChild(liveRegion);

		// Initialize the elements for the filter button and option list
		const openFilterButton =
			photogFilterSection.querySelector('#open_filter');
		const selectContainer = photogFilterSection.querySelector(
			'.select_container',
		);
		const choiceList =
			photogFilterSection.querySelector('#choice');
		const currentSelection = photogFilterSection.querySelector(
			'#currentSelection',
		);

		// Function to update the list of options based on the selected option
		const updateOptions = (selectedOption) => {
			choiceList.innerHTML = '';
			this.options.forEach((option) => {
				if (option !== selectedOption) {
					// Create a list item for each unselected option
					const listItem = document.createElement('li');
					listItem.setAttribute('role', 'option');
					listItem.setAttribute('tabindex', '-1');
					listItem.setAttribute('aria-selected', 'false');
					listItem.textContent = option;
					listItem.setAttribute('aria-label', option);
					const hr = document.createElement('hr');
					listItem.addEventListener('click', () => {
						// Update the selected option and toggle the dropdown
						currentSelection.textContent = option;
						liveRegion.textContent = `Trié par ${option}`;
						openFilterButton.setAttribute(
							'aria-labelledby',
							`filterLabel currentSelection`,
						);
						selectContainer.classList.remove('active');
						openFilterButton.style.borderRadius = '5px';
						updateOptions(option);
						const icon =
							openFilterButton.querySelector('.arrows');
						icon.classList.remove('fa-chevron-up');
						icon.classList.add('fa-chevron-down');
						openFilterButton.setAttribute(
							'aria-expanded',
							'false',
						);
						openFilterButton.focus();
					});
					choiceList.appendChild(hr);
					choiceList.appendChild(listItem);
				}
			});
		};

		// Function to toggle the visibility of the dropdown menu
		const toggleMenu = () => {
			const expanded =
				selectContainer.classList.toggle('active');
			const icon = openFilterButton.querySelector('.arrows');
			openFilterButton.setAttribute('aria-expanded', expanded);
			if (expanded) {
				icon.classList.remove('fa-chevron-down');
				icon.classList.add('fa-chevron-up');
				openFilterButton.style.borderRadius = '5px 5px 0 0';
				// Set tabindex="0" for visible list items
				choiceList.querySelectorAll('li').forEach((item) => {
					item.setAttribute('tabindex', '0');
				});
				const firstItem = choiceList.querySelector('li');
				if (firstItem) firstItem.focus();
			} else {
				icon.classList.remove('fa-chevron-up');
				icon.classList.add('fa-chevron-down');
				openFilterButton.style.borderRadius = '5px';
				// Set tabindex="-1" for hidden list items
				choiceList.querySelectorAll('li').forEach((item) => {
					item.setAttribute('tabindex', '-1');
				});
				openFilterButton.focus();
			}
		};

		// Add event listener to the filter button to toggle the dropdown visibility
		openFilterButton.addEventListener('click', toggleMenu);

		// Function to handle keyboard navigation within the dropdown
		const handleKeyDown = (e) => {
			const items = [
				openFilterButton,
				...choiceList.querySelectorAll('li'),
			];
			let index = items.indexOf(document.activeElement);

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				index = (index + 1) % items.length;
				items[index].focus();
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				index = (index - 1 + items.length) % items.length;
				items[index].focus();
			} else if (e.key === 'Enter') {
				e.preventDefault();
				if (document.activeElement.tagName === 'LI') {
					document.activeElement.click();
				} else if (
					document.activeElement === openFilterButton
				) {
					toggleMenu();
				}
			} else if (e.key === 'Escape') {
				selectContainer.classList.remove('active');
				openFilterButton.style.borderRadius = '5px';
				const icon =
					openFilterButton.querySelector('.arrows');
				icon.classList.remove('fa-chevron-up');
				icon.classList.add('fa-chevron-down');
				openFilterButton.setAttribute(
					'aria-expanded',
					'false',
				);
				openFilterButton.focus();
			}
		};

		// Add event listener for keyboard navigation
		document.addEventListener('keydown', handleKeyDown);

		// Initialize the options list with the first option selected
		updateOptions(this.options[0]);

		// Return the constructed filter section
		return photogFilterSection;
	}
}
