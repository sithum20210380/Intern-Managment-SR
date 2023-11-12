import React, { useState, useEffect } from 'react';
import { getOrganizations, deleteOrganization } from '../../../../API/organization.api';
import { Table, Button, Modal } from 'antd';

import './styles.sass'

const ViewOrganization = () => {
  // State to store the organizations data
  const [organizations, setOrganizations] = useState([]);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [organizationToDeleteId, setorganizationToDeleteId] = useState(null);


  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
        console.log('organizations data:', data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrganizations();
  }, []);

  const showConfirmDeleteModal = (organizationId) => {
    setorganizationToDeleteId(organizationId);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (organizationToDeleteId) {
      try {
        await deleteOrganization(organizationToDeleteId);
        // Remove the deleted profile from the local state
        const updatedProfiles = organizations.filter((profile) => profile.id !== organizationToDeleteId);
        setOrganizations(updatedProfiles);
        setConfirmDeleteVisible(false);
        console.log('Organizatio with ID: ' + organizationToDeleteId + ' deleted successfully');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
    setorganizationToDeleteId(null);
  };

  // Define the columns for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'action',
      render: (_, organization) => (
        <div>
          <Button type='secondary' className='organization-delete-btn' onClick={() => showConfirmDeleteModal(organization.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={organizations} columns={columns} />
      <Modal
        title="Confirm Delete"
        visible={confirmDeleteVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this intern's profile?</p>
      </Modal>
    </>
  );
};

export default ViewOrganization;
