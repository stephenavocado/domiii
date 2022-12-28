import React from "react";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";
import { motion } from "framer-motion";
import { ModelContext } from "../ModelProvider/ModelProvider";

function AttributeInput({ modelId, attributes, setError }) {
  const { createAttribute } = React.useContext(ModelContext);
  const [value, setValue] = React.useState("");
  const attributeNames = attributes.map((item) => item.name);

  function handleSubmit() {
    event.preventDefault();

    if (attributeNames.includes(value)) {
      setError("No duplicate attributes");
      return;
    }

    createAttribute(value, modelId);
    setError("");
    setValue("");
  }

  function handleChange(event) {
    const lowerCasedValue = event.target.value.toLowerCase();

    setValue(lowerCasedValue);
  }

  return (
    <>
      <Wrapper layout>
        <form onSubmit={handleSubmit}>
          <Input
            required
            type="text"
            id="association-input"
            minLength={1}
            value={value}
            placeholder={"+ new attribute"}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
  overflow: visible;
`;

const Input = styled.input`
  font-family: "Karla", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background: ${COLORS.tertiary.light};
  color: ${COLORS.tertiary.dark};
  border-radius: 4px;
  border: ${COLORS.tertiary.dark};
  padding: 4px 6px;
  outline-offset: 3px;
  width: 126px;

  &::placeholder {
    color: ${COLORS.tertiary.dark};
    font-weight: 500;
  }
`;

export default AttributeInput;
