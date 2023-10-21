import React, { useState} from 'react';
import {createOrganization} from '../../../../API/organization.api';

const AddOrganization = () => {
    const [companyName, setCompanyName] = useState('');
  
    const handleCompanyNameChange = (e) => {
      setCompanyName(e.target.value);
    };
  
    const handleAddOrganization = async () => {
      createOrganization(companyName);
    };
  
    return (
      <div>
        <h2>Add Organization</h2>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </div>
        <button onClick={handleAddOrganization}>Add Organization</button>
      </div>
    );
  };
  
  export default AddOrganization;
