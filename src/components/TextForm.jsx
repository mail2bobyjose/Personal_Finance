// src/components/TextForm.jsx
import React, { useState } from 'react';

const TextForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text); // send text to parent or handler
    setText(''); // reset input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="textInput">Enter text:</label>
      <input
        id="textInput"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TextForm;
