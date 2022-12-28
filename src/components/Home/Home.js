import React from "react";
import styled from "styled-components";
import CallToAction from "../CallToAction";
import { ModelContext } from "../ModelProvider/ModelProvider";

function Home() {
  const { createProject } = React.useContext(ModelContext);

  return (
    <Wrapper>
      <Headline>Domiii</Headline>
      <Subline>Diagram app ideas with your product and dev team</Subline>
      <CallToAction handleClick={createProject}>Create a Project</CallToAction>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 12px;
`;

const Headline = styled.h1`
  font-family: "Karla";
  font-weight: 700;
  font-size: 4rem;
`;

const Subline = styled.h3`
  font-family: "Karla";
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 18px;
`;

export default Home;
