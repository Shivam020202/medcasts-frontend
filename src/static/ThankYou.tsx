import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Clock } from 'lucide-react';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="mx-auto h-16 w-16 text-teal-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-600 text-lg">
            Your form has been submitted successfully.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-700 mb-4">
            Our medical team will review your information and get back to you within 24 hours.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center text-teal-700">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">
                Redirecting to home page in {countdown} seconds
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home Page
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Need immediate assistance?</p>
            <a 
              href="https://wa.me/919643452714?text=Hello, I need immediate medical assistance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Contact us on WhatsApp: +91 9643452714
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;