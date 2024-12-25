import React, { useEffect, useState } from "react";
import axios from "axios";
import Text from "./FromField/Text";
import Email from "./FromField/Email";
import TextArea from "./FromField/TextArea";
import Number from "./FromField/Number";
import Date from "./FromField/Date";

const CustomerForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const baseurl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${baseurl}/api/from-fields`;

    axios
      .get(url, { headers })
      .then((response) => {
        setFields(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching field types:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (id, value, fieldType) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { value, fieldType },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = Object.entries(formData).map(([key, value]) => ({
      value: value.value,
      from_field_id: key,
      createdby: 1, // Example: Set static user ID
      updatedby: 1,
    }));

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseurl}/api/customers`, formattedData, { headers })
      .then((response) => {
        setSuccessMessage("Form submitted successfully!");
        setErrorMessage("");
        setFormData({});
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        setErrorMessage("An error occurred while submitting the form.");
        setSuccessMessage("");
      });
  };

  if (loading) {
    return <div>Loading fields...</div>;
  }

  return (
    <div className="md:grid md:grid-cols-12 md:gap-6">
      <div className="md:col-span-12 w-11/12 mx-auto my-4">
        {successMessage && <div className="text-green-600">{successMessage}</div>}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field, index) => {
            switch (field.field_type.name) {
              case "text":
                return (
                  <Text
                    key={index}
                    props={field}
                    onChange={handleInputChange}
                    value={formData[field.id]?.value || ""}
                  />
                );
              case "email":
                return (
                  <Email
                    key={index}
                    props={field}
                    onChange={handleInputChange}
                    value={formData[field.id]?.value || ""}
                  />
                );
              case "textarea":
                return (
                  <TextArea
                    key={index}
                    props={field}
                    onChange={handleInputChange}
                    value={formData[field.id]?.value || ""}
                  />
                );
              case "number":
                return (
                  <Number
                    key={index}
                    props={field}
                    onChange={handleInputChange}
                    value={formData[field.id]?.value || ""}
                  />
                );
              case "date":
                return (
                  <Date
                    key={index}
                    props={field}
                    onChange={handleInputChange}
                    value={formData[field.id]?.value || ""}
                  />
                );
              default:
                return null;
            }
          })}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
