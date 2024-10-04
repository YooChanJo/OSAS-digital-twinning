import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HumanGasExchange from './routes/humanGasExchange';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>Root</>
  },
  {
    path: "/human/gas-exchange", // need to change path name to a more better one
    element: <HumanGasExchange />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
