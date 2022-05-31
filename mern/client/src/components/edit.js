import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Geocode from "react-geocode";


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone_number: "",
    description: "",
    category: "",
    website_url: "",
    image_url: ""
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    let coordinates
    Geocode.fromAddress(form.address).then(
      (res) => {
        coordinates = res.results[0].geometry.location;

    const editedResource = {
      name: form.name,
      address: form.address,
      phone_number: form.phone_number,
      description: form.description,
      category: form.category,
      website_url: form.website_url,
      image_url: form.image_url,
      coordinates: coordinates
    };

    // This will send a post request to update the data in the database.
    fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedResource),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  })
    navigate("/viewAll");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Resource</h3>
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
          <label htmlFor="address">Address</label>
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
            value="Update Resource"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
