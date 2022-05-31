import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Event = ({ imgLink, headline, description, date, time, city, state,category, source, actions, type}) => {
    let color
    if(type === "incident"){
        color = 'red'
    } else {
        color = 'blue'
    }
    return(
        <div className="w-2/5 mb-4 ml-2 mr-2 shadow-lg " >
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <p className="text-gray-700 text-base" style={{ fontFamily: 'Arial', fontSize: '12px' }} >Cause: {category}</p>
                <img className="rounded" src={imgLink} />
                <div className="px-6 py-4">
                    <h5><p className="text-gray-700 text-base" style={{ fontFamily: 'Arial', fontSize: '12px'}} >{date} | {city}, {state}</p></h5>
                    <hr style={{ borderTop: `3px solid ${color}`, padding: '5px 0' }} />
                    <h4 className="font-bold text-xl mb-2" style={{ fontFamily: "coustard" }} >{headline}</h4>
                    <p className="text-gray-700 text-base" style={{ fontFamily: 'Arial' }} >{description}</p>
                    <span style={{margin: '15px', justifyContent: 'right', fontSize:'12px', letterSpacing: '.1rem'}}>
                        <Link
                            to={source}
                            target= '_blank'
                            style={{
                             color: 'blue',
                            textDecoration: 'none'
                        }}
                        > Read More </Link>
                        |
                        <Link
                            to={actions}
                            target= '_blank'
                            style={{
                             color: 'blue',
                            textDecoration: 'none'
                        }}
                        > Take Action</Link>
                    </span>  
                </div>
            </div>
        </div>
    )
}

Event.propTypes = {
  imgLink: PropTypes.string,
  headline: PropTypes.string,
  description: PropTypes.string,
}

Event.defaultProps = {
    imgLink: ``,
    headline: ``,
    description: ``
}

export default Event