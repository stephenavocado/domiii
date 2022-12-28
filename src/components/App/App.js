import React from "react";
import "../../styles.css";
import Home from "../Home";
import Canvas from "../Canvas";
import { ModelContext } from "../ModelProvider/ModelProvider";

export default function App() {
  const { projects } = React.useContext(ModelContext);

  return <Canvas />;
}
