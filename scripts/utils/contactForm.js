document.addEventListener('DOMContentLoaded', function () {
	// DOM Elements
	const body = document.querySelector('body');
	const header = document.querySelector('.header');
	const main = document.querySelector('main');
	const modal = document.querySelector('.contact_modal');
	const closeModalButton = document.querySelector('.cls');
	const form = document.querySelector('form');
	const inputs = document.querySelectorAll('input');
	const firstname = document.getElementById('prenom');
	const lastname = document.getElementById('nom');
	const email = document.getElementById('email');
	const message = document.getElementById('message');
	const contactButton = document.querySelector('.contact_button');
	const submitButton = document.querySelector(
		'button[type="submit"]',
	);

	// Helper function to get all focusable elements within a container
	function getFocusableElements(container) {
		return container.querySelectorAll(
			'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
		);
	}

	// Function to trap focus inside a container
	function trapFocus(e, container) {
		const focusableElements = getFocusableElements(container);
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement =
			focusableElements[focusableElements.length - 1];

		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (
					document.activeElement === firstFocusableElement
				) {
					e.preventDefault();
					lastFocusableElement.focus();
				}
			} else {
				if (document.activeElement === lastFocusableElement) {
					e.preventDefault();
					firstFocusableElement.focus();
				}
			}
		}

		// Handle arrow keys to prevent focus leaving the modal
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const focusIndex = Array.prototype.indexOf.call(
				focusableElements,
				document.activeElement,
			);

			if (e.key === 'ArrowDown') {
				const nextElement =
					focusableElements[focusIndex + 1] ||
					firstFocusableElement;
				if (nextElement) {
					nextElement.focus();
				}
			}

			if (e.key === 'ArrowUp') {
				const prevElement =
					focusableElements[focusIndex - 1] ||
					lastFocusableElement;
				if (prevElement) {
					prevElement.focus();
				}
			}
		}
	}

	// Function to display the modal
	function displayModal() {
		modal.style.display = 'flex';
		modal.setAttribute('aria-hidden', 'false');
		header.setAttribute('aria-hidden', 'true');
		main.setAttribute('aria-hidden', 'true');
		closeModalButton.focus();
		document.addEventListener('keydown', trapFocusHandler);
	}

	// Add event listeners to open the modal when the contact button is clicked or pressed
	contactButton.addEventListener('click', displayModal);
	contactButton.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			displayModal();
		}
	});

	// Function to close the modal
	function closeModal() {
		modal.style.display = 'none';
		modal.setAttribute('aria-hidden', 'true');
		header.setAttribute('aria-hidden', 'false');
		main.setAttribute('aria-hidden', 'false');
		inputs.forEach((input) => {
			hideErrorMessage(input);
		});
		hideErrorMessage(message);
		contactButton.focus();
		document.removeEventListener('keydown', trapFocusHandler);
	}

	// Add event listeners to close the modal when the close button is clicked or pressed
	closeModalButton.addEventListener('click', closeModal);
	closeModalButton.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' || e.key === 'Enter') {
			e.preventDefault();
			closeModal();
		}
	});

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

	// Function to validate the form
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

	// Function to display a success modal after form submission
	function showSuccessModal() {
		const container = document.createElement('div');
		container.classList.add('contact_modal');
		container.setAttribute('aria-hidden', 'false');
		header.setAttribute('aria-hidden', 'true');
		main.setAttribute('aria-hidden', 'true');
		container.style.display = 'flex';
		body.appendChild(container);
		container.innerHTML = `
			<div class="modal">
				<div class="close">
					<img src="assets/icons/close.svg" alt="" class="close-btn" tabindex="0" aria-label="Fermer la modale">
				</div>
				<div class="title-btn">
					<h2>Votre message a bien été envoyé.</h2>
					<button type="button" class="contact_button close-btn" aria-label="Fermer la modale">Fermer</button>
				</div>
			</div>
		`;

		const closeBtns = container.querySelectorAll('.close-btn');
		closeBtns.forEach((closeBtn) => {
			closeBtn.addEventListener('click', () => {
				container.remove();
				container.setAttribute('aria-hidden', 'true');
				header.setAttribute('aria-hidden', 'false');
				main.setAttribute('aria-hidden', 'false');
				contactButton.focus();
				document.removeEventListener(
					'keydown',
					successModalTrapFocusHandler,
				);
			});
			closeBtn.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' || e.key === 'Enter') {
					container.remove();
					container.setAttribute('aria-hidden', 'true');
					header.setAttribute('aria-hidden', 'false');
					main.setAttribute('aria-hidden', 'false');
					contactButton.focus();
					document.removeEventListener(
						'keydown',
						successModalTrapFocusHandler,
					);
				}
			});
		});

		document.addEventListener(
			'keydown',
			successModalTrapFocusHandler,
		);
		closeBtns[0].focus();
	}

	// Form submission validation and handling
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (validateForm()) {
			closeModal();
			showSuccessModal();
			console.log({
				firstname: firstname.value.trim(),
				lastname: lastname.value.trim(),
				email: email.value.trim(),
				message: message.value.trim(),
			});
			form.reset();
		}
	});

	// Prevent form submission when pressing Enter key on the submit button
	form.addEventListener('keydown', (e) => {
		if (
			e.key === 'Enter' &&
			document.activeElement === submitButton
		) {
			submitButton.click();
		}
	});

	// Trap focus handlers for both modals
	function trapFocusHandler(e) {
		trapFocus(e, modal);
	}

	// Event handler to trap focus within the success modal
	function successModalTrapFocusHandler(e) {
		const successModal = document.querySelector(
			'.contact_modal[aria-hidden="false"]',
		);
		if (successModal) {
			trapFocus(e, successModal);
		}
	}
});
