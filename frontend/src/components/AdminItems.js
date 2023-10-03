import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const AdminItems = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://cdn-icons-png.flaticon.com/512/7486/7486692.png" />}
  >
    <Meta title="Manage Organizations" />
  </Card>
);
export default AdminItems;