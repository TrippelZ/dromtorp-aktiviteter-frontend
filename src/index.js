import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import './colors.css';
import HomePage from './pages/homePage/homePage';
import NoPage from './pages/noPage/noPage';
import { ValidateSession } from './api';
import LoginPage from './pages/loginPage/loginPage';

const ValidationLoader = async () => {
  const validSession = await ValidateSession()
  
  if (validSession.Error) {
    return {
      valid: false,
      error: validSession.Error
    }
  }
  return {
    valid: true,
    userId: validSession
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} loader={ValidationLoader} />
      <Route index element={<HomePage />} loader={ValidationLoader} />

      <Route path="/home" element={<HomePage />} loader={ValidationLoader} />

      <Route path="/user/:userId" element={<NoPage loader={ValidationLoader} />} />
      <Route path="/user/:userId/activities" element={<NoPage />} loader={ValidationLoader} />

      <Route path="/activities" element={<NoPage />} loader={ValidationLoader} />
      <Route path="/activities/:activityId" element={<NoPage />} loader={ValidationLoader} />

      <Route path="/activities/create" element={<NoPage />} loader={ValidationLoader} />
      <Route path="/activities/:activityId/configure" element={<NoPage />} loader={ValidationLoader} />

      <Route path="/login" element={<LoginPage />} loader={ValidationLoader} />
      <Route path="/register" element={<NoPage />} loader={ValidationLoader} />

      <Route path="*" element={<NoPage />} loader={ValidationLoader} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);