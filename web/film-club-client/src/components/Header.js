import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Heading } from 'grommet';

const Header = (props) => (
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
      position: 'fixed',
      top: '0px',
      left: '0px',
    }}
    {...props}
  >
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Button plain={true} focusIndicator={false} color="dark-1">
        <Heading level="1" margin="none">
          FilmClub
        </Heading>
      </Button>
    </Link>
  </Box>
);

export default Header;
