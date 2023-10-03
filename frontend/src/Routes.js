// // Routes.js
// import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import adminDashboard from './pages/adminDashboard';
// import Login from './components/Login';

// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// const Routes = ({ isAuthenticated }) => (
//   <Switch>
//     <Route path="/login" component={Login} />
//       <ProtectedRoute
//         path="/admin"
//         component={adminDashboard}
//         isAuthenticated={isAuthenticated}
//       />
//     <Redirect from="/" to="/login" />
//   </Switch>
// );

// export default Routes;
