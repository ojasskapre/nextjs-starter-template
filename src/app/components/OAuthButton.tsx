import React from 'react';

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
  const getIconPath = () => {
    switch (provider) {
      case 'google':
        return '/path/to/google-icon.svg'; // Update with actual path
      case 'github':
        return '/path/to/github-icon.svg'; // Update with actual path
      case 'facebook':
        return '/path/to/facebook-icon.svg'; // Update with actual path
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
      <img
        src={getIconPath()}
        alt={`${provider} Icon`}
        className="h-5 w-5 mr-2"
      />
      {buttonText}
    </button>
  );
};

export default OAuthButton;
