import React, { useEffect, useState } from "react";
import axios from "axios";

const LoadCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const baseurl = process.env.REACT_APP_API_URL;
    const url = `${baseurl}/api/customers`;

    axios
      .get(url, { headers })
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setErrorMessage("Failed to load customer data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-600">{errorMessage}</div>;
  }

  return (
    <div className="w-11/12 mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>
      {customers.length === 0 ? (
        <div>No customer data available.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Field Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.from_field.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoadCustomer;
