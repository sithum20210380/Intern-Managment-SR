import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Select, Tag, Spin, Layout } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { 
  getInternProfiles, 
  updateInternProfile, 
  deleteInternProfile 
} from '../../../API/internProfile.api';

const { Content } = Layout;
const { Option } = Select;

const Users = () => {
  const [internProfiles, setInternProfiles] = useState([]);
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
  const columns = [
    {
      title:'Id',
      dataIndex:'id',
      key:'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
          dataSource={internProfiles.map((profile) => ({
            ...profile,
            key: profile.id,
          }))}
        />
      )}
    </div>
  );
};

export default Users
