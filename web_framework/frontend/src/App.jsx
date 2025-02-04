import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './routes/home';
import AnalysisInitForm from './routes/analysisInitForm';

import Analysis3Dmodels from './routes/3dModelView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/analysis/init-form", // need to change path name to a more better one
    element: <AnalysisInitForm />
  },
  {
    path: "/analysis/3Dmodels", // need to change path name to a more better one
    element: <Analysis3Dmodels />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

