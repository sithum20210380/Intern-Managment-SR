// AdminDashboard.js
import React, { useState } from 'react';
import { Layout, Button, Spin } from 'antd';

import InternProfile from '../InternProfile';
import ViewInterns from '../ViewInterns';

import './styles.sass';

const { Content } = Layout;

const AdminDashboard = () => {
  const [showInternProfile, setShowInternProfile] = useState(false);
  const [showViewInterns, setShowViewInterns] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to toggle the visibility of InternProfile
  const showInternProfileOption = () => {
    setShowInternProfile(!showInternProfile);
    setShowInternProfile(true);
    setShowViewInterns(false);
  };

  // Function to toggle the visibility of ViewInterns
  const showViewInternsOption = () => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      setShowViewInterns(!showViewInterns);
      setIsLoading(false); // Hide loader
      setShowInternProfile(false);
    }, 1000); // Simulate loading for 1 second, replace with actual data fetching logic
  };

  // Function to go back to the main Admin Dashboard
  const goBack = () => {
    setShowInternProfile(false);
    setShowViewInterns(false);
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div className='admin-options'>
            <h1>Intern Profile Manage</h1>
            {showInternProfile || showViewInterns ? (
              <button onClick={goBack}>Back</button>
            ) : (
              <>
                <Button onClick={showInternProfileOption}>
                  Create Intern Profile
                </Button>
                <Button onClick={showViewInternsOption}>
                  View Interns
                </Button>
              </>
            )}
          </div>
          {isLoading ? (
            <div className='view-intern-spin'>
              <Spin size="large" tip="Loading..."/>
            </div>
          ) : (
            <>
              {showInternProfile && <InternProfile />}
              {showViewInterns && <ViewInterns />}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminDashboard;