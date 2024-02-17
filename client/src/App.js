import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HeadPresenter from "./presenters/headPresenter/HeadPresenter";
import WelcomePage from "./pages/welcomePage/WelcomePage";
import RegistrationPage from "./pages/registerPage/RegistrationPage";
import LoginPage from "./pages/loginPage/LoginPage";
import UserPage from "./pages/userPage/UserPage";
import RecruiterPage from "./pages/recruiterPage/RecruiterPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import JobApplicationsPage from "./pages/jobApplicationsPage/JobApplicationsPage";
import SchedulePage from "./pages/schedulePage/SchedulePage";
import ApplicationFormPage from "./pages/applicationFormPage/ApplicationFormPage";
import { useRecoilValue } from "recoil";
import { currentUserState } from "./model/userModel";
import { userLoggedIn } from "./model/userModel";
import NotificationPage from "./pages/notificationsPage/NotificationPage";

/**
 * React component for the main App.
 *
 * @return {JSX.Element} The main App component
 */
function App() {
  const user = useRecoilValue(currentUserState);
  const isLoggedIn = useRecoilValue(userLoggedIn);

  return (
    <div data-testid="app-componenet" className="App">
      <div className="content">
        <BrowserRouter>
          <HeadPresenter />
          <Routes>
            <Route path="/">
              <Route index element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/notification" element={<NotificationPage />} />

              <Route path="/user">
                <Route
                  index
                  element={
                    !isLoggedIn & <LoginPage /> && user.role === "APPLICANT" ? (
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
                <Route
                  path="dashboard"
                  element={
                    !isLoggedIn & <LoginPage /> || user.role === "APPLICANT" ? (
                      <DashboardPage />
                    ) : (
                      <Navigate
                        to="/notification"
                        state={{ redirect: "/recruiter/dashboard", code: 401 }}
                        replace
                      />
                    )
                  }
                />{" "}
                <Route
                  path="application"
                  element={
                    !isLoggedIn & <LoginPage /> || user.role === "APPLICANT" ? (
                      <ApplicationFormPage />
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
            </Route>
            <Route path="/recruiter">
              <Route index element={<RecruiterPage />} />
              <Route
                path="dashboard"
                element={
                  !isLoggedIn & <LoginPage /> || user.role === "RECRUITER" ? (
                    <DashboardPage />
                  ) : (
                    <Navigate
                      to="/notification"
                      state={{ redirect: "/user/dashboard", code: 401 }}
                      replace
                    />
                  )
                }
              />
              <Route
                path="schedule"
                element={
                  !isLoggedIn & <LoginPage /> || user.role === "RECRUITER" ? (
                    <SchedulePage />
                  ) : (
                    <Navigate
                      to="/notification"
                      state={{ redirect: "/user/dashboard", code: 401 }}
                      replace
                    />
                  )
                }
              />{" "}
              <Route
                path="applications"
                element={
                  !isLoggedIn & <LoginPage /> || user.role === "RECRUITER" ? (
                    <JobApplicationsPage />
                  ) : (
                    <Navigate
                      to="/notification"
                      state={{ redirect: "/user/dashboard", code: 401 }}
                      replace
                    />
                  )
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
