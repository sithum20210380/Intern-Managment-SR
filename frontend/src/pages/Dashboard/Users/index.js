import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Spin, Drawer} from 'antd';

import { 
  getInternProfiles, 
} from '../../../API/internProfile.api';
import { getUsers } from '../../../API/allUsers.api';
import InviteUser from './InviteUser';

const Users = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

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
          <Link to={`/user-details/${intern.id}`}>
            <Button type='primary'>View Details</Button>
          </Link>
        </div>
      ),
    },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <div>
        <Button onClick={showDrawer}>
          Invite User
        </Button>
        <Drawer
        title="Invite User"
        width={720}
        onClose={onCloseDrawer}
        visible={drawerVisible}
      >
        <InviteUser onCloseDrawer={onCloseDrawer} />
      </Drawer>
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
