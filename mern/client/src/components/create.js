import React, { useState } from "react";
import { useNavigate } from "react-router";


export default function Create() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone_number: "",
    description: "",
    category: "",
    website_url: "",
    image_url: "",
    law_enforcement_compliant: null
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({
      name: "",
      address: "",
      phone_number: "",
      description: "",
      category: "",
      website_url: "",
      image_url: "",
      law_enforcement_compliant: false
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add New Resource</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="law_enforcement_compliant"
              id="notCompliant"
              value="No"
              checked={form.law_enforcement_compliant === "No"}
              onChange={(e) => updateForm({ law_enforcement_compliant: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">No</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="law_enforcement_compliant"
              id="compliant"
              value="Yes"
              checked={form.law_enforcement_compliant === "Yes"}
              onChange={(e) => updateForm({ law_enforcement_compliant: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">Yes</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
