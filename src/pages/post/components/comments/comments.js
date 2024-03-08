import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../selectors';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync } from '../../../../actions/add-comment-async';

const CommentsConteiner = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState();
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (requestServer, postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					placeholder="Комментарий..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>
				<Icon
					id="fa-paper-plane-o"
					margin="0 0 0 10px"
					size="18px"
					onClick={() => onNewCommentAdd(requestServer, postId, userId, newComment)}
				/>
			</div>

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment id={id} key={id} postId={postId} author={author} content={content} publishedAt={publishedAt} />
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsConteiner)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
		height: 120px;
	}

	& .new-comment textarea {
		width: 550px;
		resize: none;
		font-size: 18px;
	}
`;