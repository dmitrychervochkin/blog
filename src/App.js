import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

export const App = () => {
	return (
		<Div className="App">
			<div>123</div>
			<i className="fa fa-address-book" aria-hidden="true"></i>
			<i className="fa fa-battery-three-quarters" aria-hidden="true"></i>
		</Div>
	);
};
// json-server --watch src/db.json --port 3005
