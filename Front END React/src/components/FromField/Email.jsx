import React from 'react';

const Email = ({ props, onChange, value }) => {
  const handleChange = (e) => {
    onChange(props.id, e.target.value, props.field_type.name);
  };
  return (
    <div cclassName="md:col-span-12 lg:col-span-6 w-full mx-auto my-4 relative">
      
        <input
          className="border w-full rounded-md md:w-9/12 focus:bg-white pt-4 pb-2 px-3 outline-none focus:ring-2 focus:ring-blue-300"
          type="email" // Hardcoded as 'email' for email input
          value={value || ''} // Bind the value from formData
          onChange={handleChange} // Trigger state change on input
          required={props.is_required === 1}
          placeholder={`Enter ${props.name}`}
        />
        <label className="absolute left-3 top-1 text-gray-600 text-sm transition-all duration-300 transform -translate-y-4 scale-90 px-1 bg-white">
          {props.name} {/* Use `props.name` for the label */}
          {props.is_required === 1 ? (
            <span className="text-red-700 text-[20px]">*</span>
          ) : null}
        </label>
    </div>
  );
};

export default Email;
