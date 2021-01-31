import React from 'react'
import { Box } from 'grommet'


const Header = (props) => (
    <Box 
        as="header"
        direction="row"
        width="100%"
        align="center"
        justify="between"
        background="accent-4"
        pad={{"horizontal": "medium", vertical: 'medium'}}
        margin={{bottom: 'large'}}
        elevation="small"
        style={{ 
            zIndex: '1',
            position: 'fixed'
        }}
        {...props}
        />
    )

export default Header