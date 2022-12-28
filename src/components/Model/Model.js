import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useXarrow } from "react-xarrows";
import Attribute from "../Attribute";
import AttributeInput from "../AttributeInput";
import styled from "styled-components/macro";
import { COLORS } from "../../constants";
import Button from "../Button";
import { Trash } from "react-feather";
import Input from "../Input";
import { ModelContext } from "../ModelProvider/ModelProvider";
import Error from "../Error";

function Model({ model, constraintsRef }) {
  const { id, name, attributes, position } = model;
  const [startPosition, setStartPosition] = React.useState(position);
  const [error, setError] = React.useState(null);
  const {
    deleteModel,
    setModelPosition,
    models,
    prettyMode
  } = React.useContext(ModelContext);
  const updateXarrow = useXarrow();
  const modelRef = React.useRef();
  const inputRef = React.useRef();

  function updateWindowPosition(info) {
    console.log(info);
    if (Object.keys(position).length === 0) {
      const startingTop = modelRef.current.offsetTop;
      const startingLeft = modelRef.current.offsetLeft;
      const newPosition = {
        x: startingLeft + info.offset.x,
        y: startingTop + info.offset.y
      };
      //console.log(newPosition);
      setModelPosition(newPosition, id);
    } else {
      const newPosition = {
        x: position.x + info.offset.x,
        y: position.y + info.offset.y
      };
      //console.log(newPosition);
      setModelPosition(newPosition, id);
    }
  }

  React.useEffect(() => {
    function handleResize() {
      updateXarrow();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateXarrow, models]);

  return (
    <Shadow
      layout
      drag
      id={id}
      whileDrag={updateXarrow}
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      ref={modelRef}
      onDragEnd={(event, info) => updateWindowPosition(info)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        "--left-position": `${startPosition.x}px`,
        "--top-position": `${startPosition.y}px`
      }}
    >
      <Surface>
        <Input
          id={id}
          value={name}
          ref={inputRef}
          name={name}
          models={models}
          setError={setError}
        />
        <AttributeSection>
          <AnimatePresence>
            {attributes.map((attribute, index) => {
              return (
                <Attribute key={index} attribute={attribute} modelId={id} />
              );
            })}
          </AnimatePresence>
          {!prettyMode && (
            <AttributeInput
              modelId={id}
              attributes={attributes}
              setError={setError}
            />
          )}
          {error && <Error error={error} />}
        </AttributeSection>
        <DeleteButton
          type="circle"
          color="secondary"
          size="20px"
          handleClick={() => deleteModel(id)}
        >
          <Trash size={12} strokeWidth={3} />
        </DeleteButton>
      </Surface>
    </Shadow>
  );
}

const Shadow = styled(motion.div)`
  border-radius: 12px;
  width: 250px;
  position: absolute;
  top: var(--top-position);
  left: var(--left-position);
  background-color: ${COLORS.black};
  z-index: 1;
`;

const Surface = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 12px;
  background: ${COLORS.white};
  width: 250px;
  min-height: 175px;
  cursor: grab;
  position: relative;
  border: 2px black solid;
  transform: translateY(-2px);

  &:active {
    cursor: grabbing;
  }
`;

const AttributeSection = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 6px;
  margin-bottom: 20px;
  position: relative;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  bottom: 6px;
  right: 6px;
  color: ${COLORS.secondary.dark};

  &:hover {
    color: ${COLORS.white};
    background-color: ${COLORS.secondary.dark};
  }
`;

export default Model;
