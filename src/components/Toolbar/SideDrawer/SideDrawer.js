import React from 'react'
import Navigation from '../Navigation/Navigation'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo'

import classes from './SideDrawer.module.css'

const sideDrawer = props => {
    const drawerClasses = [classes.SideDrawer, classes.Close]

    if (props.show)
        drawerClasses.splice(1, 1, classes.Open)

    return (
        <React.Fragment>
            <div className={drawerClasses.join(' ')}>
                <Logo height="10%" />
                <nav>
                    <Navigation />
                </nav>
            </div>
            <Backdrop
                show={props.show}
                onClick={props.hideSideDrawer} />
        </React.Fragment>
    )
}

export default sideDrawer;