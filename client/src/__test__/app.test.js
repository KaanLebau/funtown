import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "../App.js";
import UserPage from "../pages/userPage/UserPage";
import LoginPage from "../pages/loginPage/LoginPage";
import "@testing-library/jest-dom";

describe("App component", () => {
  test("renders without crashing", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
    expect(screen.getByTestId("app-componenet")).toBeInTheDocument();
  });

  test("render welcomepage by default", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
    expect(screen.getByTestId("welcome-page")).toBeInTheDocument();
  });

  test("renders UserPage if user is logged in as an APPLICANT", () => {
    const isLoggedIn = true;
    const user = { role: "APPLICANT" };

    render(
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  isLoggedIn && user.role === "APPLICANT" ? (
                    <UserPage />
                  ) : (
                    <Navigate
                      to="/notification"
                      state={{ redirect: "/recruiter/dashboard", code: 401 }}
                      replace
                    />
                  )
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByTestId("user-page")).toBeInTheDocument();
  });
});
