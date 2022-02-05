import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: black;
  padding: 0.5rem;
  margin: 1rem;
  border: none;
  border-radius: 10px;
  background: #d4d4d4;
  box-shadow: 0 3px 0px 0px #a7a7a7;
  transition: all 0.1s;
  &:active {
    transform: translateY(3px);
    box-shadow: none;
  }
`;

const Button = ({ wording, fn }) => {
  return <StyledButton onClick={fn}>{wording}</StyledButton>;
};

export default Button;
