import React, { useEffect, useState } from 'react';
import './validate.css';

type ValidatedInputProps = {
  value: string;
  onChange: (value: string) => void;
  validate: (value: string) => string | null;
  label?: string;
  placeholder?: string;
};

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  value,
  onChange,
  validate,
  label,
  placeholder,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validationResult = validate(value);
    setError(validationResult);
  }, [value, validate]);

  return (
    <div className="validated-input">
      {label && <label className="validated-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`validated-field ${error ? 'error' : ''}`}
      />
      {error && <span className="validated-error">{error}</span>}
    </div>
  );
};

export default ValidatedInput;
