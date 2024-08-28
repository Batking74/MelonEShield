// Importing Modules/Packages
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SecurityChecklistPage from './pages/SecurityChecklistPage.jsx';
import SecurityMeasureInfo from './pages/SecurityMeasureInfoPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Stylesheet
import './assets/output/main.min.css';
import 'highlight.js/styles/github.css';


// Creating React Routes
const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      index: true,
      element: <LoginPage />
    },
    {
      path: '/Home',
      element: <SecurityChecklistPage />
    },
    {
      path: '/Home/SecurityMeasureInfo/:id',
      element: <SecurityMeasureInfo />
    },
  ]
}]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);