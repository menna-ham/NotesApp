import logo from './logo.svg';
import './App.css';
import { createBrowserRouter,  createHashRouter,  RouterProvider } from 'react-router-dom';
import MainLayOut from './Components/MainLayout/MainLayOut';
import Notes from './Components/Notes/Notes';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import {  UserDataContext, UserDataContextProvider } from './Context/LoginDataContext';
import {  useContext, useEffect } from 'react';

function App() {
  let {ProtectedRouter}= useContext(UserDataContext);

  let routes = createHashRouter([
    {path:'/',element:<MainLayOut/>,children:[
      {index:'true',element:<ProtectedRouter><Notes/></ProtectedRouter>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>},

    ]}
  ])
  return (
      <RouterProvider router={routes} />
  );
}

export default App;
