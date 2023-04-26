import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
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

      <Route path="home" element={<HomePage />} />

      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);