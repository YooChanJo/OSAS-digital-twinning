import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BloodO2PressureAnalysis from './routes/bloodO2PressureAnalysis';
import Home from './routes/home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/analysis/blood-o2-pressure-analysis", // need to change path name to a more better one
    element: <BloodO2PressureAnalysis />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
