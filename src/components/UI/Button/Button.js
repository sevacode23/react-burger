import React from 'react'

import classes from './Button.module.css'

const button = props => {
    return (
        <button
            type={props.inputType}
            default={props.default}
            className={[classes.Button, classes[props.type]].join(' ')}
            disabled={props.disabled}
            onClick={props.clicked}>{props.children}</button>
    )
}

export default button