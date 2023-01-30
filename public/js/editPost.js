const updatePostHandler = async (event) => {
	// if the event target matches on id that starts with 'update-btn-'
	if (event.target.matches('button[id^=\'update-btn-\']')) {
		const id = event.target.getAttribute('data-id');
		const title = document.querySelector(`#updated-title-${id}`).value.trim();
		const post_content = document.querySelector(`#updated-content-${id}`).value.trim();
		console.log(id);
		console.log(title);
		console.log(post_content);
		try {
			const response = await fetch(`/api/posts/${id}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					title: title,
					post_content: post_content,
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

const updateBtns = document.querySelectorAll('button[id^=\'update-btn\']');
if (updateBtns) {
	updateBtns.forEach((btn) => {
		btn.addEventListener('click', updatePostHandler);
	});
}
