import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";

import "antd/dist/reset.css";
import "@/styles/overrides.scss";
import "@/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
