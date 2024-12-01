import React from "react";
import { render } from "@testing-library/react";
import { ValidationResult } from "../components/ValidationResult";
import '@testing-library/jest-dom/extend-expect';

test("displays validation result with correct class", () => {
  const { getByText } = render(
    <ValidationResult validationResult="Valid credit card number." isValid={true} />
  );
  expect(getByText("Valid credit card number.")).toBeInTheDocument();
});

test("displays invalid validation result with correct class", () => {
  const { getByText } = render(
    <ValidationResult validationResult="Invalid credit card number." isValid={false} />
  );
  expect(getByText("Invalid credit card number.")).toBeInTheDocument();
});