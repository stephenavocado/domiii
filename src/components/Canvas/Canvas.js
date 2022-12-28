import React from "react";
import Model from "../Model";
import Xarrow, { Xwrapper } from "react-xarrows";
import { COLORS } from "../../constants";
import CallToAction from "../CallToAction";
import { TextInput } from "../Input";
import styled from "styled-components/macro";
import { AnimatePresence } from "framer-motion";
import { ModelContext } from "../ModelProvider/ModelProvider";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Canvas() {
  const { models, associations, createModel } = React.useContext(ModelContext);
  const constraintsRef = React.useRef();
  const newModalButtonRef = React.useRef();

  return (
    <Wrapper ref={constraintsRef}>
      <ButtonWrapper>
        <CallToAction ref={newModalButtonRef} handleClick={createModel}>
          New Table
        </CallToAction>
      </ButtonWrapper>
      <Xwrapper>
        <AnimatePresence>
          {models.map((model) => {
            return (
              <Model
                model={model}
                key={model.id}
                constraintsRef={constraintsRef}
              />
            );
          })}
        </AnimatePresence>
        {associations?.map(({ ownerId, childId }, index) => {
          return (
            <Xarrow
              start={String(ownerId)}
              end={String(childId)}
              showHead={false}
              key={index}
              color={COLORS.primary.dark}
            />
          );
        })}
      </Xwrapper>
    </Wrapper>
  );
}

const Background = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 8px;
  position: relative;
  background: ${COLORS.primary.light};
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 8px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 16px;
  z-index: 99999;
`;

const InputWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  z-index: 99999;
  transform: translateX(-50%);
`;

export default Canvas;
