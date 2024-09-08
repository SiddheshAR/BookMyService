import './App.css'
import Layout from './components/common/layout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ServiceDescription from './pages/ServiceDescription.tsx';
import Login from './pages/Login.tsx';


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
    </Layout>
  }
])


function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App
