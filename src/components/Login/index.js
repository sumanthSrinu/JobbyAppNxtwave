import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    loginStatus: true,
    usernameText: '',
    passwordText: '',
    errorMsg: '',
  }

  LoginSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})

    const {history} = this.props
    history.replace('/')

    this.setState({usernameText: '', passwordText: ''})
  }

  userInputChanged = event => {
    this.setState({usernameText: event.target.value})
  }

  passwordInputChanged = event => {
    this.setState({passwordText: event.target.value})
  }

  loginClicked = async event => {
    event.preventDefault()

    const {usernameText, passwordText} = this.state

    const userDetails = {username: usernameText, password: passwordText}

    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.LoginSuccess(data)
    } else {
      this.setState({loginStatus: false, errorMsg: data.error_msg})
    }
  }

  render() {
    const {passwordText, usernameText, loginStatus, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="mainContainer3">
        <div className="loginContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="loginJoblogo"
          />
          <form className="formContainer" onSubmit={this.loginClicked}>
            <div className="inputContainer">
              <label htmlFor="usernameInput" className="labelStyle">
                USERNAME
              </label>
              <input
                type="text"
                id="usernameInput"
                className="inputStyle"
                placeholder="Username"
                value={usernameText}
                onChange={this.userInputChanged}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="passwordInput" className="labelStyle">
                PASSWORD
              </label>
              <input
                type="password"
                id="passwordInput"
                className="inputStyle"
                placeholder="Password"
                value={passwordText}
                onChange={this.passwordInputChanged}
              />
            </div>
            <button
              type="submit"
              className="loginBtnStyle"
              onClick={this.loginClicked}
            >
              Login
            </button>
            {!loginStatus && <p className="errorMsg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
