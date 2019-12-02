import React, { Component } from 'react'
import { register, login, isLogged } from '../services/loginService'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            islogged: isLogged()

        }

    }

    getRegisterUser = e => {
        e.preventDefault()
        const username = this.state.username
        const password = this.state.password
        try {
            register({ username, password })
            login({ username, password })
            // {this.props.history.push('/')}
        } catch (err) {
            alert(err)
        }

    }

    getLogin = e => {
        e.preventDefault()
        const username = this.state.username
        const password = this.state.password
        try {
            login({ username, password })
            //{this.props.history.push('/')}
        } catch (error) {
            alert(error)
        }
    }

    handleChange = field => event => {
        this.setState({
            [field]: event.target.value
        })
    }


    render = () => (
        <form className="form-signin">
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Login / Register</h1>
            </div>

            <div className="form-label-group">
                <label htmlFor="inputEmail">Username</label>
                <input
                    name="username"
                    onChange={this.handleChange('username')}
                    value={this.state.username}
                    className="form-control"
                    placeholder="Username"
                    required
                />
            </div>

            <div className="form-label-group mt-2">
                <label htmlFor="inputPassword">Password</label>
                <input
                    name="password"
                    onChange={this.handleChange('password')}
                    value={this.state.password}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                />
            </div>

            <div className="mt-5">
                <button className="login btn btn-lg btn-primary btn-block" onClick={this.getLogin} type="submit">Login</button>
                <button className="register btn btn-lg btn-secondary btn-block" onClick={this.getRegisterUser} type="submit">Register</button>
            </div>
        </form>
    )
}

export default Login