import React, { useState, useEffect } from 'react';
import { getOrganizations } from '../../../../API/organization.api';
import { Table } from 'antd';

const ViewOrganization = () => {
  // State to store the organizations data
  const [organizations, setOrganizations] = useState([]);

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
    // Add more columns as needed
  ];

  return (
    <>
      <Table dataSource={organizations} columns={columns} />
    </>
  );
};

export default ViewOrganization;
