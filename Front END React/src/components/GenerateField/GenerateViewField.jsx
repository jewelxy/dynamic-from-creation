import axios from "axios";
import React, { useEffect, useState } from "react";
import Text from "../FromField/Text";
import Email from "../FromField/Email";
import TextArea from "../FromField/TextArea";
import Number from "../FromField/Number";
import Date from "../FromField/Date";
const GenerateViewField = () => {
  const baseurl = process.env.REACT_APP_API_URL;
  const [fields, setFields] = useState([]);
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
      })
      .catch((error) => {
        console.error("Error fetching field types:", error);
      });
  }, []);
  return (
    <div className="md:grid md:grid-cols-12 md:gap-6">
      <div className="md:col-span-12 w-11/12 mx-auto my-4">
        {fields.map((field, index) =>
          field.field_type.name === "text" ? (
            <Text key={index} props={field} />
          ) :
            field.field_type.name === "email" ? (
              <Email key={index} props={field} />
            ) : 
            field.field_type.name === "textarea" ? (
              <TextArea key={index} props={field} />
            ) :
            field.field_type.name === "number" ? (
              <Number key={index} props={field} />
            ) :
            field.field_type.name === "date" ? (
              <Date key={index} props={field} />
            ) :
            null
        )}
      </div>
    </div>
  );
};

export default GenerateViewField;
