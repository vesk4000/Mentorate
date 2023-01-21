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
				if(!input.validity.valid) {
					valid = false;
					error.innerHTML = String(input.validationMessage);
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

