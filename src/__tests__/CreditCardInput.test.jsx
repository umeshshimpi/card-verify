import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CreditCardInput } from "../components/CreditCardInput";
import '@testing-library/jest-dom/extend-expect';

test("renders input and button", () => {
  const { getByPlaceholderText, getByText } = render(
    <CreditCardInput cardNumber="" handleInputChange={() => {}} validateCard={() => {}} />
  );
  expect(getByPlaceholderText("Enter credit card number")).toBeInTheDocument();
  expect(getByText("Validate")).toBeInTheDocument();
});

test("calls handleInputChange on input change", () => {
  const handleInputChange = jest.fn();
  const { getByPlaceholderText } = render(
    <CreditCardInput cardNumber="" handleInputChange={handleInputChange} validateCard={() => {}} />
  );
  fireEvent.change(getByPlaceholderText("Enter credit card number"), {
    target: { value: "4111111111111111" },
  });
  expect(handleInputChange).toHaveBeenCalled();
});

test("calls validateCard on button click", () => {
  const validateCard = jest.fn();
  const { getByText } = render(
    <CreditCardInput cardNumber="" handleInputChange={() => {}} validateCard={validateCard} />
  );
  fireEvent.click(getByText("Validate"));
  expect(validateCard).toHaveBeenCalled();
});
