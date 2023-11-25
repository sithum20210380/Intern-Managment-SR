import React, { useState, useEffect} from 'react';
import { Table, Button, Spin} from 'antd';

import { 
  getInternProfiles, 
} from '../../../API/internProfile.api';
import { getUsers } from '../../../API/allUsers.api';

const Users = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internData = await getInternProfiles();
        const userData = await getUsers();

        // Assuming both internData and userData have unique identifiers
        const combined = [...internData, ...userData];
        setCombinedData(combined);
        setIsLoading(false);
        console.log(combined);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title:'Id',
      dataIndex:'id',
      key:'id',
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'Name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'Email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, intern) => (
        <div className='action-container'>
          {/* <Button type='secondary' className='intern-delete-btn' onClick={() => showConfirmDeleteModal(intern.id)}>
            <DeleteOutlined />
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Button>
          Invite User
        </Button>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={combinedData.map((data) => ({
            ...data,
            key: data.id, // Assuming 'id' is a unique identifier
          }))}
        />
      )}
    </div>
  );
};

export default Users
