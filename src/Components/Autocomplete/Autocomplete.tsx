import React, { useState } from 'react';
import './Autocomplete.css';

export const Autocomplete: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className='autocomplete'>
      <input
        type='text'
        value={text}
        onChange={handleChange}
        placeholder='Type name of a post...'
      />
    </div>
  );
};
