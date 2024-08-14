import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('authToken');

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PublicRoute;
