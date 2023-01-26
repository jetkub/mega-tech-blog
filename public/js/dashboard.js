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

const deletePostHandler = async (event) => {
	if (event.target.id === 'del-btn') {
		const id = event.target.getAttribute('data-id');
		console.log(id);
		const response = await fetch(`/api/posts/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(`${response.statusText}: Failed to delete post.`);
		}
	}
};

document.querySelector('#add-post-form').addEventListener('submit', addPostHandler);
document.querySelector('#post-list').addEventListener('click', deletePostHandler);