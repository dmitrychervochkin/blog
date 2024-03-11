import { transformPost } from '../transformers';

export const getPosts = () =>
	fetch('http://localhost:3005/posts')
		.then((loadedUPost) => loadedUPost.json())
		.then((loadedUPost) => loadedUPost && loadedUPost.map(transformPost));
