import './App.css'
import Layout from './components/common/layout.tsx';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ServiceDescription from './pages/ServiceDescription.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/SignUp.tsx';
import UserLogin from './components/auth/user/userLogin.tsx';
import ServiceProviderLogin from './components/auth/serviceProvider/serviceProviderLogin.tsx';
import ManagerLogin from './components/auth/manager/managerLogin.tsx';
import SessionsList from './pages/SessionsList.tsx';
import UserServices from './pages/UserServices.tsx';
import UserBookedSessions from './pages/UserBookedSessions.tsx';
import ProfileUpdateForm from './components/serviceProvider/profileUpdate.tsx';
import { useSelector } from 'react-redux';
import UnAuthorized from './pages/unAuthorized.tsx';
import { useEffect } from 'react';
import AssignedSessions from './pages/serviceProvider/AssignedSessions.tsx';

const AuthenticatedRole = ()=>{
  const user = useSelector(state=>state.auth.user);
  return user;
}

  const ProtectedRoutes = ({role,children}:{role:string,children:React.ReactNode})=>{
    const Navigate = useNavigate();
    const user = useSelector(state=>state.auth.user);
    const {role:userRole} = user || {};

    useEffect(()=>{
      if(!user ||  userRole ==""){
        Navigate('/');
      }
      if(userRole != role){
        Navigate('/unauthorized');
      }
    },[])
    return(
      <>
      {children}      
      </>
    )
  }


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path:'/unauthorized',
    element:(
      <Layout>
          <UnAuthorized/>
      </Layout>
    )
  }
  ,{
    path:'/service/:id',
    element:
    <Layout>
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
    element:
    <ProtectedRoutes role={"manager"}>
    <Layout>
      <ServiceProviderLogin/>
    </Layout>
    </ProtectedRoutes>
  },
  {
    path:'/manage/sessions',
    element:
    <ProtectedRoutes role={"manager"}>
      <Layout>
        <SessionsList/>
      </Layout>
    </ProtectedRoutes>
  },
  {
    path:'/user/services',
    element:
    <Layout>
      <UserServices/>
    </Layout>
  },
  {
    path:'/user/booked_services',
    element:
    <ProtectedRoutes role={"user"}>
      <Layout>
        <UserBookedSessions/>
      </Layout>
    </ProtectedRoutes>
  },
  {
    path:'/serviceProvider/updateProfile',
    element:(
    <ProtectedRoutes role={"serviceProvider"}>
    <Layout>
        <ProfileUpdateForm/>
    </Layout>
    </ProtectedRoutes>
  )
  },
  {
    path:'/serviceProvider/sessions',
    element:(
    <ProtectedRoutes role={"serviceProvider"}>
      <Layout>
          <AssignedSessions/>
      </Layout>
    </ProtectedRoutes>
  )
  }
])


function App() {
  console.log("User Data",AuthenticatedRole());
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App
