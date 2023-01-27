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

document.querySelector('#post-list').addEventListener('click', deletePostHandler);
