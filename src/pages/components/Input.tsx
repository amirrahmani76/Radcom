import React from "react";

interface InputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center sm:text-lg">
      <label htmlFor="m">
        {label} :
      </label>
      <input
        type="number"
        className="border-transparent border-b-2 border-b-orange-500 bg-transparent focus:border-b-green-500 focus:ring-transparent focus:border-transparent text-sm sm:text-base"
        // value={value}
        placeholder="0"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
