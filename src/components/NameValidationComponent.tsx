import React from "react";
import useNameValidation from "../hooks/useNameValidation";
import "./NameValidationComponent.css";

const NameValidationComponent: React.FC = () => {
  const { name, error, loading, handleChange, setName } = useNameValidation();

  return (
    <div className="container">
      <label htmlFor="name-input">Name:</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={(event) => {
          const value = (event.target as HTMLInputElement).value;
          setName(value);
          handleChange(value);
        }}
        placeholder="Enter your name"
        aria-invalid={!!error}
        aria-describedby={error ? "name-error" : undefined}
        aria-busy={loading ? "true" : undefined}
      />
      {loading && (
        <p id="loading-message" className="loading-message">
          Validating...
        </p>
      )}
      {error && (
        <p id="name-error" className="error-message">
          {error}
        </p>
      )}
    </div>
  );
};

export default NameValidationComponent;
