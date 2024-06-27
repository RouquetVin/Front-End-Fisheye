document.addEventListener('DOMContentLoaded', function () {
	// DOM Elements
	const modal = document.getElementById('contact_modal');
	const contactButton = document.querySelector('.contact_button');
	const closeModalButton = document.querySelector('.cls');
	const firstname = document.getElementById('prenom');
	const lastname = document.getElementById('nom');
	const email = document.getElementById('email');
	const message = document.getElementById('message');
	const form = document.querySelector('form');
	const main = document.querySelector('main');

	// Display modal
	function displayModal() {
		modal.style.display = 'flex';
	}

	contactButton.addEventListener('click', displayModal);

	// Close modal
	function closeModal() {
		modal.style.display = 'none';
	}

	closeModalButton.addEventListener('click', closeModal);

	// Function to display an error message
	function displayErrorMessage(element, message) {
		element.parentElement.setAttribute(
			'data-error-visible',
			'true',
		);
		element.parentElement.setAttribute('data-error', message);
	}

	// Function to hide an error message
	function hideErrorMessage(element) {
		element.parentElement.removeAttribute('data-error-visible');
		element.parentElement.removeAttribute('data-error');
	}

	// Validation for the first name and the last name
	function validateInfo(info, errorMessage) {
		if (info.value.trim().length < 2) {
			displayErrorMessage(info, errorMessage);
			return false;
		}

		hideErrorMessage(info);
		return true;
	}

	// Validation for the email
	function validateEmail(email) {
		const emailValue = email.value.trim();
		const emailRegExp = new RegExp(
			'^[a-zA-Z0-9._-]{2,64}@[a-zA-Z0-9.-]{2,252}\\.[a-z]{2,4}$',
		);
		if (!emailRegExp.test(emailValue)) {
			displayErrorMessage(
				email,
				'Veuillez renseigner une adresse mail valide.',
			);
			return false;
		}

		hideErrorMessage(email);
		return true;
	}

	// Validation of the form
	function validateForm() {
		const isFirstNameValid = validateInfo(
			firstname,
			'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
		);
		const isLastNameValid = validateInfo(
			lastname,
			'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
		);
		const isEmailValid = validateEmail(email);
		const isMessageValid = validateInfo(
			message,
			'Veuillez entrer 2 caractères ou plus pour le champ du message.',
		);

		return (
			isFirstNameValid &&
			isLastNameValid &&
			isEmailValid &&
			isMessageValid
		);
	}

	// Display and close success modal
	function showSuccessModal() {
		const container = document.createElement('div');
		container.id = 'contact_modal';
		container.style.display = 'flex';
		main.appendChild(container);
		container.innerHTML = `
		<div class="modal">
		  <div class="close">
			<img src="assets/icons/close.svg" alt="Croix de fermeture" class="close-btn">
		  </div>
		  <div class="title-btn">
			<h2>Votre message a bien été envoyé.</h2>
			<button class="contact_button close-btn">Fermer</button>
		  </div>
		</div>
	  `;

		const closeBtns = container.querySelectorAll('.close-btn');
		closeBtns.forEach((closeBtn) => {
			closeBtn.addEventListener('click', () => {
				container.remove();
			});
		});
	}

	// Form submission validation and handling
	function validate(e) {
		e.preventDefault();

		if (validateForm()) {
			showSuccessModal();
			modal.style.display = 'none';
			form.reset();
		}
	}

	// Add event listener to the form
	form.addEventListener('submit', validate);
});
