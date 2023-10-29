const apiUrl = 'https://localhost:7066/api';

// Create a new intern profile
export const createInternProfile = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/User/createinternprofile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return null;
        } else {
            const errorData = await response.json();
            return errorData.message || 'Failed to create intern profile';
        }
    } catch (error) {
        return 'An error occurred while submitting the form';
    }
};

// Get all intern profiles
export const getInternProfiles = async () => {
    try {
        const response = await fetch(`${apiUrl}/User/internprofiles`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch intern profiles');
        }
    } catch (error) {
        throw new Error('Error fetching intern profiles: ' + error);
    }
};

// Update an intern profile
export const updateInternProfile = async (id, formData) => {
    try {
        const response = await fetch(`${apiUrl}/User/updateinternprofile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return null;
        } else {
            const errorData = await response.json();
            return errorData.message || 'Failed to update intern profile';
        }
    } catch (error) {
        return 'An error occurred while updating the intern profile';
    }
};

// Delete an intern profile
export const deleteInternProfile = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/User/deleteinternprofile/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return null;
        } else {
            const errorData = await response.json();
            return errorData.message || 'Failed to delete intern profile';
        }
    } catch (error) {
        return 'An error occurred while deleting the intern profile';
    }
};