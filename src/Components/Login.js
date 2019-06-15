import React, { Component } from 'react'
import {LOGIN_MUTATION}  from '../graphql/mutations/auth'
import {SIGNUP_MUTATION} from '../graphql/mutations/auth'
import { Mutation }   from 'react-apollo'
// import { AUTH_TOKEN } from '../constants'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  handleChange = event => {
    const elem = event.target;
    this.setState({
      [elem.name] : elem.value
    })
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              name="name"
              onChange={this.handleChange}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            name="email"
            onChange={this.handleChange}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            name="password"
            onChange={this.handleChange}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => this._confirm(data)}
        >
        {mutation => (
          <div className="pointer mr2 button" onClick={mutation}>
          {login ? 'login' : 'create account'}
          </div>
        )}
        </Mutation>
        <div
          className="pointer button"
          onClick={() => this.setState({ login: !login })}
          >
          {login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </div>
    )
  }

  _confirm = async data => {
  const { token } = this.state.login ? data.login : data.signup
  this._saveUserData(token)
  this.props.history.push(`/`)
}

  _saveUserData = token => {
    localStorage.setItem('AUTH_TOKEN', token)
  }
}

export default Login