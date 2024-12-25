import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GenerateField = () => {
    const baseurl = process.env.REACT_APP_API_URL;

    // Field Types
    const [fieldTypes, setFieldTypes] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const url = `${baseurl}/api/field-types`;
        axios
          .get(url, { headers })
          .then((response) => {
            setFieldTypes(response.data);
          })
          .catch((error) => {
            console.error("Error fetching field types:", error);
          });
      }, []);
      
    return (
        <div className='md:grid md:grid-cols-12 md:gap-6'>
            <div className='md:col-span-12 w-10/12 mx-auto my-4'>
                {/* Field Name */}
                <div className="relative my-4">
                    <input
                        type="text"
                        className="border w-full md:w-9/12 pt-4 pb-2 px-3 outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                        placeholder="Enter Field Name"
                        required
                    />
                    <label className="absolute left-3 top-1 text-gray-600 text-sm transition-all duration-300 transform -translate-y-4 scale-90 px-1 bg-white">
                        Field Name
                    </label>
                </div>

                {/* Select Field Type */}
                <div className="relative my-4">
                    <select
                        className="border w-full md:w-9/12 pt-4 pb-2 px-3 outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                        required
                    >
                        <option value="">Select Field Type</option>
                        {fieldTypes.map((fieldType) => (
                            <option key={fieldType.id} value={fieldType.id}>
                                {fieldType.name}
                            </option>
                        ))}

                    </select>
                    <label className="absolute left-3 top-1 text-gray-600 text-sm transition-all duration-300 transform -translate-y-4 scale-90 px-1 bg-white">
                        Select Field Type
                    </label>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default GenerateField