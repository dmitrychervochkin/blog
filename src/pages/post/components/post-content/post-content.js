import styled from 'styled-components';
import { H2, Icon } from '../../../../components';

const PostContentContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="fa-calendar-o" margin="0 8px 0 0" size="18px" onClick={() => {}} />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id="fa-pencil-square-o" margin="0 10px 0 0" size="21px" onClick={() => {}} />
					<Icon id="fa-trash-o" size="21px" onClick={() => {}} />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		width: 280px;
		height: 150px;
		margin-right: 20px;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 10px;
	}

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .buttons {
		display: flex;
	}

	& .post-text {
		font-size: 18px;
	}
`;
