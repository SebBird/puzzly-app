import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: black;
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 10px;
`;

const Button = ({ wording, fn }) => {
  return <StyledButton onClick={fn}>{wording}</StyledButton>;
};

export default Button;
