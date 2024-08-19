import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

interface OAuthButtonProps {
  provider: 'google' | 'github' | 'facebook';
  buttonText: string;
  onClick: () => void;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  buttonText,
  onClick,
}) => {
  const getIconComponent = () => {
    switch (provider) {
      case 'google':
        return <FaGoogle className="h-5 w-5 mr-2" />;
      case 'github':
        return <FaGithub className="h-5 w-5 mr-2" />;
      case 'facebook':
        return <FaFacebook className="h-5 w-5 mr-2" />;
      default:
        return '';
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-white text-gray-800 py-3 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200 mt-4"
      onClick={onClick}
    >
      {getIconComponent()}
      {buttonText}
    </button>
  );
};

export default OAuthButton;
