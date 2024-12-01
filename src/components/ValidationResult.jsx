import React from 'react'

export const ValidationResult = ({ validationResult, isValid }) => (
  <>
    {validationResult && (
      <p className={`${isValid ? "valid" : "invalid"}`}>
        <strong>{validationResult}</strong>
      </p>
    )}
  </>
);
