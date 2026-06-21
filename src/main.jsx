import { createRoot } from "react-dom/client";
import App from "./App";
import { aplicarTema, obterTemaSalvo } from "./utils/tema";
import "./index.css";

aplicarTema(obterTemaSalvo());

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}

createRoot(document.getElementById("root")).render(<App />);

