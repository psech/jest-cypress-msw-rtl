import React, { useState, useRef } from 'react';

export default function Toggle() {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const refInput = useRef(null);

  const handleToggleClick = () => {
    setShowInput((prevState) => !prevState);
    setText('');
  };
  const handleInputChange = () => {
    setText(refInput.current.value);
  };

  return (
    <>
      <h3>Toggle</h3>
      <button onClick={handleToggleClick}>
        {showInput ? 'Hide input' : 'Show input'}
      </button>
      {showInput && (
        <>
          <input
            onChange={handleInputChange}
            ref={refInput}
            type="text"
            aria-label="input-field"
            placeholder="type something here..."
          />
          <p>
            <span aria-label="copied text">{text}</span>
          </p>
        </>
      )}
    </>
  );
}
