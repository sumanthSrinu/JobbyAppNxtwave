import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {CgToolbox} from 'react-icons/cg'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], skillsArray: [], apiStatus: true}

  componentDidMount() {
    this.getJobDetails()
  }

  retryClicked = () => {
    this.getJobDetails()
  }

  apiSuccess = data => {
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs

    const redefinedSimilarJobs = similarJobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

    const refinedData = {
      id: jobDetails.id,
      title: jobDetails.title,
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      rating: jobDetails.rating,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      companyLifeDescription: jobDetails.life_at_company.description,
      companyLifeImage: jobDetails.life_at_company.image_url,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
    }

    const redinedSkillsArray = jobDetails.skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))
    console.log(jobDetails.skills, 'jobDetails.skills')
    this.setState({skillsArray: redinedSkillsArray})
    this.setState({jobDetails: refinedData})
    this.setState({similarJobs: redefinedSimilarJobs})
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data, 'dataaaaaa')

    if (response.ok) {
      this.apiSuccess(data)
    } else {
      this.setState({apiStatus: false})
    }
  }

  render() {
    const {jobDetails, similarJobs, skillsArray, apiStatus} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      companyLifeDescription,
      companyLifeImage,
    } = jobDetails
    console.log(skillsArray, 'skillsArray')
    return (
      <div className="jobDetailsMainContainer">
        <Header />

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
          <>
            <div className="jobdetailsCard">
              <div className="top">
                <div className="logoAndTitle">
                  <img
                    src={companyLogoUrl}
                    alt="job details company logo"
                    className="companyLogo"
                  />
                  <div>
                    <h1>{title}</h1>
                    <div className="ratingsContainer">
                      <AiFillStar />
                      <p>{rating}</p>
                    </div>
                  </div>
                </div>
                <div className="locationMain">
                  <div className="locations">
                    <GoLocation className="margins1" />
                    <p className="margins2">{location}</p>
                    <CgToolbox className="margins1" />
                    <p>{employmentType}</p>
                  </div>

                  <div>
                    <p>{packagePerAnnum}</p>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="descriptionHeading">
                  <h1>Description</h1>
                  <div className="visitContainer">
                    <a href={companyWebsiteUrl}> Visit</a>
                    <BsBoxArrowUpRight />
                  </div>
                </div>
                <p>{jobDescription}</p>
                <div>
                  <h1>Skills</h1>
                  <ul className="skillsContainer">
                    {skillsArray.map(eachItem => (
                      <li
                        className="skillsItem"
                        key={Math.random() * skillsArray.length}
                      >
                        <img
                          src={eachItem.imageUrl}
                          alt={eachItem.name}
                          className="skillsLogo"
                        />
                        <p>{eachItem.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h1>Life at Company</h1>
                  <div className="companyLifeContext">
                    <p className="paraStyle">{companyLifeDescription}</p>
                    <img src={companyLifeImage} alt="company" />
                  </div>
                </div>
              </div>
            </div>
            <div className="similarJobsMain">
              <h1>Similar Jobs</h1>
              <ul className="jobsSimilarCardsContainer">
                {similarJobs.map(eachItem => (
                  <li className="similarJobsCard" key={eachItem.id}>
                    <div className="logoAndTitle">
                      <img
                        src={eachItem.companyLogoUrl}
                        className="companyLogo"
                        alt="similar job company logo"
                      />
                      <div>
                        <h1>{eachItem.title}</h1>
                        <div className="ratingsContainer">
                          <AiFillStar />
                          <p>{eachItem.rating}</p>
                        </div>
                      </div>
                    </div>
                    <h1>Description</h1>
                    <p>{eachItem.jobDescription}</p>
                    <div className="locations">
                      <GoLocation className="margins1" />
                      <p className="margins2">{eachItem.location}</p>
                      <CgToolbox className="margins1" />
                      <p>{eachItem.employmentType}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default JobItemDetails
