import React from 'react'
import logoImage from '../../assets/img/burger-logo.png'
import classes from './Logo.module.css';

const logo = props => (
    <img
        src={logoImage}
        alt="My Burger"
        className={classes.Logo}
        style={{
            height: props.height
        }}></img>
)

export default logo;