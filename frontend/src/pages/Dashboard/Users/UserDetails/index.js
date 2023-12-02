import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    getInternProfiles, 
  } from '../../../../API/internProfile.api';
  import { getUsers } from '../../../../API/allUsers.api';

const UserDetail = () => {
  const { userId } = useParams();
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internData = await getInternProfiles();
        const userData = await getUsers();

        // Assuming both internData and userData have unique identifiers
        const combined = [...internData, ...userData];
        setCombinedData(combined);
        console.log("combined",combined);

        // Find the specific user details based on userId
        const user = combined.find(user => user.id === userId || user.id === parseInt(userId, 10));
        console.log("user",user);
        // Update the state with user details
        setUserDetails(user);

        setIsLoading(false);
        console.log(user);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>User Details</h1>
      {userDetails ? (
        <div>
          <p>ID: {userDetails.id}</p>
          <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
