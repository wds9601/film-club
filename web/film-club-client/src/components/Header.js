import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Box, Heading } from 'grommet';

const Header = props => (
	<Box
		as="header"
		direction="row"
		width="100%"
		align="center"
		justify="between"
		background="accent-4"
		pad={{ horizontal: 'medium', vertical: 'small' }}
		margin={{ bottom: 'xsmall' }}
		style={{
			zIndex: '1',
			position: 'fixed'
		}}
		{...props}
	>
		<Link to="/" style={{ textDecoration: 'none' }}>
			<Anchor path="/" tag="home" color="dark-2">
				<Heading level="1" margin="none">
					FilmClub
				</Heading>
			</Anchor>
		</Link>
	</Box>
);

export default Header;
