import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();
	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						disabled={isSaveButtonDisabled}
						id="fa-floppy-o"
						margin="0 0 0 10px"
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 14px;
		margin: 3px 0 3px 0;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
