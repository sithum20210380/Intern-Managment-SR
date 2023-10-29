import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Select, Tag, Spin } from 'antd';

import { getInternProfiles, updateInternProfile, deleteInternProfile } from '../../../../API/internProfile.api';

import './styles.sass';

const { Option } = Select;

const ViewInterns = () => {
  const [internProfiles, setInternProfiles] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [internToDeleteId, setInternToDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInternProfiles();
        setInternProfiles(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = useCallback((intern) => {
    setSelectedIntern(intern);
    setIsModalVisible(true);
    // Set the status in the modal to the selected intern's status
    setUpdatedProfile({ ...intern });
  }, []);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = (field, value) => {
    setStatus(value.toString());
    setUpdatedProfile({ ...updatedProfile, [field]: value });
  };

  const showConfirmDeleteModal = (internId) => {
    setInternToDeleteId(internId);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (internToDeleteId) {
      try {
        await deleteInternProfile(internToDeleteId);
        // Remove the deleted profile from the local state
        const updatedProfiles = internProfiles.filter((profile) => profile.id !== internToDeleteId);
        setInternProfiles(updatedProfiles);
        setConfirmDeleteVisible(false);
        console.log('Intern profile with ID: ' + internToDeleteId + ' deleted successfully');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
    setInternToDeleteId(null);
  };

  const handleUpdateProfile = async () => {
    if (selectedIntern && updatedProfile) {
      try {
        const response = await updateInternProfile(selectedIntern.id, updatedProfile);

        if (response === null) {
          // The profile was updated successfully, update the local state
          const updatedProfiles = internProfiles.map((profile) =>
            profile.id === selectedIntern.id ? { ...updatedProfile } : profile
          );
          setInternProfiles(updatedProfiles);
          setIsModalVisible(false); // Close the modal
          console.log('Intern profile updated successfully');
        } else {
          console.error('Failed to update intern profile. Error message: ' + response);
        }
      } catch (error) {
        console.error('An error occurred while updating the intern profile: ' + error);
      }
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'Name',
    },
    {
      title: 'University',
      dataIndex: 'university',
      key: 'University',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'Email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'Status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Pending':
            color = 'red';
            break;
          case 'Interview Scheduled':
            color = 'blue';
            break;
          case 'Interview Complete':
            color = 'green';
            break;
          case 'Hired':
            color = 'purple';
            break;
          case 'Rejected':
            color = 'orange';
            break;
          case 'Internship Started':
            color = 'brown';
            break;
          case 'Internship Ended':
            color = 'teal';
            break;
          default:
            color = 'black';
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, intern) => (
        <div>
          <Button type="primary" onClick={() => handleViewDetails(intern)}>
            View profile
          </Button>
          <Button type="danger" onClick={() => showConfirmDeleteModal(intern.id)}>
            Delete
          </Button>

        </div>
      ),
    },
  ];

  return (
    <div className='intern-data-table'>
      {/* <h2>Intern Profile Table</h2> */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={internProfiles.map((profile) => ({
            ...profile,
            key: profile.id,
          }))}
        />
      )}
      <Modal
        title="Intern Details"
        className='intern-details-modal'
        visible={isModalVisible}
        onOk={handleUpdateProfile}
        onCancel={handleModalCancel}
        width={800}
        bodyStyle={{ display: 'flex', flexDirection: 'row' }}
      >
        {selectedIntern && (
          <div style={{ flex: 1 }}>
            {/* <p>Name: <Input value={updatedProfile.name} onChange={(e) => handleInputChange('name', e.target.value)} /></p> */}
            <p>Name: {selectedIntern.name}</p>
            <p>University: {selectedIntern.university}</p>
            <p>Email: {selectedIntern.email}</p>
            <p>Interview Score: {selectedIntern.interviewScore}</p>
            <p>Evolution1 Score: {selectedIntern.evolution1Score}</p>
            <p>Evolution2 Score: {selectedIntern.evolution2Score}</p>
            <p>Accomplishments: {selectedIntern.accomplishments}</p>
            <p>GPA: {selectedIntern.gpa}</p>
          </div>
        )}
        {selectedIntern && (
          <div style={{ flex: 1 }}>
            <p>Interview Feedback: {selectedIntern.interviewFeedback}</p>
            <p>Evolution1 Feedback: {selectedIntern.evolution1Feedback}</p>
            <p>Evolution2 Feedback: {selectedIntern.evolution2Feedback}</p>
            <p>Project Details: {selectedIntern.projectDetails}</p>
            <p>Assigned Team: {selectedIntern.assignedTeam}</p>
            <p>Mentor: {selectedIntern.mentor}</p>
            <p>Upload CV: {selectedIntern.uploadCV}</p>
            <p>Status: {selectedIntern.status}</p>
            <Select
              style={{ width: 200 }}
              value={updatedProfile.status}
              onChange={(value) => handleStatusChange('status', value)}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Interview Scheduled">Interview Scheduled</Option>
              <Option value="Interview Complete">Interview Complete</Option>
              <Option value="Hired">Hired</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="Internship Started">Internship Started</Option>
              <Option value="Internship Ended">Internship Ended</Option>
            </Select>
          </div>
        )}
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={confirmDeleteVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this intern's profile?</p>
      </Modal>
    </div>
  );
};

export default ViewInterns;

