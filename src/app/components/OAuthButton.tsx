import React from 'react';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

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
        return null;
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center mt-4"
      onClick={onClick}
    >
      {getIconComponent()}
      {buttonText}
    </Button>
  );
};

export default OAuthButton;
