import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx"
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")).render(
  <HelmetProvider>
  <BrowserRouter>
  <ScrollToTop />
  <AppContextProvider>
    <App />
    </AppContextProvider>
  </BrowserRouter>
  </HelmetProvider>
);
