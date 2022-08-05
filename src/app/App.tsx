import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import "./App.css";
import {AuthRoute} from "../utils/auth_route";
import ProtectedRoute from '../utils/auth_route'



// import FirebaseUi from "../features/auth/firebaseUi";
import Routes from "../Constants/routes";
import axios from "axios";
import {getAuthData} from "../api/jwt.service"
import {Spin} from "antd";
import SingleItem from "../pages/Landing/SingleItem/SingleItem.container";
// import Example from "../pages/TailwindLanding/example1";
// import Example2 from "../pages/TailwindLanding/eg2";

//========= ----------  pages import --------- =============


import Apps from "../pages/tailwindUis/All";
// import SignUpPage from "../features/auth/ui/registerWIthPhone";
import {

  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const Example = lazy(()=> import("../pages/tailwindUis/TailwindLanding/example1"));
const Example2 = lazy(()=> import("../pages/tailwindUis/TailwindLanding/eg2"));


const LoginPage = lazy(()=> import("../features/auth/ui/login."));
const SignUpPage = lazy(()=> import("../features/auth/ui/registerWIthPhone"));
const Dashboard = lazy(()=> import('../pages/admin/index'));
const NotFoundPage = lazy(()=> import("../components/not-found"));
const Landing = lazy(()=> import("../pages/Landing/Landing"));

const App = () => {
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getAuthData()?.token}`;
    return config;
  });
  return (
      <QueryClientProvider client={queryClient}>
    <Router>
      <Suspense fallback={<Spin  size="large"/>} >
    <Switch>
      {/*<Route  path={Routes.ADMIN} component={Dashboard}/>*/}
      <ProtectedRoute  path={Routes.ADMIN} component={Dashboard}/>

      <AuthRoute  path={Routes.LOGIN} component={LoginPage}/>
      <Route path={Routes.SIGNUP}><SignUpPage /> </Route>
      <Route path='/eg'><Example /> </Route>
      <Route path='/eg2'><Example2 /> </Route>
      <Route path='/eg3'><Apps /> </Route>


      <Route path="/">  < Landing/> </Route>
      <Route path="*"><NotFoundPage /> </Route>

    </Switch>
      </Suspense>
    </Router>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
  );
};

export default App;
