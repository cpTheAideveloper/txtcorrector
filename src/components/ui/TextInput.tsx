'use client';

import { useState } from 'react';

interface TextInputProps {
  onSubmit: (texto: string) => void;
}

export default function TextInput({ onSubmit }: TextInputProps) {
  const [texto, setTexto] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(texto);
    }
  };

  return (
    <textarea
      className="w-full h-screen p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Write your text here..."
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}