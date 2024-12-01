import React from 'react'
import visa from "../assets/images/visa.png"
import mastercard from "../assets/images/mastercard.png"
import discover from "../assets/images/discover.png"

const cardImages = { 
  Visa: visa,
  MasterCard: mastercard,
  Discover: discover
};

export const DisplayCardType = ({ cardType }) => (
  <>
    {cardType && (
      <p>
        Card Type: <span>
          {cardImages[cardType] && 
            <img className="card-image" src={cardImages[cardType]} alt={cardType} /> 
          }
        </span>
      </p>
    )}
  </>
);