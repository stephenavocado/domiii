import React from "react";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";
import { capitalizeFirstLetter } from "../../utils";
import { ModelContext } from "../ModelProvider/ModelProvider";
import pluralize from "pluralize";

function Input({ id, value, name, models, setError }, ref) {
  const { editModel } = React.useContext(ModelContext);
  const modelNames = models.map((model) => model.name);

  function handleSubmit() {
    event.preventDefault();
    ref.current.blur();
  }

  React.useEffect(() => {
    if (name.length === 0) {
      ref.current.focus();
    } else {
      return;
    }
  }, [name, ref]);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        ref={ref}
        type="text"
        id="model-input"
        value={value}
        placeholder="New Table"
        onChange={(event) => {
          const value = capitalizeFirstLetter(event.target.value);
          const singularValue = pluralize.singular(value);
          if (modelNames.includes(value)) {
            setError("No duplicate tabels");
            editModel(value, id);
          } else {
            setError("");
            editModel(value, id);
          }
        }}
      />
    </form>
  );
}

export const TextInput = styled.input`
  font-family: "Karla", sans-serif;
  border: none;
  text-align: center;
  background: ${COLORS.white};
  font-size: 1.75rem;
  font-weight: 600;
  width: 226px;

  &::placeholder {
    font-family: "Karla", sans-serif;
    font-weight: 600;
    color: ${COLORS.gray500};
  }
`;

export default React.forwardRef(Input);
