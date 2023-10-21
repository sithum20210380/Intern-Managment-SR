import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,

} from '@ant-design/icons';

import Logo from '../../assets/logo.png'

import './styles.sass';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider>
    {/* <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}> */}
      <div>
        {collapsed ? <DashboardOutlined /> : <img src={Logo} alt="logo" className="logo" />}
      </div>
      <div className="user-role-dashboard-title">
        {collapsed ? <DashboardOutlined /> : <span>Admin Dashboard</span>}
      </div>
      <div className="user-welcome">
        {userData && (
          <p>Welcome, {userData.userName}</p>
        )}
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/adminDashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
          <Link to="/organizations"></Link>Organizations
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
