import React, { useState } from 'react';
import { Layout, Button, Spin } from 'antd';

import ViewOrganization from './ViewOrganization';
import AddOrganization from './AddOrganization';

const { Content } = Layout;

const ManageOrganizations = () => {
  const [showOrganizations, setshowOrganizations] = useState(false);
  const [AddOrganizations, setAddOrganization] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Function to toggle the visibility of Organiaztions
  const showOrganizationsOption = () => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      setshowOrganizations(!showOrganizations);
      setIsLoading(false); // Hide loader
      setAddOrganization(false);
    }, 1000);
  };

  // Function to toggle the visibility of AddOrganization
  const AddOrganizationOption = () => {
    setAddOrganization(!AddOrganizations);
    setAddOrganization(true);
    setshowOrganizations(false);
  };

  // Function to go back to the main Admin Dashboard
  const goBack = () => {
    setshowOrganizations(false);
    setAddOrganization(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div className='admin-options'>
            <h1>Organization Manage</h1>
            {showOrganizations || AddOrganizations ? (
              <button onClick={goBack}>Back</button>
            ) : (
              <>
                <Button onClick={AddOrganizationOption}>
                  Create Organization
                </Button>
                <Button onClick={showOrganizationsOption}>
                  View Organization
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
              {showOrganizations && <ViewOrganization />}
              {AddOrganizations && <AddOrganization/>}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageOrganizations;
