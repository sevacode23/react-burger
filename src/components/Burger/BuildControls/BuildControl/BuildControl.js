import React from 'react'

import classes from './BuildControl.module.css';

const buildControl = props => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.onAdd}>Add</button>
        </div>
    )
}

export default buildControl;