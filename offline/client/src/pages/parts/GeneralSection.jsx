import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import QRCodeLib from 'qrcode';

const GeneralSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessLogo: null,
    banner: null,
    businessName: '',
    businessAddress: '',
    businessType: '',
    defaultLanguage: 'en',
    url: '',
  });
  const [userData, setUserData] = useState({
    userId: localStorage.getItem('userId'),
    subscriptionPlan: '',
    businessCount: 0,
  });
  const [error, setError] = useState('');
  const [isUrlEditable, setIsUrlEditable] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:5000/api/business/${id}`);
          setFormData(prevData => ({ ...prevData, ...response.data }));
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
        setError('Failed to fetch business data.');
      }
    };

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/user/${userData.userId}`);
        const userSubscriptionPlan = userResponse.data.subscriptionType;
        setUserData(prev => ({
          ...prev,
          subscriptionPlan: userSubscriptionPlan,
        }));

        const businessesResponse = await axios.get(`http://localhost:5000/api/business/user/${userData.userId}`);
        setUserData(prev => ({
          ...prev,
          businessCount: businessesResponse.data.length,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
    };

    fetchBusinessData();
    fetchUserData();
  }, [id, userData.userId]);

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        [field]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const limit = getBusinessLimit(userData.subscriptionPlan);

    if (userData.businessCount >= limit) {
      setError('You have reached the maximum number of businesses allowed for your subscription.');
      return;
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/business/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/business', {
          ...formData,
          ownerid: userData.userId,
        });
      }
      navigate(`/mybusinesses`);
      resetForm();
    } catch (error) {
      console.error('Error saving business data:', error);
      setError('Failed to save business data.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        await axios.delete(`http://localhost:5000/api/business/${id}`);
        navigate(`/mybusinesses`);
      } catch (error) {
        console.error('Error deleting business:', error);
        setError('Failed to delete business.');
      }
    }
  };

  const getBusinessLimit = (plan) => {
    switch (plan) {
      case 'essential': return 2;
      case 'perform': return 4;
      case 'enterprise': return 6;
      default: return 0;
    }
  };

  const resetForm = () => {
    setFormData({
      businessLogo: null,
      banner: null,
      businessName: '',
      businessAddress: '',
      businessType: '',
      defaultLanguage: 'en',
      url: '',
    });
  };

  const handleQRCodeToggle = () => setShowQRCode(prev => !prev);

  const handleQRCodeDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.toBlob(blob => saveAs(blob, 'qrcode.png'));
    }
  };

  const handleBannerDownload = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const bannerWidth = 800;
    const bannerHeight = 600;
    const qrCodeSize = 150;

    canvas.width = bannerWidth;
    canvas.height = bannerHeight;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(formData.businessName, bannerWidth / 2, 50);

    try {
      const qrCodeDataURL = await QRCodeLib.toDataURL(`https://localhost:5731/form/en/${id}`, { width: qrCodeSize });
      const qrCodeImage = new Image();
      qrCodeImage.src = qrCodeDataURL;
      qrCodeImage.onload = () => {
        ctx.drawImage(qrCodeImage, (bannerWidth - qrCodeSize) / 2, 100, qrCodeSize, qrCodeSize);

        ctx.fillStyle = '#FFD700';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('★★★★★', bannerWidth / 2, 100 + qrCodeSize + 50);

        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText('Barqon URL: ' + formData.url, bannerWidth / 2, 100 + qrCodeSize + 90);

        canvas.toBlob(blob => {
          const filename = `${formData.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_QR_code.png`;
          saveAs(blob, filename);
        });
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError('Failed to generate QR code.');
    }
  };

  const businessFormUrl = `http://localhost:5731/form/en/${id}`;
  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Logo Section */}
        <div className="flex flex-col">
          <label htmlFor="businessLogo" className="text-gray-700 text-lg font-semibold mb-2">Business Logo</label>
          <input
            type="file"
            id="businessLogo"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'businessLogo')}
            className="border border-gray-300 rounded-md p-2"
          />
          {formData.businessLogo && (
            <img
              src={formData.businessLogo}
              alt="Business Logo"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
          <p className="mt-2 text-gray-600 text-sm">Upload your business logo here. It will be displayed for your customers.</p>
        </div>
      
        {/* Business Name Section */}
        <div className="flex flex-col">
          <label htmlFor="businessName" className="text-gray-700 text-lg font-semibold mb-2">Business Name</label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData(prevData => ({ ...prevData, businessName: e.target.value }))}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter business name"
          />
          <p className="mt-1 text-gray-600 text-sm">This is the name of your business.</p>
        </div>
      
        {/* Business Address Section */}
        <div className="flex flex-col">
          <label htmlFor="businessAddress" className="text-gray-700 text-lg font-semibold mb-2">Business Address</label>
          <input
            type="text"
            id="businessAddress"
            value={formData.businessAddress}
            onChange={(e) => setFormData(prevData => ({ ...prevData, businessAddress: e.target.value }))}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter business address"
          />
          <p className="mt-1 text-gray-600 text-sm">This is for your own reference.</p>
        </div>
      
        {/* Business Type Section */}
        <div className="flex flex-col">
          <label htmlFor="businessType" className="text-gray-700 text-lg font-semibold mb-2">Business Type</label>
          <input
            type="text"
            id="businessType"
            value={formData.businessType}
            onChange={(e) => setFormData(prevData => ({ ...prevData, businessType: e.target.value }))}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter business type"
          />
          <p className="mt-1 text-gray-600 text-sm">This allows the AI to better understand your business. If it is not accurate, you can expect sub-optimal results.</p>
        </div>
      
        {/* Default Language Section */}
        <div className="flex flex-col">
          <label htmlFor="defaultLanguage" className="text-gray-700 text-lg font-semibold mb-2">Default Language</label>
          <select
            id="defaultLanguage"
            value={formData.defaultLanguage}
            onChange={(e) => setFormData(prevData => ({ ...prevData, defaultLanguage: e.target.value }))}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      
        {/* URL Section */}
        <div className="flex flex-col">
          <label htmlFor="url" className="text-gray-700 text-lg font-semibold mb-2">Barqon URL</label>
          <input
            type="text"
            id="url"
            value={formData.url}
            onChange={(e) => setFormData(prevData => ({ ...prevData, url: e.target.value }))}
            disabled={!isUrlEditable}
            className={`border border-gray-300 rounded-md p-3 ${!isUrlEditable ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'}`}
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="editUrl"
              checked={isUrlEditable}
              onChange={(e) => setIsUrlEditable(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="editUrl" className="text-gray-700 text-sm">Allow editing of URL</label>
          </div>
        </div>
      
        {/* Conditional Banner Section */}
        {id && (
          <div className="flex flex-col">
            <label htmlFor="banner" className="text-gray-700 text-lg font-semibold mb-2">Banner</label>
            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'banner')}
              className="border border-gray-300 rounded-md p-2"
            />
            {formData.banner && (
              <img
                src={formData.banner}
                alt="Banner"
                className="mt-2 w-full h-32 object-cover rounded-md"
              />
            )}
          </div>
        )}
      
        {/* Conditional QR Code Section */}
        {id && (
          <div className="flex flex-col">
            <button
              type="button"
              onClick={handleQRCodeToggle}
              className="px-2 py-1 bg-green-500 text-white rounded-md"
            >
              {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {showQRCode && (
              <div className="mt-4 flex flex-col items-center">
                <QRCode value={businessFormUrl} />
                <button
                  type="button"
                  onClick={handleQRCodeDownload}
                  className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-md"
                >
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        )}
      
        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {id ? 'Update Business' : 'Create Business'}
          </button>
          {id && (
            <>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete Business
              </button>
              <button
                type="button"
                onClick={() => window.location.href = `form/en/${id}`}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              >
                Go to Form
              </button>
              <button
                type="button"
                onClick={handleBannerDownload}
                className="px-4 py-2 bg-purple-500 text-white rounded-md"
              >
                Download Banner
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default GeneralSection;