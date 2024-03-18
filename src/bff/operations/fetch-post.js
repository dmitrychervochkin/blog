import { getPost } from '../api/get-post';
import { getPostCommentsWithAuthor } from '../utils';

export const fetchPost = async (postId) => {
	let error;
	let post;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return { error, res: null };
	}

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: { ...post, comments: commentsWithAuthor },
	};
};
