import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {CgToolbox} from 'react-icons/cg'

import './index.css'

const JobItem = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <Link to={`/jobs/${id}`} className="linkStyle">
      <li className="jobItem">
        <div className="jobContext">
          <div className="logoandRatings">
            <img src={companyLogoUrl} alt={title} className="companyLogo" />
            <div className="titleAndratingsContainer">
              <h1>{title}</h1>

              <div className="ratingsContainer">
                <AiFillStar className="starStyle" />
                <p className="ratingsPara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationContainer">
            <div className="locations">
              <GoLocation className="locationLogo" />
              <p>{location}</p>
              <CgToolbox className="employementLogo" />
              <p>{employmentType}</p>
            </div>

            <div>
              <h1 className="packageStyle">{packagePerAnnum}</h1>
            </div>
          </div>
          <div className="descriptionContainer">
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
