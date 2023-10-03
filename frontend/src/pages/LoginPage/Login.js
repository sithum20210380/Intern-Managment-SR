import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput} from 'mdb-react-ui-kit';
import './styles.sass'

function Login() {
  const [loginData, setLoginData] = useState({
    UserName: '',
    Email: '',
    Password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const apiUrl = 'https://localhost:7066/api/User/token';
  //const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(apiUrl, loginData);
      if (response.data.isAuthenticated) {
        console.log(response.data);
        console.log(response.data.token);
        console.log("Login successful");
        window.location.href = '/adminDashboard';
        //history.push('/adminDashboard');

        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(response.data));

      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle other error scenarios if needed
    }
  };

  return (
    <div className='login-bg'>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" name="Email" onChange={handleInputChange} />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" name="Password" onChange={handleInputChange} />

                <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                  Login
                </MDBBtn>

                {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
