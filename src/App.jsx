import './App.css';
import { Signin } from './Routes/Signin';
import { Home } from './Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { Protected } from './Routes/Protected';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Protected><Home /></Protected>
    },
    {
      path:"/home",
      element:<Protected><Home /></Protected>
    },
    {
      path:"/signin",
      element:<Signin></Signin>
    }
  ])

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
