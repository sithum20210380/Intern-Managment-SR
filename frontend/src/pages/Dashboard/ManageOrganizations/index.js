import React, { useState } from 'react';
import { Card, Modal } from 'antd';

const { Meta } = Card;

const ManageOrganizations = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        onClick={showModal}
        cover={<img alt="example" src="https://cdn-icons-png.flaticon.com/512/7486/7486692.png" />}
      >
        <Meta title="Manage Organizations" />
      </Card>

      <Modal
        title="Manage Organizations"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // You can customize the footer if needed
      >
        {/* Your form content goes here */}
        {/* Replace this with your actual form */}
        <form>
          {/* Form fields go here */}
        </form>
      </Modal>
    </>
  );
};

export default ManageOrganizations;
