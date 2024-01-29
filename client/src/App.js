import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/welcomePage/WelcomePage";
import RegistrationPage from "./pages/registerPage/RegistrationPage";
import LoginPage from "./pages/loginPage/LoginPage";
import UserPage from "./pages/userPage/UserPage";
import RecruiterPage from "./pages/recruiterPage/RecruiterPage";
import Rendertestin from "./__test__/Rendertestin.ignore";

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
          <Routes>
            <Route path="/">
              <Route index element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/user" element={<UserPage />} />
            </Route>
            <Route path="/recuiter">
              <Route index element={<RecruiterPage />} />
            </Route>
            <Route path="/test" element={<Rendertestin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
