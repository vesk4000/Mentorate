let specialChars = '/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]+/;';

function validateID(id) {
	if(id !== String(id))
		return false;
	let lastChar = id.charAt(id.length - 1);
	if(
			id.length >= 5
			&& id.length <= 12
			&& id.charAt(0).match(/[A-Z]/)
			&& id.charAt(id.length - 1)
			&& (lastChar.match(/\d/) || specialChars.includes(lastChar))
	) return true;
	return false;
}

//console.log(validateID("C78567ds6R%"));


function validatePassword(password) {
	if(password !== String(password) && password.length < 12)
		return false;
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
	return hasUppercase && hasLowercase && hasDigit && hasSymbol;
}

//console.log(validatePassword("qwW%erty1234567"));

function validateName(name) {
	if(name !== String(name) || !name.match(/^[a-zA-Z ]+$/))
		return false;
	return true;
}

//console.log(validateName("Veselin Mitev"));

function validateZIPCode(code) {
	if(code !== String(code) || !code.match(/^\d{4}[ ]*[A-Z]{2}$/))
		return false;
	return true;
}

//console.log(validateZIPCode("2628LV"));

function validateEmail(email) {
	if(email != String(email) || !email.match(/^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]+$/))
		return false;
	return true;
}

/*console.log(validateEmail("veskmail@gmail.com"));
console.log(validateEmail("asavova@abv.bg"));
console.log(validateEmail("blah@gov@gov"));*/