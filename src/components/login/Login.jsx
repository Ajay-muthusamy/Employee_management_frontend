import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';
  import Home from '../home/Home';
  import Dashboard from '../dashboard/Dashboard';
  import HomeStart from '../home/HomeStart';
  import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
  import EmployeeData from '../Employee/EmployeeData';
  import Projects from '../Employee/Projects';
  import AddEmployee from '../Employee/AddEmployee';
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomeStart />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
  
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          
        <Route path="/dashboard" element={<EmployeeData />} />
        <Route path="/dashboard/Projects" element={<Projects />} />
        </Route>
        <Route path="/add-employee" element={<AddEmployee />} />
      </>
    )
  );
  
  function Login() {
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
  
  export default Login;