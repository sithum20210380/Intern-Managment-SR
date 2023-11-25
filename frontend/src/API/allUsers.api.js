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