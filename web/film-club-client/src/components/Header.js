import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Button, Heading } from 'grommet'
import { Search } from 'grommet-icons'


const Header = (props) => (
    <Box 
        as="header"
        direction="row"
        width="100%"
        align="center"
        justify="between"
        background="accent-4"
        pad={{horizontal: "medium", vertical: 'small'}}
        margin={{bottom: 'xsmall'}}
        style={{ 
            zIndex: '1',
            position: 'fixed'
        }}
        {...props}
        >
            {/* <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} /> */}
            <Link to={"/"}>
                <Heading level="1" margin='none'>FilmClub</Heading>
            </Link>
            <Button icon={<Search />} />
        </Box>
    )

export default Header