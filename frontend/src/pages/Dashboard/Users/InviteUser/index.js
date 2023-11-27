import React, { useState, useEffect } from 'react';
import { notification, Select } from 'antd';

import { createUser } from '../../../../API/allUsers.api';
import { getOrganizations } from '../../../../API/organization.api';

import './styles.sass'
const { Option } = Select;

const InviteUser = () => {
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);

    // Define the initial state for the form fields
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
        Role: '',
        Company: '',
    });

    // Fetch organizations on component mount
    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const organizationsData = await getOrganizations();
                setOrganizations(organizationsData);
            } catch (error) {
                console.error('Error fetching organizations', error);
            }
        };

        fetchOrganizations();
    }, []);

    // Function to clear all input fields
    const clearForm = () => {
        setFormData({
            FirstName: '',
            LastName: '',
            UserName: '',
            Email: '',
            Password: '',
            Role: '',
            Company: '',
        });
        setError(null);
    };
    // Handle changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const openNotification = (placement) => {
        notification.info({
            message: 'User Invitation Sent',
            placement,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const errorMessage = await createUser(formData);
        if (!errorMessage) {
            openNotification('topRight');
            setError(null);
        } else {
            setError(errorMessage);
        }
    };


    return (
        <div className="User-profile-container">
            {/* <h2 className="intern-profile-heading">Create Intern Profile</h2> */}
            <form onSubmit={handleSubmit} className='User-profile-form'>
                <div className='User-profile-form'>
                    <div>
                        <label className="User-profile-label">FirstName:</label>
                        <input
                            type="text"
                            name="FirstName"
                            placeholder='Required'
                            value={formData.FirstName}
                            onChange={handleInputChange}
                            className="intern-profile-input"
                        />
                    </div>
                    <div>
                        <label className="User-profile-label">LastName:</label>
                        <input
                            type="text"
                            name="LastName"
                            placeholder='Required'
                            value={formData.LastName}
                            onChange={handleInputChange}
                            className="intern-profile-input"
                        />
                    </div>
                    <div>
                        <label className="User-profile-label">Email:</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder='Required'
                            value={formData.Email}
                            onChange={handleInputChange}
                            className="User-profile-input"
                        />
                    </div>
                    <div>
                        <label className="User-profile-label">UserName:</label>
                        <input
                            type="text"
                            name="UserName"
                            value={formData.UserName}
                            onChange={handleInputChange}
                            className="User-profile-input"
                        />
                    </div>
                    <div>
                        <label className="User-profile-label">Password:</label>
                        <input
                            type="text"
                            name="Password"
                            value={formData.Password}
                            onChange={handleInputChange}
                            className="User-profile-input"
                        />
                    </div>
                    <div>
                        <label className="User-profile-label">Role:</label>
                        <Select
                            placeholder="Select Role"
                            value={formData.Role}
                            onChange={(value) => handleInputChange({ target: { name: 'Role', value } })}
                            className="User-role-input"
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="evaluator">Evaluator</Option>
                            <Option value="mentor">Mentor</Option>
                            <Option value="intern">Intern</Option>
                            <Option value="management">Management</Option>
                        </Select>
                    </div>
                    <div>
                        <label className="User-profile-label">Company:</label>
                        <Select
                            placeholder="Select Company"
                            value={formData.Company}
                            onChange={(value) => handleInputChange({ target: { name: 'Company', value } })}
                            className="User-company-input"
                        >
                            {organizations.map((organization) => (
                                <Option key={organization.id} value={organization.companyName}>
                                    {organization.companyName}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className='User-profile-button-container'>
                    <button type="submit" className="User-profile-submit-button">
                        Submit
                    </button>
                    <button type="button" onClick={clearForm} className="User-profile-clear-button">
                        Clear All
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InviteUser;
