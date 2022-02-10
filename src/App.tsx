import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import MainPage from "./pages/MainPage";
import PersonalProfilePage from "./pages/PersonalProfilePage";
import QuantLabPage from "./pages/QuantLabPage";
import QuantModelDetailsPage from "./pages/QuantModelDetailsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/PersonalProfilePage"
            element={<PersonalProfilePage />}
          />
          <Route
            path="/QuantModelDetailsPage"
            element={<QuantModelDetailsPage />}
          />
          <Route path="/QuantLabPage" element={<QuantLabPage />} />
          <Route path="/SettingsPage" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
