import React, { useState } from 'react'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../Toolbar/SideDrawer/SideDrawer'

import classes from './Layout.module.css'

const Layout = props => {
    const [sideDrawerShow, toggleSideDrawerShow] = useState(false)

    const hideSideDrawer = () => {
        toggleSideDrawerShow(false);
    }

    return (
        <div className={classes.Layout}>
            <Toolbar showSideDrawer={() => { toggleSideDrawerShow(true) }} />
            <SideDrawer
                show={sideDrawerShow}
                hideSideDrawer={hideSideDrawer} />
            <main>
                {props.children}
            </main>
            <footer>
                <code>Designed and developed by Vsevolod Petrovich</code>
            </footer>
        </div>
    )
}

export default Layout