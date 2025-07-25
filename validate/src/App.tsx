import React, { useState } from 'react';
import ValidatedInput from './component/validate/ValidatedInput';

const App: React.FC = () => {
  const [name, setName] = useState('');

  const validateName = (value: string): string | null => {
    if (value.trim() === '') return 'Không được để trống';
    if (value.length < 5) return 'Phải có ít nhất 5 ký tự';
    return null;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400 }}>
      <h2>Form với Validated Input</h2>
      <ValidatedInput
        label="Tên:"
        placeholder="Nhập tên..."
        value={name}
        onChange={setName}
        validate={validateName}
      />
    </div>
  );
};

export default App;
