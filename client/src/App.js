import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
/**
 * React component for the main App.
 *
 * @return {JSX.Element} The main App component
 */
function App() {
  return (
    <div data-testid="app-componenet" className="App">
      <div className="content">
        <BrowserRouter>
          <HeadPresenter /> {/* Include HeadPresenter here */}
          <Routes>
            <Route path="/">
              <Route index element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />

              <Route path="/user">
                <Route index element={<UserPage />} />
                <Route path="dashboard" element={<DashboardPage />} />{" "}
                <Route path="application" element={<ApplicationFormPage />} />
              </Route>
            </Route>
            <Route path="/recruiter">
              <Route index element={<RecruiterPage />} />
              <Route path="dashboard" element={<DashboardPage />} />{" "}
              <Route path="schedule" element={<SchedulePage />} />{" "}
              <Route path="applications" element={<JobApplicationsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
