import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Select } from 'antd';
import { getInternProfiles } from '../../../../API/internProfile.api';
import './styles.sass';

const { Option } = Select;

const ViewInterns = () => {
  const [internProfiles, setInternProfiles] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInternProfiles();
        setInternProfiles(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = useCallback((intern) => {
    setSelectedIntern(intern);
    setIsModalVisible(true);
  }, []);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleStatusUpdate = async () => {
    if (selectedIntern && status) {
      try {
        const updatedProfile = { ...selectedIntern, status };
        const updatedProfiles = internProfiles.map((profile) =>
          profile.id === selectedIntern.id ? updatedProfile : profile
        );
        setInternProfiles(updatedProfiles); // Update the status in the table
        // await updateInternStatus(selectedIntern.id, status);
      } catch (error) {
        console.error(error);
      }
    }
    //setIsModalVisible(false); // Close the modal after updating the status
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
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, intern) => (
        <Button type="primary" onClick={() => handleViewDetails(intern)}>
          View profile
        </Button>
      ),
    },
  ];

  return (
    <div className='intern-data-table'>
      <h2>Intern Profile Table</h2>
      <Table
        columns={columns}
        dataSource={internProfiles.map((profile) => ({
          ...profile,
          key: profile.id,
        }))}
      />
      <Modal
        title="Intern Details"
        className='intern-details-modal'
        visible={isModalVisible}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        width={800}
        bodyStyle={{ display: 'flex', flexDirection: 'row' }}
      >
        {selectedIntern && (
          <div style={{ flex: 1 }}>
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
          </div>
        )}
        <Select
          style={{ width: 200 }}
          value={status}
          onChange={handleStatusChange}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Interview Scheduled">Interview Scheduled</Option>
          <Option value="Interview Complete">Interview Complete</Option>
          <Option value="Hired">Hired</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Internship Started">Internship Started</Option>
          <Option value="Internship Ended">Internship Ended</Option>
        </Select>
        <Button type="primary" onClick={handleStatusUpdate}>
          Update Status
        </Button>
      </Modal>
    </div>
  );
};

export default ViewInterns;

