import './App.css'
import Layout from './components/common/layout.tsx';
import Navbar from './components/common/Navbar.tsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home.tsx';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },{

  }
])


function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App
