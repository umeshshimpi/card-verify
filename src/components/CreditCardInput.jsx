import React from 'react';

export const CreditCardInput = ({ cardNumber, handleInputChange, validateCard }) => (
  <>
    <input
      type="text"
      value={cardNumber}
      onChange={handleInputChange}
      placeholder="Enter credit card number"
      className="card-input"
    />
    <button onClick={validateCard} className="button">
      Validate
    </button>
  </>
);

export default CreditCardInput
