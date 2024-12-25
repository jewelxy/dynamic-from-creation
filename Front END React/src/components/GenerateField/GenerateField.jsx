import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GenerateField = () => {
    const baseurl = process.env.REACT_APP_API_URL;

    // State to manage the list of fields
    const [fields, setFields] = useState([{ field_type_id: '', name: '', is_required: false, readonly: false }]);
    const [fieldTypes, setFieldTypes] = useState([]);

    // Fetch Field Types
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

    // Handle change for field inputs
    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);
    };

    // Add a new field row
    const addField = () => {
        setFields([...fields, { field_type_id: '', name: '', is_required: false, readonly: false }]);
    };

    // Remove a field row
    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    // Handle form submission
    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const url = `${baseurl}/api/from-fields`;

        axios.post(url, fields, { headers })
            .then((response) => {
                alert('Fields saved successfully');
                setFields([{ field_type_id: '', name: '', is_required: false, readonly: false }]); // Reset form
            })
            .catch((error) => {
                console.error('Error saving fields:', error);
                alert('An error occurred while saving the fields.');
            });
    };

    return (
        <div className="md:grid md:grid-cols-12 md:gap-6">
            <div className="md:col-span-12 w-10/12 mx-auto my-4">
                {fields.map((field, index) => (
                    <div key={index} className="border p-4 my-4 rounded-md">
                        {/* Field Name */}
                        <div className="relative my-4">
                            <input
                                type="text"
                                className="border w-full md:w-9/12 pt-4 pb-2 px-3 outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                                placeholder="Enter Field Name"
                                value={field.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
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
                                value={field.field_type_id}
                                onChange={(e) => handleFieldChange(index, 'field_type_id', e.target.value)}
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

                        {/* Is Required */}
                        <div className="my-4 mx-2">
                            <label>
                                <input
                                    type="checkbox"
                                    className='mr-2'
                                    checked={field.is_required}
                                    onChange={(e) => handleFieldChange(index, 'is_required', e.target.checked)}
                                />
                                Is Required
                            </label>
                        </div>

                        {/* Readonly */}
                        <div className="my-4 mx-2">
                            <label>
                                <input
                                    type="checkbox"
                                    className='mr-2'
                                    checked={field.readonly}
                                    onChange={(e) => handleFieldChange(index, 'readonly', e.target.checked)}
                                />
                                Readonly
                            </label>
                        </div>

                        {/* Remove Field Button */}
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none"
                            >
                                Remove Field
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Field Button */}
                <button
                    type="button"
                    onClick={addField}
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none my-4 mx-2"
                >
                    Add New
                </button>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Submit Field
                </button>
            </div>
        </div>
    );
};

export default GenerateField;
