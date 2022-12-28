import React from "react";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";

function Button(
  { children, handleClick, type, color = "primary", size, ...delegated },
  ref
) {
  return (
    <Wrapper
      onClick={handleClick}
      ref={ref}
      style={{
        "--border-radius": type === "circle" ? "100%" : "4px",
        "--size": size,
        "--background": COLORS[color].light,
        "--color": COLORS[color].dark,
        "--hover-background": COLORS[color].hover,
        "--focus-background": COLORS[color].medium,
        "--padding": type === "circle" ? "" : "4px 6px"
      }}
      {...delegated}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background: var(--background);
  color: var(--color);
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  border-radius: var(--border-radius);
  padding: var(--padding);
  will-change: scale;
  transition: 150ms;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--hover-background);
  }

  &:active {
    transform: scale(0.85);
    transition: scale 300ms;
    background: var(--focus-background);
  }
`;

export default React.forwardRef(Button);
