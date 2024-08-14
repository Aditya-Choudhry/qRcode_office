import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Subscription = () => {
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [subscriptionType, setSubscriptionType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!userId) {
        alert('User ID is missing.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/check-subscription', {
          params: { userId },
        });

        setSubscriptionType(response.data.subscriptionType);

        if (response.data.isSubscribed) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        alert('Failed to check subscription status.');
      }
    };

    checkSubscriptionStatus();
  }, [userId]);

  const getBusinessLimit = (plan) => {
    switch (plan) {
      case 'essential':
        return 2;
      case 'perform':
        return 4;
      case 'enterprise':
        return 6;
      default:
        return 0;
    }
  };
const handleSubscriptionSelect = (subscriptionId) => {
    setSelectedSubscription(subscriptionId);
    if (isSubscribed) {
      setShowManagePopup(true);
    } else {
      setShowPopup(true);
    }
  };
const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleComplete = async () => {
    if (!userId || !selectedSubscription) {
      alert('User ID or Subscription ID is missing.');
      return;
    }

    try {
      if (isSubscribed) {
        setShowUpdatePrompt(true);
      } else {
        const response = await axios.post('http://localhost:5000/api/subscribe', {
          userId,
          subscriptionId: selectedSubscription,
        });

        if (response.data.subscribed) {
          alert("Subscription created successfully.");
          navigate('/business');
        } else {
          alert("Failed to subscribe.");
        }
        setShowPopup(false);
      }
    } catch (error) {
      console.error('Error selecting subscription:', error);
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'Failed to select subscription.';
      alert(errorMessage);
    }
  };

  // Confirm the subscription update
  const handleConfirmUpdate = async () => {
    if (!userId || !selectedSubscription) {
      alert('User ID or Subscription ID is missing.');
      return;
    }

    try {
      // Fetch the number of businesses
      const businessesResponse = await axios.get(`http://localhost:5000/api/business/user/${userId}`);
      const businessCount = businessesResponse.data.length;

      // Determine the new subscription limit
      const newPlanLimit = getBusinessLimit(selectedSubscription);

      if (businessCount > newPlanLimit) {
        alert('You need to delete some businesses before updating your subscription.');
        navigate('/mybusinesses');
        return;
      }

      // Proceed with the subscription update
      const response = await axios.post('http://localhost:5000/api/subscribe', {
        userId,
        subscriptionId: selectedSubscription,
      });

      if (response.data.subscribed) {
        alert("Subscription updated successfully.");
        navigate('/mybusinesses');
      } else {
        alert("Failed to update subscription.");
      }
    } catch (error) {
      console.error('Error confirming subscription update:', error);
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'Failed to update subscription.';
      alert(errorMessage);
    } finally {
      setShowUpdatePrompt(false);
    }
  };

  // Handle manage subscription
  const handleManageSubscription = () => {
    setShowManagePopup(false);
    setShowUpdatePrompt(true); // Show update prompt after managing
  };

  // Handle exit
  const handleExit = () => {
    navigate('/mybusinesses');
  };

  // Render subscription cards based on the subscription status
  const renderSubscriptionCard = (planId, title, price, description, popular) => {
    const isSubscribed = subscriptionType === planId;
    const cardClass = isSubscribed ? 'bg-green-50' : 'bg-white';
    const popularText = isSubscribed ? 'Subscribed' : popular ? 'Most Popular' : 'Subscribe';
    const buttonText = isSubscribed ? 'Update Subscription' : 'Purchase Plan';
    const buttonClass = isSubscribed ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700';

    return (
      <div className={`relative h-full rounded-lg border border-gray-300 ${cardClass} text-gray-900 shadow-lg transition-transform transform hover:scale-105`}>
        <div className="relative flex flex-col h-full p-6 rounded-lg bg-white bg-opacity-90">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
          <div className="inline-flex items-baseline mb-3">
            <span className="text-3xl md:text-4xl font-bold">${price}</span>
            <span className="text-base md:text-xl text-gray-500">/yr</span>
          </div>
          <p className="text-sm mb-5 text-gray-600">{description}</p>
          <button
            className={`block w-full text-center ${buttonClass} text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg transition-colors`}
            onClick={() => handleSubscriptionSelect(planId)}
          >
            {buttonText}
          </button>
          <div className="font-medium mt-4 mb-3">Includes:</div>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="flex items-center">
              <svg className="w-4 h-4 fill-emerald-500 mr-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              Unlimited placeholder texts
            </li>
            {/* Add more items here as needed */}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 text-gray-900 py-12 px-4 lg:px-8">
      {/* Render the subscription cards */}
      <div className="max-w-screen-lg mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderSubscriptionCard('essential', 'Essential', 29, 'Essential features for individuals and small projects.', true)}
        {renderSubscriptionCard('perform', 'Perform', 49, 'Balanced plan with enhanced features for growing teams.', true)}
        {renderSubscriptionCard('enterprise', 'Enterprise', 79, 'Comprehensive plan with all-inclusive features for enterprises.', false)}
      </div>

      {/* Subscription Confirmation Popup */}
      {showPopup && !isSubscribed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Subscription</h2>
            <p className="mb-4">Are you sure you want to subscribe to this plan?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                onClick={handleComplete}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Subscription Prompt */}
      {showUpdatePrompt && isSubscribed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Update Subscription</h2>
            <p className="mb-4">You are already subscribed. Do you want to update your subscription?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => setShowUpdatePrompt(false)}
              >
                No
              </button>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                onClick={handleConfirmUpdate}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Subscription Popup */}
      {showManagePopup && isSubscribed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">You are already subscribed</h2>
            <p className="mb-4">Would you like to manage your subscription or exit?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={handleExit}
              >
                Exit
              </button>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                onClick={handleManageSubscription}
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
