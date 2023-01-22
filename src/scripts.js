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
				let validatedInput = validateInput(input);
				if(validateInput(input) !== true) {
					valid = false;
					error.innerHTML = validatedInput;
				}
				else {
					error.innerHTML = "Looks good!";
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
	const specialChars = '/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]+/;';
	switch(input.id) {
		case "signup-id":
			let id = input.value;
			let lastChar = id.charAt(id.length - 1);
			if(!(id.length >= 5 && id.length <= 12))
				return "ID has to be between 5 and 12 characters!";
			if(!id.charAt(0).match(/[A-Z]/))
				return "First character of ID has to be a capital letter!";
			if(!(lastChar.match(/\d/) || specialChars.includes(lastChar)))
				return "Last character has to be a number or a special character!";
			return true;
		case "signup-name":
			if(!input.value.match(/^[a-zA-Z ]+$/))
				return "Please enter a valid name (only characters and spaces)!";
			return true;
		case "signup-email":
			if(!input.value.match(/^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]+$/))
				return "Please enter a valid email address!"
			return true;
		case "signup-password":
			const password = input.value;
			if(password.length < 12)
				return "Password length must be at least 12 characters!";
			let hasUppercase = false;
			let hasLowercase = false;
			let hasDigit = false;
			let hasSymbol = false;
			for(let c of password) {
				if(c.match(/[A-Z]/))
					hasUppercase = true;
				if(c.match(/[a-z]/))
					hasLowercase = true;
				if(c.match(/\d/))
					hasDigit = true;
				if(specialChars.includes(c))
					hasSymbol = true;
			}
			if(!(hasUppercase && hasLowercase && hasDigit && hasSymbol))
				return "Password must include an uppercase character, a lowercase character, a digit and a special symbol";
			return true;
		case "signup-zip":
			if(!input.value.match(/^\d{4}[ ]*[A-Z]{2}$/))
				return "Please enter a valid Netherlands ZIP Code!";
			return true;
		case "signup-country":
			if(input.value === "")
				return "Please select a country!";
			return true;
		case "signup-language":
			if(input.value === "")
			return "Please select a language!";
		return true;
		case "signup-sex":
			if(input.value === "")
			return "Please select a sex!";
		return true;
	}
	return true;
}

