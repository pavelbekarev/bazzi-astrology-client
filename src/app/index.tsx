import React from "react";
import ReactDOM from "react-dom/client";
import { StoreService } from "#shared/lib/services/StoreService.ts";
import "./styles.js";
import { BrowserRouter, Route, Routes } from "react-router";
import { AdminPage } from "#pages/AdminPage/index.ts";
import { MainPage } from "#pages/MainPage/index.ts";
import { PageAboutBazzi } from "#pages/PageAboutBazzi/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/pageAbout"} element={<PageAboutBazzi />} />
      <Route path={"/admin"} element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
);

window.App = {};
window.App.MainStore = StoreService.getInstance("mainStorage");
