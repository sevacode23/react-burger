import React from 'react'
import NavItem from './NavItem/NavItem'

import classes from './Navigation.module.css'

const navigation = props => {
    return (
        <ul className={classes.Navigation}>
            <NavItem link="/" exact>Burger Builder</NavItem>
            <NavItem link="/orders">My Orders</NavItem>
        </ul>
    )
}

export default navigation