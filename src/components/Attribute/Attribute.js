import React from "react";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";
import { ICONS } from "../../data";
import { CrossSmall } from "react-swm-icon-pack";
import Button from "../Button";
import { motion } from "framer-motion";
import { ModelContext } from "../ModelProvider/ModelProvider";
import { Link } from "react-feather";

function Attribute({ attribute, modelId }) {
  const { type, name, required, dataType, associationId } = attribute;
  const { changeAttributeDataType, deleteAttribute } = React.useContext(
    ModelContext
  );

  return (
    <Wrapper
      layout
      style={{
        "--color": COLORS[type].dark,
        "--background": COLORS[type].light
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {dataType && (
        <Icon
          disabled={required}
          onClick={() => {
            !required && changeAttributeDataType(attribute, modelId);
          }}
        >
          {ICONS[dataType].icon}
          <Tip>{dataType}</Tip>
        </Icon>
      )}
      {associationId && <Link size={14} />}
      {name}
      {!required && (
        <Button
          type="circle"
          color={type}
          size="18px"
          handleClick={() => {
            deleteAttribute(attribute, modelId);
          }}
        >
          <CrossSmall color={COLORS[type].dark} />
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  font-family: "Karla", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background: var(--background);
  color: var(--color);
  padding: 4px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Icon = styled.button`
  background: transparent;
  border: none;
  padding: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.tertiary.dark};
  outline-offset: 4px;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Tip = styled.span`
  position: absolute;
  top: -32px;
  left: "-50%";
  display: none;
  font-family: "Karla";
  font-size: 0.9rem;
  background: ${COLORS.tertiary.medium};
  padding: 2px 4px;
  border-radius: 8px;
  border: thin ${COLORS.tertiary.dark} solid;

  ${Icon}:hover & {
    display: revert;
  }
`;

export default Attribute;
