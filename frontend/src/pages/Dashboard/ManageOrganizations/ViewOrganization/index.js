import React, { useState, useEffect } from 'react';
import { getOrganizations } from '../../../../API/organization.api';

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

  return (
    <>
      <h1>Organizations</h1>
      <ul>
        {organizations.map((organization) => (
          <li key={organization.id}>{organization.companyName}</li>
        ))}
      </ul>
    </>
  );
};

export default ViewOrganization;
