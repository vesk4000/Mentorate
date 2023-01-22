window.onload = () => {
	addFormValidationsListeners();
};

function addFormValidationsListeners() {
	const forms = document.getElementsByClassName("validation-form");
	for(let form of forms) {
		form.addEventListener("submit", (event) => {
			// Iterate through all of the validation-boxes and checks if their inputs are valid
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
					error.innerHTML = `<span class="validation-error-invalid">${validatedInput}</span>`;
				}
				else {
					error.innerHTML = `<span class="validation-error-valid">Looks good!</span>`;
				}
				
			}
			// If all inputs in the form are valid, show an alert box with the values
			if(valid) {
				const data = new FormData(event.target);
				const it = data.entries();
				let ans = "Data received from the form:\n";
				for(let entry of it) {
					ans += String(entry).replace(",", ": ") + "\n";
				}
				alert(ans);
			}
			// Prevent the default behaviour of submitting a form
			event.preventDefault();
		});
	}
}

// Returns true if the input is valid and an error-message string if it is not
function validateInput(input) {
	if(input.validity.valid)
		return true;
	return String(input.validationMessage);
}

