import React from "react";
import { render } from "@testing-library/react";
import { DisplayCardType } from "../components/DisplayCardType";
import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";
import discover from "../assets/images/discover.png";
import '@testing-library/jest-dom/extend-expect';

const cardImages = { 
  Visa: visa,
  MasterCard: mastercard,
  Discover: discover
};

test("displays card type and image when cardType is provided", () => {
  const { getByAltText, getByText } = render(<DisplayCardType cardType="Visa" />);
  expect(getByAltText("Visa")).toBeInTheDocument();
  expect(getByText("Card Type:")).toBeInTheDocument();
});

test("does not display card type when cardType is not provided", () => {
  const { queryByText } = render(<DisplayCardType cardType="" />);
  expect(queryByText("Card Type:")).toBeNull();
});
