const addPostHandler = async (event) => {
	event.preventDefault();
	const title = document.querySelector('#post-title').value.trim();
	const post_content = document.querySelector('#post-content').value.trim();
	// const user_id = session.Cookie.user_id;
	console.log(title);
	console.log(post_content);
	if (title && post_content) {
		const response = await fetch('/api/posts', {
			method: 'post',
			credentials: 'include',
			body: JSON.stringify({
				title,
				post_content,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

document.querySelector('#add-post-form').addEventListener('submit', addPostHandler);
