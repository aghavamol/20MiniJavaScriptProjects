const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

username.addEventListener('blur', (event) => {
	checkLength(username, 4, 15);
});

email.addEventListener('blur', (event) => {
	checkEmail(email);
});

password.addEventListener('blur', (event) => {
	checkLength(password, 6, 20);
});

password2.addEventListener('blur', (event) => {
	checkPasswords(password, password2);
});

const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';

	const smallTag = formControl.querySelector('small');
	smallTag.innerText = message;
};

const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

const checkEmail = (input) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	}
};

const checkRequired = (inputs) => {
	inputs.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
};

const checkLength = (input, min, max) => {
	if (input.value.trim().length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.trim().length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
};

const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkPasswords = (input1, input2) => {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match');
	} else if (input1.value === input2.value && input2.value !== '') {
		showSuccess(input2);
	}
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	checkRequired([username, email, password, password2]);
	checkLength(username, 4, 15);
	checkLength(password, 6, 20);
	checkEmail(email);
	checkPasswords(password, password2);
});
