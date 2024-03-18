import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { PostContent, Comments, PostForm } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import { RESET_POST_DATA } from '../../actions/reset-post-data';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isEditing = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [params.id, dispatch, requestServer, isCreating]);

	if (isLoading) {
		return null;
	}



	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margin: 40 x 0;
	padding: 0 80px;
`;
