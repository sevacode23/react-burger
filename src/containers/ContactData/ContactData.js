import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import validator from 'validator'

import classes from './ContactData.module.css'
import * as actions from '../../store/actions/'
import { orderStates } from '../../store/reducers/sessionOrder'
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => {
    return {
        ingredients: state.sessionOrder.ingredients,
        price: state.sessionOrder.totalPrice,
        sessionOrderState: state.sessionOrder.state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSubmit: (order) => dispatch(actions.submitOrderAsync(order)),
        onOrderSuccessConfirm: () => dispatch(actions.uninitializeOrder('Order success'))
    }
}

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputtype: 'input',
                options: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    isValid: false
                },
                isBlured: false
            },
            city: {
                inputtype: 'input',
                options: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    isValid: false
                },
                isBlured: false
            },
            street: {
                inputtype: 'input',
                options: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    isValid: false
                },
                isBlured: false
            },
            postalCode: {
                inputtype: 'input',
                options: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    rules: {
                        require: true,
                        postal: true
                    },
                    isValid: false
                },
                isBlured: false
            },
            phone: {
                inputtype: 'input',
                options: {
                    type: 'tel',
                    placeholder: 'Telephone number'
                },
                value: '',
                validation: {
                    rules: {
                        require: false,
                        phone: true
                    },
                    isValid: false
                },
                isBlured: false
            },
            deliveryMethod: {
                inputtype: 'select',
                options: {
                    options: [
                        { value: 'fastest', label: 'Fastest' },
                        { value: 'cheapest', label: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {
                    isValid: true
                },
                isBlured: false
            }
        },
        validate: false
    }

    isValid(value, rules) {
        if (!rules) return true;

        if (rules.require) {
            if (validator.isEmpty(value))
                return false;
        }

        if (rules.postal) {
            if (!validator.isPostalCode(value, "UA"))
                return false;
        }

        if (rules.phone) {
            if (!validator.isMobilePhone(value))
                return false;
        }

        return true;
    }

    validateForm = () => {
        for (let key in this.state.orderForm) {
            if (!this.state.orderForm[key].validation.isValid) {
                this.setState({ validate: false })
                return;
            }

        }
        this.setState({ validate: true })
    }

    valueChangedHandler = (event, formElement) => {
        const curForm = {
            ...this.state.orderForm
        }
        const curElement = {
            ...curForm[formElement]
        }
        const curElementValidation = {
            ...curElement.validation
        }

        curElement.value = event.target.value;
        curElementValidation.isValid = this.isValid(curElement.value, curElementValidation.rules)
        curElement.validation = curElementValidation
        curForm[formElement] = curElement

        this.setState({ orderForm: curForm }, this.validateForm)
    }

    inputBluedHandler = formElement => {
        const curForm = {
            ...this.state.orderForm
        }
        const curElement = {
            ...curForm[formElement]
        }

        curElement.isBlured = true
        curForm[formElement] = curElement

        this.setState({ orderForm: curForm })
    }

    cancelOrderHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    submitOrderHandler = event => {
        event.preventDefault();

        const contacts = {};
        for (let key in this.state.orderForm) {
            contacts[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contacts: contacts,
            datetime: new Date()
        }

        this.props.onOrderSubmit(order)
    }

    render() {
        if (this.props.sessionOrderState === orderStates.uninitialized)
            return <Redirect to="/" />
            
        const formElements = []
        for (let key in this.state.orderForm) {
            formElements.push({
                name: key,
                config: this.state.orderForm[key],
                isValid: this.state.orderForm[key].validation.isValid,
                isBlured: this.state.orderForm[key].isBlured

            })
        }
        return (
            <React.Fragment>
                <Modal show={this.props.sessionOrderState === orderStates.submitted}>
                    <Spinner />
                </Modal>
                <Modal show={this.props.sessionOrderState === orderStates.success}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{
                            textTransform: 'uppercase'
                        }}>Your order has been successfully accepted!</h3>
                        <Button
                            type="Success"
                            clicked={this.props.onOrderSuccessConfirm}>DONE</Button>
                    </div>
                </Modal>
                < div className={classes.ContactData} >
                    <h1>Your Contact Data!</h1>
                    <form
                        style={{ marginTop: '35px' }}
                        onSubmit={this.submitOrderHandler}>
                        {formElements.map(formElement => {
                            return <Input
                                key={formElement.name}
                                name={formElement.name}
                                {...formElement.config}
                                invalid={!formElement.isValid && formElement.isBlured}
                                onChange={(event) => { this.valueChangedHandler(event, formElement.name) }}
                                onBlur={() => { this.inputBluedHandler(formElement.name) }}
                            />
                        })}
                        <Button
                            type="Danger"
                            inputType="Button"
                            clicked={this.cancelOrderHandler}>CANCEL</Button>
                        <Button
                            type="Success"
                            default
                            disabled={!this.state.validate}>ORDER</Button>
                    </form>
                </div >
            </React.Fragment >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))