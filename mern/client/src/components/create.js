import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone_number: "",
    description: "",
    category: "",
    website_url: "",
    image_url: ""
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  const onSubmit = e => {
    e.preventDefault();

    let coordinates
    Geocode.fromAddress(form.address).then(
      (res) => {
        coordinates = res.results[0].geometry.location;
        let newResource = { ...form }
        newResource.coordinates = coordinates

        // When a post request is sent to the create url, we'll add a new record to the database.
        fetch("http://localhost:5000/record/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newResource),
        })
          .catch(error => {
            window.alert(error);
            return;
          });
      })



    setForm({
      name: "",
      address: "",
      phone_number: "",
      description: "",
      category: "",
      website_url: "",
      image_url: ""
    });
    navigate("/viewAll");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add New Resource</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name of Resource / Org / Title</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address or City Serviced</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            value={form.phone_number}
            onChange={(e) => updateForm({ phone_number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={form.category}
            onChange={(e) => updateForm({ category: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website_url">Website Url</label>
          <input
            type="text"
            className="form-control"
            id="website_url"
            value={form.website_url}
            onChange={(e) => updateForm({ website_url: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image_url">Cover Image</label>
          <input
            type="text"
            className="form-control"
            id="image_url"
            value={form.image_url}
            onChange={(e) => updateForm({ image_url: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Add Resource"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
