const updatePostHandler = async (event) => {
	if (event.target.id === 'update-btn') {
		const id = event.target.getAttribute('data-id');
		const title = document.querySelector('#updated-title').value.trim();
		const post_content = document.querySelector('#updated-content').value.trim();
		console.log(id);
		console.log(title);
		console.log(post_content);
		try {
			const response = await fetch(`/api/posts/${id}`, {
				method: 'PUT',
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
				alert(`${response.statusText}: Failed to update post.`);
				console.log(...response);
			}
		} catch (err) {
			console.log(err);
		}
	}
};

document.querySelector('#edit-post-form').addEventListener('submit', updatePostHandler);
