import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
