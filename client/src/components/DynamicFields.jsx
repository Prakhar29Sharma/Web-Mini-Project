import React from 'react';

const DynamicFields = ({ fields, addField, removeField, onChange }) => {
  return (
    <div className="field_wrapper">
      {fields.map((field, index) => (
        <div className="input-group mb-3" key={index}>
          <a
            className="remove_button btn btn-outline-danger"
            title="Remove field"
            onClick={() => removeField(index)}
          >
            <span className="bi bi-x-lg">X</span>
          </a>
          <input
            type="text"
            value={field}
            className="form-control"
            placeholder="Enter Field"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            onChange={(e) => onChange(index, e.target.value)}
          />
        </div>
      ))}
      <a
        className="add_button btn btn-outline-success"
        title="Add field"
        onClick={addField}
      >
        <span className="bi bi-plus-lg">+</span>
      </a>
    </div>
  );
};

export default DynamicFields;
