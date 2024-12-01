import React, { useState } from "react";
import { getCardInfo } from "../utils/getCardInfo";
import { DisplayCardType } from "./DisplayCardType";
import { CreditCardInput } from "./CreditCardInput";
import { ValidationResult } from "./ValidationResult";
import "./App.css";

export const App = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [validationResult, setValidationResult] = useState("");
  const [cardType, setCardType] = useState("");
  const [isValid, setIsValid] = useState(null);

  const detectCardType = (number) => {
    const { type } = getCardInfo(number);
    return type;
  };

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\s+/g, "").trim();
    setCardNumber(input);
    setValidationResult("");
    const detectedType = detectCardType(input);
    setCardType(detectedType);
  };

  const validateCard = () => {
    if (!/^\d+$/.test(cardNumber)) {
      setValidationResult(
        "Invalid card number: Only numeric characters are allowed."
      );
      setIsValid(false);
      return;
    }

    if (isValidCardNumber(cardNumber)) {
      setValidationResult("Valid credit card number.");
      setIsValid(true);
    } else {
      setValidationResult("Invalid credit card number.");
      setIsValid(false);
    }
  };

  const isValidCardNumber = (number) => {
    const { type, isValidLength } = getCardInfo(number);
    if (!type || !isValidLength) {
      return false;
    }

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
    <div className="main">
      <h2>Credit Card Validator</h2>
      <CreditCardInput
        cardNumber={cardNumber}
        handleInputChange={handleInputChange}
        validateCard={validateCard}
      />
      <ValidationResult validationResult={validationResult} isValid={isValid} />
      <DisplayCardType cardType={cardType} />
    </div>
  );
};