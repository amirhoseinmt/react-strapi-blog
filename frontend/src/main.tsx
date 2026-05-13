import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.classList.toggle("dark", savedTheme === "dark");
} else {
  document.documentElement.classList.add("dark"); // default dark
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
