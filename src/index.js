import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModelProvider from "./components/ModelProvider/ModelProvider";

import App from "./components/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ModelProvider>
      <App />
    </ModelProvider>
  </StrictMode>
);
