import React from "react";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";
import { AlertCircle } from "react-feather";

function Error({ error, ...delegated }) {
  return <Wrapper {...delegated}><AlertCircle size={12} /> {error}</Wrapper>;
}

const Wrapper = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: ${COLORS.tertiary.dark};
  border-radius: 6px;
  position: absolute;
  bottom: -24px;
  left: 0px;
  overflow: auto;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export default Error;
