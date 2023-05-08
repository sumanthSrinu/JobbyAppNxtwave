import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineHome} from 'react-icons/ai'
import {CgInbox} from 'react-icons/cg'

import './index.css'

const Header = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navBar">
      <ul className="headerContainer">
        <Link to="/">
          <li className="logoContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logoStyle"
            />
          </li>
        </Link>

        <div className="headerRoutes">
          <Link to="/" className="nav-link">
            <li className="textRouters">Home</li>
          </Link>

          <Link to="/" className="nav-link homeIcon">
            <AiOutlineHome />
          </Link>

          <Link to="/jobs" className="nav-link ">
            <li className="textRouters">Jobs</li>
          </Link>

          <Link to="/" className="nav-link jobsIcon">
            <CgInbox />
          </Link>
        </div>

        <li className="buttonContainer">
          <button type="button" className="logoutBt" onClick={clickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
