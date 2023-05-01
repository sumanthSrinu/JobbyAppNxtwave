import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetailsObj: {},
    jobsList: [],
    searchInput: '',
    salaryFilter: '',
    checkboxFilterList: [],
    profileApiStatus: true,
    isLoading: true,
    apiStatus: true,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  retryClicked = () => {
    this.getJobs()
  }

  checkboxClicked = id => {
    const {checkboxFilterList} = this.state

    if (checkboxFilterList.includes(id)) {
      checkboxFilterList.shift(id)
    } else {
      checkboxFilterList.push(id)
    }

    this.setState({checkboxFilterList})
    this.getJobs()
  }

  salaryFilterClicked = event => {
    this.setState({salaryFilter: event.target.value})
    this.getJobs()
  }

  searchIconClicked = () => {
    this.getJobs()
  }

  searchInputChanged = event => {
    this.setState({searchInput: event.target.value})
  }

  profileApiSuccess = data => {
    const profileObj = data.profile_details

    const redefinedProfileObj = {
      name: profileObj.name,
      profileImageUrl: profileObj.profile_image_url,
      shortBio: profileObj.short_bio,
    }

    this.setState({profileDetailsObj: redefinedProfileObj})
  }

  jobsApiSuccess = data => {
    const jobItems = data.jobs
    const redefinedJobsList = jobItems.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    this.setState({jobsList: redefinedJobsList})
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.profileApiSuccess(data)
    } else {
      this.setState({profileApiStatus: false})
    }
  }

  getJobs = async () => {
    const {searchInput, salaryFilter, checkboxFilterList} = this.state

    const checkboxString = checkboxFilterList.join(',')

    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxString}&search=${searchInput}&minimum_package=${salaryFilter}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.jobsApiSuccess(data)
      this.setState({isLoading: false})
    } else {
      this.setState({apiStatus: false})
    }
  }

  render() {
    const {
      profileDetailsObj,
      jobsList,
      isLoading,
      apiStatus,
      profileApiStatus,
    } = this.state
    const {name, profileImageUrl, shortBio} = profileDetailsObj

    let noJobs = false

    if (jobsList.length === 0) {
      noJobs = true
    }

    return (
      <div className="jobsMain">
        <Header />
        <div className="jobsContainer">
          <div className="profileAndFilters">
            <div className="profileContainer">
              {profileApiStatus && (
                <>
                  <img src={profileImageUrl} alt="profile" />
                  <h1>{name}</h1>
                  <p>{shortBio}</p>
                </>
              )}
              {!profileApiStatus && <button type="button">Retry</button>}
            </div>
            <form className="checkBoxContainer">
              <h1>Type of Employment</h1>
              <ul className="checkboxContainer2">
                {employmentTypesList.map(eachItem => (
                  <li className="checkboxItem" key={eachItem.employmentTypeId}>
                    <input
                      type="checkbox"
                      value={eachItem.employmentTypeId}
                      id={eachItem.employmentTypeId}
                      onChange={() =>
                        this.checkboxClicked(eachItem.employmentTypeId)
                      }
                      key={eachItem.employmentTypeId}
                    />
                    <label htmlFor={eachItem.employmentTypeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
            <form className="checkBoxContainer">
              <h1>Salary Range</h1>
              <ul className="checkboxContainer2">
                {salaryRangesList.map(eachItem => (
                  <li className="checkboxItem" key={eachItem.salaryRangeId}>
                    <input
                      type="radio"
                      id={eachItem.salaryRangeId}
                      value={eachItem.salaryRangeId}
                      onChange={this.salaryFilterClicked}
                      key={eachItem.salaryRangeId}
                      name="radio"
                    />
                    <label>{eachItem.label}</label>
                  </li>
                ))}
              </ul>
            </form>
          </div>
          <div className="jobsPortalContainer">
            <div className="searchContainer">
              <input
                type="search"
                placeholder="Search"
                className="searchInputStyle"
                onChange={this.searchInputChanged}
              />
              <AiOutlineSearch
                onClick={this.searchIconClicked}
                className="searchIcon"
              />
            </div>

            {isLoading && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}

            {noJobs && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                  alt="no jobs"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters</p>
              </div>
            )}

            {!apiStatus && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for</p>
                <button type="button" onClick={this.retryClicked}>
                  Retry
                </button>
              </div>
            )}

            {apiStatus && (
              <ul className="jobsitemsContainerMain">
                {jobsList.map(eachItem => (
                  <JobItem eachJob={eachItem} key={eachItem.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
