import { FaSpinner } from 'react-icons/fa';

type LoadingProps = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
};

export const Loading = ({ size = 'medium', color = '#643f23' }: LoadingProps) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32
  };

  return (
    <div className="flex justify-center items-center">
      <FaSpinner 
        className="animate-spin" 
        size={sizeMap[size]} 
        color={color} 
      />
    </div>
  );
};