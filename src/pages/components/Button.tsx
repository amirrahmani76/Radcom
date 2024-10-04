import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 sm:text-lg">
      {label}
    </button>
  );
};

export default Button;
