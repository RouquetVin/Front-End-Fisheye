export class PhotographerFilterSection {
	constructor(photogDataMById = [], photogDataById = []) {
		this._photogMedias = photogDataMById;
		this._photographers = photogDataById;
		this.options = ['Popularité', 'Date', 'Titre'];
	}

	createPhotogFilterSection() {
		const photogFilterSection = document.createElement('section');
		photogFilterSection.classList.add('filter_container');

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

		// Initializing elements
		const openFilterButton =
			photogFilterSection.querySelector('#open_filter');
		const selectContainer = photogFilterSection.querySelector(
			'.select_container',
		);
		const choiceList =
			photogFilterSection.querySelector('#choice');

		// Function to update the list of options
		const updateOptions = (selectedOption) => {
			choiceList.innerHTML = '';
			this.options.forEach((option) => {
				if (option !== selectedOption) {
					const listItem = document.createElement('li');
					listItem.textContent = option;
					const hr = document.createElement('hr');
					listItem.addEventListener('click', () => {
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

		updateOptions(this.options[0]);

		return photogFilterSection;
	}
}
