window.onload = () => {
	addFormValidationsListeners();
};

function addFormValidationsListeners() {
	const forms = document.getElementsByClassName("validation-form");
	for(let form of forms) {
		form.addEventListener("submit", (event) => {
			let valid = true;
			for(let box of form.getElementsByClassName("validation-box")) {
				let input = box.querySelector(".validation-input");
				let error = box.querySelector(".validation-error");
				if(input == null || error == null)
					continue;
				error.style.visibility = "visible";
				let validatedInput = validateInput(input);
				if(validateInput(input) !== true) {
					valid = false;
					error.innerHTML = validatedInput;
				}
				else {
					error.innerHTML = "Looks good!";
				}
			}
			if(!valid) {
				event.preventDefault();
			}
		});
	}
}

// Returns true if the input is valid and an error-message string if it is not
function validateInput(input) {
	if(input.validity.valid)
		return true;
	return String(input.validationMessage);
}

