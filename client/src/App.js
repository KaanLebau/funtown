
import './App.css';
import{BrowserRouter, Route, Routes} from 'react-router-dom';
import WelcomePage from './pages/welcomePage/WelcomePage';
import RegistrationPage from './pages/registerPage/RegistrationPage';
import LoginPage from './pages/loginPage/LoginPage';
import UserPage from './pages/userPage/UserPage';

/**
 * React component for the main App.
 *
 * @return {JSX.Element} The main App component
 */
function App() {
  return (
    <div className="App">
      <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<WelcomePage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/registration' element={<RegistrationPage/>}/>
            </Route>
            <Route path='/user'>
              <Route index element={<UserPage />}/>
            </Route>
          
          </Routes>  
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
