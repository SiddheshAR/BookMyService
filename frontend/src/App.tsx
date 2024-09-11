import './App.css'
import Layout from './components/common/layout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ServiceDescription from './pages/ServiceDescription.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/SignUp.tsx';
import UserLogin from './components/auth/user/userLogin.tsx';
import ServiceProviderLogin from './components/auth/serviceProvider/serviceProviderLogin.tsx';
import ManagerLogin from './components/auth/manager/managerLogin.tsx';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },{
    path:'/service/:id',
    element:<Layout>
      <ServiceDescription/>
    </Layout>
  },
  {
    path:'/login',
    element:<Layout>
      <Login/>
    </Layout>,
    children:[
      {
        path:'user',
        element:<UserLogin/>
      },
      {
        path:'serviceProvider',
        element:<ServiceProviderLogin/>
      },
      {
        path:'manager',
        element:<ManagerLogin/>
      }
    ]

  },
  {
    path:'/register',
    element:<Layout>
      <Register/>
    </Layout>
  },
  {
    path:'/serviceProvider/login',
    element:<Layout>
      <ServiceProviderLogin/>
    </Layout>
  },
  // {
  //   path:'/serviceProvider/login',
  //   element:<Layout>
      
  //   </Layout>
  // }
])


function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App
