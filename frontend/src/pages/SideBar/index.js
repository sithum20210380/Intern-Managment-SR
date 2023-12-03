import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import Logo from '../../assets/logo.png'

import './styles.sass';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Redirect to the login page
    window.location.href = '/'; 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <Sider>
      <div>
        {collapsed ? <DashboardOutlined /> : <img src={Logo} alt="logo" className="logo" />}
      </div>
      <div className="user-role-dashboard-title">
        {collapsed ? <DashboardOutlined /> : <span>{userData && userData.roles} Dashboard</span>}
      </div>
      <div className="user-welcome">
        {userData && (
          <p>Welcome, {userData.userName}</p>
        )}
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {(userData && (userData.roles.includes('admin') || userData.roles.includes('Mentor')|| userData.roles.includes('management')|| userData.roles.includes('Intern')||userData.roles.includes('evaluator'))) && (
          <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        )}
        {(userData && (userData.roles.includes('admin') || userData.roles.includes('Mentor')|| userData.roles.includes('management')|| userData.roles.includes('Intern')||userData.roles.includes('evaluator'))) && (        <Menu.Item key="2" icon={<DashboardOutlined />}>
          <Link to="/internProfiles">Intern Profile</Link>
        </Menu.Item>
        )}
        {(userData && (userData.roles.includes('admin') || userData.roles.includes('Mentor')|| userData.roles.includes('management')|| userData.roles.includes('evaluator'))) && (
        <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
          <Link to="/organizations">Organizations</Link>
        </Menu.Item>
        )}
        {(userData && (userData.roles.includes('admin') || userData.roles.includes('Mentor')|| userData.roles.includes('evaluator'))) && (
        <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
          <Link to="/evaluation">Evaluation</Link>
        </Menu.Item>
        )}
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={showModal}>
          Logout
        </Menu.Item>
      </Menu>
      <Modal
        title="Logout Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Sider>
  );
};

export default Sidebar;
