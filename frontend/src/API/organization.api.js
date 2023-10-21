const apiUrl = 'https://localhost:7066/api';

// Create a new organization
export const createOrganization = async (companyName) => {
  try {
    const response = await fetch(`${apiUrl}/User/createOrganization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName }),
    });

    if (response.ok) {
      console.log('Organization added successfully');
    } else {
      console.error('Failed to add organization');
    }
  } catch (error) {
    console.error('Error adding organization:', error);
  }
};

// Get all organizations
export const getOrganizations = async () => {
    try {
      const response = await fetch(`${apiUrl}/User/GetOrganization`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch organizations');
      }
    } catch (error) {
      throw new Error('Error fetching organizations: ' + error);
    }
  };