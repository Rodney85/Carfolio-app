import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConvexClerkProvider } from "./providers/ConvexClerkProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ConvexClerkProvider>
        <App />
      </ConvexClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);
