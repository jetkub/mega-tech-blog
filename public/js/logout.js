const logout = async () => {
	const response = await fetch('/api/users/logout', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
		document.location.replace('/');
		console.log(response);
	} else {
		alert(response.statusText);
		console.log(response);
	}
};

document.querySelector('#logout').addEventListener('click', logout);