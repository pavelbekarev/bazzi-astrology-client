import React from "react";
import ReactDOM from "react-dom/client";
import { StoreService } from "#shared/lib/services/StoreService.ts";
import App from "./app.tsx";
import "./styles.js";
import { FormManager } from "#features/FormManager/model/index.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

window.App = {};
window.App.MainStore = StoreService.getInstance("mainStorage");
