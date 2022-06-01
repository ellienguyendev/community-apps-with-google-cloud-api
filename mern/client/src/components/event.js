import React from "react"
import { Link } from "react-router-dom";

const Event = ({name, address, phone_number, description, category, website_url, image_url}) => {

    return(
        <div className="card">
                <p>Type of Resource: {category}</p>
                <img src={image_url} />
                <h1>{name}</h1>
                <p>Address / Areas Serviced: {address}</p>
                <p>Phone Number: {phone_number}</p>
                <p>Description: {description}</p>
                        <Link
                            to={website_url}
                            target= '_blank'
                            style={{
                             color: 'blue',
                            textDecoration: 'none'
                        }}
                        >Visit their website</Link>
        </div>
    )
}


export default Event