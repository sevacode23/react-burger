import React from 'react'

import classes from './Input.module.css'

const input = props => {
    let inputElement = null;

    const inputClasses = [classes.InputElement]
    if (props.invalid) {
        inputClasses.push(classes.invalid)
    }

    switch (props.inputtype) {
        case ('input'):
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...props.options}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur} />
            break;
        case ('select'):
            inputElement =
                <select
                    className={inputClasses.join(' ')}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}>
                    {props.options.options.map(opt => {
                        return <option key={opt.value} value={opt.value}>{opt.label}</option>
                    })}
                </select>
            break;
        default:
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...props.options}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur} />
            break;
    }

    return (
        <div className={classes.Input}>
            {props.label ?
                <label >
                    {props.label}
                    {inputElement}
                </label> : inputElement}
        </div>
    )
}

export default input;