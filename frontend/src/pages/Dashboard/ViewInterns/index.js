import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import './styles.sass';

const ViewInterns = () => {
  const [internProfiles, setInternProfiles] = useState([]);

  useEffect(() => {
    // Fetch intern profile data from your database or API
    fetch('https://localhost:7066/api/User/internprofiles')
      .then((response) => response.json())
      .then((data) => {
        setInternProfiles(data); // Assuming data is an array of intern profiles
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
      title: 'Interview Score',
      dataIndex: 'interviewScore',
      key: 'InterviewScore',
    },
    {
      title: 'Interview Feedback',
      dataIndex: 'interviewFeedback',
      key: 'InterviewFeedback',
    },
    {
      title: 'Evolution1 Score',
      dataIndex: 'evolution1Score',
      key: 'Evolution1Score',
    },
    {
      title: 'Evolution1 Feedback',
      dataIndex: 'evolution1Feedback',
      key: 'Evolution1Feedback',
    },
    {
      title: 'Evolution2 Score',
      dataIndex: 'evolution2Score',
      key: 'Evolution2Score',
    },
    {
      title: 'Evolution2 Feedback',
      dataIndex: 'evolution2Feedback',
      key: 'Evolution2Feedback',
    },
    {
      title: 'Accomplishments',
      dataIndex: 'accomplishments',
      key: 'Accomplishments',
    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'GPA',
    },
    {
      title: 'Project Details',
      dataIndex: 'projectDetails',
      key: 'ProjectDetails',
    },
    {
      title: 'Assigned Team',
      dataIndex: 'assignedTeam',
      key: 'AssignedTeam',
    },
    {
      title: 'Mentor',
      dataIndex: 'mentor',
      key: 'Mentor',
    },
    {
      title: 'Upload CV',
      dataIndex: 'uploadCV',
      key: 'UploadCV',
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
    </div>
  );
};

export default ViewInterns;

