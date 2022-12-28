import React from "react";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";

function CallToAction({ children, handleClick, type, ...delegated }, ref) {
  
  return (
    <Wrapper 
      ref={ref} 
      onClick={handleClick} 
      style={{ 
        "--border-radius": type === "circle" ? "100%" : "12px",
        "--padding": type === "circle" ? "4px" : "12px",
      }}
      {...delegated}
    >
      <Front>{children}</Front>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background-color: ${COLORS.black};
  color: ${COLORS.black};
  cursor: pointer;
  font-family: "Karla", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 6px;
  will-change: scale;
  transition: 150ms;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  z-index: 9999;
`;

const Front = styled.span`
  display: block;
  padding: 4px 20px;
  border-radius: var(--border-radius);
  font-size: 1.25rem;
  background: ${COLORS.background.grid};
  user-select: none;
  border: 2px black solid;
  transition: 300ms;
  transform: translateY(-4px);

  ${Wrapper}:hover & {
    transition: 150ms;
    transform: translateY(-6px);
  }

  ${Wrapper}:active & {
    transform: translateY(-2px);
  }
`;

export default React.forwardRef(CallToAction);
