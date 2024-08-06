document.addEventListener('DOMContentLoaded', function () {
	// DOM Elements
	const body = document.querySelector('body');
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
	}

	// Function to display the modal
	function displayModal() {
		modal.style.display = 'flex';
		modal.setAttribute('aria-hidden', 'false');
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
		const errorId = `${element.id}-error`;
		let errorElement = document.getElementById(errorId);

		if (!errorElement) {
			errorElement = document.createElement('div');
			errorElement.id = errorId;
			errorElement.className = 'error-message';
			errorElement.setAttribute('role', 'alert');
			element.parentElement.appendChild(errorElement);
		}

		errorElement.textContent = message;
		element.setAttribute('aria-describedby', errorId);
		element.classList.add('error');
	}

	// Function to hide an error message
	function hideErrorMessage(element) {
		const errorId = `${element.id}-error`;
		const errorElement = document.getElementById(errorId);

		if (errorElement) {
			errorElement.remove();
		}

		element.removeAttribute('aria-describedby');
		element.classList.remove('error');
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
		container.setAttribute('role', 'dialog');
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

		const liveRegion = document.getElementById('live-region');
		if (liveRegion) {
			liveRegion.textContent =
				'Votre message a bien été envoyé.';
		}

		const closeBtns = container.querySelectorAll('.close-btn');
		closeBtns.forEach((closeBtn) => {
			closeBtn.addEventListener('click', () => {
				closeSuccessModal(container);
			});
			closeBtn.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' || e.key === 'Enter') {
					closeSuccessModal(container);
				}
			});
		});

		document.addEventListener(
			'keydown',
			successModalTrapFocusHandler,
		);
		closeBtns[0].focus();
	}

	// Function to close the success modal
	function closeSuccessModal(container) {
		container.remove();
		container.setAttribute('aria-hidden', 'true');

		// contactButton.focus();
		setTimeout(() => {
			contactButton.focus();
		}, 100);

		document.removeEventListener(
			'keydown',
			successModalTrapFocusHandler,
		);
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
