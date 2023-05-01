import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobsClicked = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="mainContainer">
      <Header />
      <div className="textContainer">
        <h1 className="heading">Find Job That Fits Your Life</h1>
        <p className="paraStyle">
          Millions of people are searching for jobs, salary Information,company
          reviews,Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="buttonStyle" onClick={findJobsClicked}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
