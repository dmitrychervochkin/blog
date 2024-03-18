import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constants';
import PropTypes from 'prop-types';

const CommentContainer = ({ className, id, postId, author, publishedAt, content }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" margin="0 10px 0 0" inactive={true} size="18px" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" inactive={true} margin="0 10px 0 0 " size="18px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon id="fa-trash-o" margin="0 0 0 10px" size="18px" onClick={() => onCommentRemove(id)} />
			)}
		</div>
	);
};
export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 3px 10px;
		border: 1px solid black;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
		justify-content: space-between;
	}

	& .published-at {
		display: flex;
		justify-content: space-between;
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
