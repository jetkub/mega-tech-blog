const loginFormHandler = async (event) => {
	event.preventDefault();
	const username = document.querySelector('#login-username').value.trim();
	const password = document.querySelector('#login-password').value.trim();

	if (username && password) {
		// send a POST request to the API endpoint
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			// if successful, redirect the browser to the profile page
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
