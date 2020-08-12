import React from 'react'
import Navigation from './Navigation/Navigation'
import Logo from '../Logo/Logo'
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'

import classes from './Toolbar.module.css'

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.showSideDrawer}/>
            <Logo height="80%" />
            <nav className={classes.DesktopOnly}>
                <Navigation />
            </nav>
        </header>
    )
}

export default toolbar