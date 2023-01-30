const logout = async () => {
	const response = await fetch('/api/users/logout', {
		method: 'post',
		body: JSON.stringify({}),
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
		response.redirect('/');
		console.log(response);
	} else {
		alert(response.statusText);
		console.log(response);
	}
};

document.querySelector('#logout').addEventListener('click', logout);