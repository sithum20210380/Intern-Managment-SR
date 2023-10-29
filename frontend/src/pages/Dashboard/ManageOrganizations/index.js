import React, { useState } from 'react';
import { Layout, Button, Spin, Drawer } from 'antd';

import ViewOrganization from './ViewOrganization';
import AddOrganization from './AddOrganization';

const { Content } = Layout;

const ManageOrganizations = () => {
  const [showOrganizations, setshowOrganizations] = useState(true); // Initially show organizations
  const [AddOrganizations, setAddOrganization] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Add state for the Drawer
  const [refreshTable, setRefreshTable] = useState(false); // Add state for refreshing the table


  // Function to toggle the visibility of Organizations
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

  // Function to open the Drawer for creating a new organization
  const showCreateOrganizationDrawer = () => {
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
            <h1>Organization Manage</h1>
            <Button type="primary" onClick={showCreateOrganizationDrawer}>
              Create New Organization
            </Button>
            <Button onClick={refreshTableData}>
              Refresh Table
            </Button>
          </div>
          {isLoading ? (
            <div className='view-intern-spin'>
              <Spin size="large" tip="Loading..."/>
            </div>
          ) : (
            <>
              {showOrganizations && <ViewOrganization />}
              {AddOrganizations && <AddOrganization />}
            </>
          )}
        </Content>
      </Layout>
      <Drawer
        title="Create a new organization"
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        {isDrawerVisible && <AddOrganization />} {/* Display the AddOrganization form inside the Drawer */}
      </Drawer>
    </Layout>
  );
};

export default ManageOrganizations;
