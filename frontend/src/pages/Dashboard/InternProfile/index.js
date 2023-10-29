import React, { useState } from 'react';
import { Layout, Button, Spin, Drawer } from 'antd';

import InternProfile from './CreateInternProfile';
import ViewInterns from './ViewInterns';

import './styles.sass';

const { Content } = Layout;

const AdminDashboard = () => {
  const [showInternProfile, setShowInternProfile] = useState(false);
  const [showViewInterns, setShowViewInterns] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false); // Add state for refreshing the table

  // Function to toggle the visibility of InternProfile
  const showInternProfileOption = () => {
    setShowInternProfile(!showInternProfile);
    setShowInternProfile(true);
    setShowViewInterns(false);
  };

  // Function to toggle the visibility of ViewInterns
  const showViewInternsOption = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowViewInterns(!showViewInterns);
      setIsLoading(false);
      setShowInternProfile(false);
    }, 1000);
  };

  // Function to go back to the main Admin Dashboard
  const goBack = () => {
    setShowInternProfile(false);
    setShowViewInterns(false);
  };

  // Function to open the Drawer for creating a new intern profile
  const showCreateProfileDrawer = () => {
    setDrawerVisible(true);
  };

  // Function to close the Drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Function to refresh the table
  const refreshTableData = () => {
    setRefreshTable(!refreshTable);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div className='admin-options'>
            <h1>Intern Profile Manage</h1>
            <Button type="primary" onClick={showCreateProfileDrawer}>
              Create New Intern Profile
            </Button>
            <Button onClick={refreshTableData}>
              Refresh Table
            </Button>
          </div>
          {isLoading ? (
            <div className='view-intern-spin'>
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <>
              {showInternProfile && <InternProfile />}
              {showViewInterns && (
                <ViewInterns key={refreshTable ? 'refreshed' : 'default'} />
              )}
            </>
          )}
        </Content>
      </Layout>
      <Drawer
        title="Create a new intern profile"
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        {isDrawerVisible && <InternProfile />}
      </Drawer>
    </Layout>
  );
};

export default AdminDashboard;
