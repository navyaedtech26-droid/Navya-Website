import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentProvider } from "@/context/ConsentContext";
import { AuthProvider } from "@/context/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ConsentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConsentProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
