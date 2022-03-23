import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PersonalProfilePage from "./pages/PersonalProfilePage";
import QuantLabPage from "./pages/QuantLabPage";
import QuantModelDetailsPage from "./pages/QuantModelDetailsPage";
import QuantModelListPage from "./pages/QuantModelListPage";
import SignUpPage from "./pages/SignUpPage";
import { RootState } from "./stores/store";

function PrivateWrapper() {
  const isLoggedin = useSelector(
    (state: RootState) => state.session.isLoggedin
  );

  return isLoggedin ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/LoginPage" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />

        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<PersonalProfilePage />} />
          <Route
            path="/QuantModelDetailsPage/:id"
            element={<QuantModelDetailsPage />}
          />
          <Route path="/QuantModelListPage" element={<QuantModelListPage />} />
          <Route path="/QuantLabPage" element={<QuantLabPage />} />
          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
