import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./components/Login/Login";
import AdminLogin from './components/admin/AdminLogin';
import { Provider } from 'react-redux';
import { store } from '../src/helpers/store';
import { PrivateAdminRoute } from './components/admin/PrivateAdminRoute/PrivateAdminRoute';
import Loader from './components/Loader';
import NotFound from './components/user/NotFound/NotFound';
import Home from './components/user/Home/Home';
 function App() {
  return (
      <Router>
        <Provider store={store}>
        <div>
        <Loader></Loader>
          <Switch>
            <Route path="/user">
              <UserLayout />
            </Route>
            <PrivateAdminRoute path="/admin">
              <AdminLayout />
            </PrivateAdminRoute>
            <Route path="/admin-login">
              <AdminLogin />
            </Route>
            
            <Route path="/" exact>
              <UserLayout />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
        <NotificationContainer />
        </Provider>
      </Router>
  );
}

export default App;
