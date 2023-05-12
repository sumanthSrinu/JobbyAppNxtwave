import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="mainContainer">
    <Header />
    <div className="textContainer">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="paraStyle">
        Millions of people are searching for jobs, salary Information,company
        reviews,Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="buttonStyle">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
