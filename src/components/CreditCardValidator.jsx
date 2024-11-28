import React, { useState } from 'react';
import visa from "../assets/images/visa.png"
import mastercard from "../assets/images/mastercard.png"
import discover from "../assets/images/discover.png"
import { getCardInfo } from '../utils/getCardInfo';
import './CreditCardValidator.css'

const cardImages = { 
  Visa: visa,
  MasterCard: mastercard,
  Discover: discover
};

const CreditCardValidator = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [cardType, setCardType] = useState('');
  const [isValid, setIsValid] = useState(null);

  const detectCardType = (number) => {
    const { type } = getCardInfo(number);
    return type;
  };

  const handleInputChange = (e) => {
    const input = e.target.value.replace(/\s+/g, '').trim();
    setCardNumber(input);
    setValidationResult('');
    const detectedType = detectCardType(input);
    setCardType(detectedType);
  };

  const validateCard = () => {
    if (!/^\d+$/.test(cardNumber)) {
      setValidationResult('Invalid card number: Only numeric characters are allowed.');
      return;
    }

    if (isValidCardNumber(cardNumber)) {
      setValidationResult('Valid credit card number.');
      setIsValid(true);
    } else {
      setValidationResult('Invalid credit card number.');
      setIsValid(false);
    }
  };

  const isValidCardNumber = (number) => {
    const { type, isValidLength } = getCardInfo(number);
    if (!type || !isValidLength) { return false; }

    // Luhn algorithm for card number validation
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i], 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  return (
    <div className='Main'>
      <h2>Credit Card Validator</h2>
      <input
        type="text"
        value={cardNumber}
        onChange={handleInputChange}
        placeholder="Enter credit card number"
        className='Card-input'
      />
      <button onClick={validateCard} className='Button'>
        Validate
      </button>
      {validationResult && (
        <p style={{ color: isValid ? 'green' : 'red' }}><strong>{validationResult}</strong></p>
      )}
      {cardType && (
        <p>
          {cardImages[cardType] && 
            ( 
              <img className="Image" src={cardImages[cardType]} alt={cardType} /> 
            )
          }
        </p>
      )}
    </div>
  );
};

export default CreditCardValidator;
