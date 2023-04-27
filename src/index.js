import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import './colors.css';
import HomePage from './pages/homePage/homePage';
import NoPage from './pages/noPage/noPage';
import Menu from './components/menu/menu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route index element={<HomePage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/user/:userId" element={<NoPage />} />
      <Route path="/user/:userId/activities" element={<NoPage />} />

      <Route path="/activities" element={<NoPage />} />
      <Route path="/activities/:activityId" element={<NoPage />} />

      <Route path="/activities/create" element={<NoPage />} />
      <Route path="/activities/:activityId/configure" element={<NoPage />} />

      <Route path="/login" element={<NoPage />} />
      <Route path="/register" element={<NoPage />} />

      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);