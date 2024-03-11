import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { PostContent, Comments, PostForm } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isEditing = useMatch('/post/:id/edit');

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [params.id, dispatch, requestServer]);

	return (
		<div className={className}>
			{isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
