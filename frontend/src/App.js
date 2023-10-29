import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Users from './pages/Dashboard/Users';
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
                <Route path="/adminDashboard" component={AdminDashboard} />
                <Route path="/users" component={Users} />
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
