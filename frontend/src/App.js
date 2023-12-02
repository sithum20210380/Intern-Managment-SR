import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import InternProfile from './pages/Dashboard/InternProfile';
import Users from './pages/Dashboard/Users';
import UserDetails from './pages/Dashboard/Users/UserDetails';
import ManageOrganizations from './pages/Dashboard/ManageOrganizations';
import { Layout } from 'antd';
import Sidebar from './pages/SideBar';

import './App.css';


const { Content } = Layout;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route>
          <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
              <Content style={{ margin: '16px' }}>
                <Route path="/users" component={Users} />
                <Route path="/user-details/:userId" component={UserDetails} />
                <Route path="/internProfiles" component={InternProfile} />
                <Route path="/organizations" component={ManageOrganizations} />
                <Route path="/logout" />
              </Content>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
