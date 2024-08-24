// Importing Modules/Packages
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import { createRoot } from 'react-dom/client';
import SecurityChecklistPage from './pages/SecurityChecklistPage.jsx';
import App from './App.jsx';

// Stylesheet
import './assets/output/main.min.css';

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
  ]
}]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)