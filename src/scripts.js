window.onload = () => {
	addFormValidationsListeners();
	addTrackingListeners();
};

// Adds the needed event listeners for validation forms
function addFormValidationsListeners() {
	// Iterate through all validation-forms
	const forms = document.getElementsByClassName("validation-form");
	for(let form of forms) {
		// Add an event that happens when the user submits the form
		form.addEventListener("submit", (event) => {
			// Fill the tracking box with the needed properties
			let trackingBox = document.querySelector(".tracking-box");
			trackingBox.style.visibility = "visible";
			trackingBox.innerHTML =
			`<div>Behavioural tracking:</div>\
			<div>Number of mouse clicks: ${tracking.clicks} </div> \
			<div>Number of key presses: ${tracking.keys} </div> \
			<div>Number of characters typed: ${countNumberOfCharactersTyped()} </div> \
			<div>Total time spent on page: ${Math.floor((Date.now() - tracking.pageLoadTime) / 1000)} second(s) </div> \
			`;
			// Iterate through all of the validation-boxes and checks if their inputs are valid
			let valid = true;
			for(let box of form.getElementsByClassName("validation-box")) {
				let input = box.querySelector(".validation-input");
				let error = box.querySelector(".validation-error");
				if(input == null || error == null)
					continue;
				let validatedInput = validateInput(input);
				if(validateInput(input) !== true) {
					valid = false;
					error.innerHTML = validatedInput;
				}
				else {
					error.innerHTML = "Looks good!";
				}
			}
			// If the form has any invalid inputs, prevent the submition
			if(!valid) {
				event.preventDefault();
			}
		});
	}
}

// Returns the total number of characters in all inputs that are within a .validation-box
function countNumberOfCharactersTyped() {
	let ans = 0;
	document.querySelectorAll(".validation-box").forEach((box) => {
		box.querySelectorAll("input").forEach((input) => {
			if(input.value === String(input.value)) { // Checks input.value is a string
				ans += input.value.length;
			}
		});
	})
	return ans;
}

// Returns true if the input is valid and an error-message string if it is not
function validateInput(input) {
	if(input.validity.valid)
		return true;
	return String(input.validationMessage);
}

// The tracking properties
let tracking = {
	clicks: 0,
	keys: 0,
	pageLoadTime: Date.now(),
};

// Adds the needed tracking listeners to the body (Clicks and Key Presses)
function addTrackingListeners() {
	document.querySelectorAll("body").forEach((e) => {
		e.addEventListener("click", (event) => {
			++tracking.clicks;
		});
		e.addEventListener("keypress", (event) => {
			++tracking.keys;
		});
	});
}