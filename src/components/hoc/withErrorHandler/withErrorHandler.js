import React, { Component } from 'react'
import Modal from '../../UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props)

            this.state = { error: null }

            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            }, error => {
                this.setState({ error: error })
                return Promise.reject(error)
            });

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
                return Promise.reject(error)
            });

        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.responseInterceptor)
            axios.interceptors.request.eject(this.requestInterceptor)
        }

        render() {
            return (
                <React.Fragment>
                    {this.state.error ?
                        <Modal show={this.state.error} backdropClicked={() => this.setState({ error: null })}>
                            <h2 style={{ textAlign: 'center' }}>Something went wrong!</h2>
                            {`${this.state.error.message}`}
                        </Modal> : null}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler