import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				type="search"
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};
export const Search = styled(SearchContainer)`
	display: flex;
	width: 340px;
	height: 30px;
	margin: 7px auto 7px;
	position: relative;

	& > div {
		position: absolute;
		right: 7px;
		top: 5px;
	}

	& > input {
		padding: 10px 40px 10px 10px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
