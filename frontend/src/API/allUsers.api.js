const apiUrl = 'https://localhost:7066/api';

// Get all User profiles
export const getUsers = async () => {
    try {
        const response = await fetch(`${apiUrl}/User/GetUsers`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to Users');
        }
    } catch (error) {
        throw new Error('Error Users: ' + error);
    }
};

// Create a new User profile
export const createUser = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/User/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (response.ok) {
            console.log('Invite sent successfully');
        } else {
            const errorData = await response.json();
            return errorData.message || 'Failed to create User';
        }
    } catch (error) {
        throw new Error('Error creating User: ' + error);
    }
};