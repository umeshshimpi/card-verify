import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { App } from "../components/App";
import '@testing-library/jest-dom/extend-expect';

test("renders without crashing", () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  expect(getByText("Credit Card Validator")).toBeInTheDocument();
  expect(getByPlaceholderText("Enter credit card number")).toBeInTheDocument();
  expect(getByText("Validate")).toBeInTheDocument();
});

test("validates a valid card number", () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText("Enter credit card number");
  fireEvent.change(input, { target: { value: "4111111111111111" } });
  fireEvent.click(getByText("Validate"));
  expect(getByText("Valid credit card number.")).toBeInTheDocument();
});

test("displays error for invalid card number with non-numeric characters", () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText("Enter credit card number");
  fireEvent.change(input, { target: { value: "4111abcd" } });
  fireEvent.click(getByText("Validate"));
  expect(getByText("Invalid card number: Only numeric characters are allowed.")).toBeInTheDocument();
});

test("displays error for invalid card number not passing Luhn algorithm", () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText("Enter credit card number");
  fireEvent.change(input, { target: { value: "1234567890123456" } });
  fireEvent.click(getByText("Validate"));
  expect(getByText("Invalid credit card number.")).toBeInTheDocument();
});
