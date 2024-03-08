import { getUsers } from '../api';
import { getComments } from '../api/get-comments';
import { getPost } from '../api/get-post';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});

	return {
		error: null,
		res: { ...post, comments: commentsWithAuthor },
	};
};
