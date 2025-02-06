import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './routes/home';
import Analysis from './routes/analysis';
import Presentation from './routes/presentation'; // 프레젠테이션 페이지 추가
import Analysis3Dmodels from './routes/3dModelView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/analysis/blood-O2", // need to change path name to a more better one
    element: <Analysis />
  },
  {
     path: "/analysis/3Dmodels", // need to change path name to a more better one
     element: <Analysis3Dmodels />
  },
  {
    path: "/presentation", // 새로운 프레젠테이션 페이지 경로 추가
    element: <Presentation />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

