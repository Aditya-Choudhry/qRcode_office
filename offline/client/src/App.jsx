import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MyBusinesses from './pages/MyBusinesses';
import useIsAuth from './useIsAuth'; 
import Layout from './components/Layout';
import Subscription from './pages/Subscription';
import Contact from './pages/Contact';
import Business from './pages/Business';
import Form from './pages/form';
import PositiveForm from './pages/positiveForm';
import FeedbackForm from './pages/complaintForm';
import ReviewForm from './pages/ReviewForm';
import PrivateForm from './pages/privateForm';
import Admin from './pages/Admin'; 
import Dashboard from './pages/Dashboard';
import Complaint from './pages/Complaints';

const App = () => {
  const { isAuthenticated, isAdmin } = useIsAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="business/form/:language/:businessId" element={<Form />} />
        <Route path="positiveForm/:language/:businessId" element={<PositiveForm />} />
        <Route path="reviewForm/:language" element={<ReviewForm />} />
        <Route path="/unsubscribed" element={<Subscription />} />
        <Route path="complaintForm/:language/:businessId" element={<FeedbackForm />} />
        <Route path="privateform/:language" element={<PrivateForm />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/mybusinesses" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/mybusinesses" /> : <Signup />} />

        {/* Protected Routes with Layout */}
        {isAuthenticated && (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mybusinesses" element={<MyBusinesses />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business/:id" element={<Business />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/complaints' element={< Complaint />} />

            {isAdmin && (
              <>
                <Route path="/admin" element={<Admin />} />
              </>
            )}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;


