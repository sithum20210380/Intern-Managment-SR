// Layout.js
import React from 'react';

import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Users from '../pages/Dashboard/Users';
import Login from '../pages/LoginPage/Login';
import Sidebar from '../pages/SideBar';

//import Organizations from './Organizations';

const { Content } = Layout;

const LayoutContainer = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/adminDashboard" component={AdminDashboard} />
            <Route path="/users" component={Users} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
