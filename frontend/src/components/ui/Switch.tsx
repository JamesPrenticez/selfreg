interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = ({ id, checked, onChange }: SwitchProps) => {
  
  const handleClick = () => {
    onChange(!checked); 
  };

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        // onChange={() => {}}
        className="sr-only" // This hides the checkbox but keeps it accessible for forms
        readOnly
      />
      <div
        onClick={handleClick}
        className={`relative inline-flex items-center h-6 w-11 cursor-pointer transition-colors duration-300 ease-in-out ${
          checked ? 'bg-blue-500' : 'bg-gray-300'
        } rounded-full`}
      >
        <span
          className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </div>
    </div>
  );
};
