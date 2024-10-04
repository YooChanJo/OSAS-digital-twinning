import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>Root</>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
