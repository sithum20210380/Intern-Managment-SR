import React, { useState } from 'react';
import './styles.sass'
import {createInternProfile} from '../../../../API/internProfile.api';


const InternProfile = () => {
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null);

  // Define the initial state for the form fields
  const [formData, setFormData] = useState({
    Name: '',
    University: '',
    Email: '',
    InterviewScore: 0,
    InterviewFeedback: '',
    Evolution1Score: '',
    Evolution1Feedback: '',
    Evolution2Score: '',
    Evolution2Feedback: '',
    Accomplishments: '',
    GPA: 0,
    ProjectDetails: '',
    AssignedTeam: '',
    Mentor: '',
    UploadCV: '',
    Status: '',
  });

  // Function to clear all input fields
  const clearForm = () => {
    setFormData({
      Name: '',
      University: '',
      Email: '',
      InterviewScore: 0,
      InterviewFeedback: '',
      Evolution1Score: '',
      Evolution1Feedback: '',
      Evolution2Score: '',
      Evolution2Feedback: '',
      Accomplishments: '',
      GPA: 0,
      ProjectDetails: '',
      AssignedTeam: '',
      Mentor: '',
      UploadCV: '',
      Status: '',
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = await createInternProfile(formData);
    if (!errorMessage) {
      setSuccessMessage('Intern profile created successfully'); 
      console.log('Intern profile created successfully');
      setError(null);
    } else {
      setError(errorMessage);
    }
  };


  return (
    <div className="intern-profile-container">
      <h2 className="intern-profile-heading">Create Intern Profile</h2>
      {error && <div className="intern-profile-errorr">{error}</div>}
      {successMessage && <div className="intern-profile-success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className='intern-profile-form'>
        <div className='intern-profile-form'>
          <div>
            <label className="intern-profile-label">Name:</label>
            <input
              type="text"
              name="Name"
              placeholder='Required'
              value={formData.Name}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">University:</label>
            <input
              type="text"
              name="University"
              placeholder='Required'
              value={formData.University}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Email:</label>
            <input
              type="email"
              name="Email"
              placeholder='Required'
              value={formData.Email}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Interview Score:</label>
            <input
              type="number"
              name="InterviewScore"
              value={formData.InterviewScore}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Interview Feedback:</label>
            <input
              type="text"
              name="InterviewFeedback"
              value={formData.InterviewFeedback}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Evolution 1 Score:</label>
            <input
              type="text"
              name="Evolution1Score"
              value={formData.Evolution1Score}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Evolution 1 Feedback:</label>
            <input
              type="text"
              name="Evolution1Feedback"
              value={formData.Evolution1Feedback}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Evolution 2 Score:</label>
            <input
              type="text"
              name="Evolution2Score"
              value={formData.Evolution2Score}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Evolution 2 Feedback:</label>
            <input
              type="text"
              name="Evolution2Feedback"
              value={formData.Evolution2Feedback}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Accomplishments:</label>
            <input
              type="text"
              name="Accomplishments"
              value={formData.Accomplishments}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">GPA:</label>
            <input
              type="number"
              name="GPA"
              value={formData.GPA}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Project Details:</label>
            <input
              type="text"
              name="ProjectDetails"
              value={formData.ProjectDetails}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Assigned Team:</label>
            <input
              type="text"
              name="AssignedTeam"
              value={formData.AssignedTeam}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Mentor:</label>
            <input
              type="text"
              name="Mentor"
              value={formData.Mentor}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Status:</label>
            <input
              type="text"
              name="Status"
              value={formData.Status}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
          <div>
            <label className="intern-profile-label">Upload CV:</label>
            <input
              type="text"
              name="UploadCV"
              value={formData.UploadCV}
              onChange={handleInputChange}
              className="intern-profile-input"
            />
          </div>
        </div>
        <div className='intern-profile-button-container'>
          <button type="submit" className="intern-profile-submit-button">
            Submit
          </button>
          <button type="button" onClick={clearForm} className="intern-profile-clear-button">
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternProfile;
