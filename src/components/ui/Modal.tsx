'use client';

import { Correction } from '@/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  correction: Correction | null;
}

export default function Modal({ isOpen, onClose, correction }: ModalProps) {
  if (!isOpen || !correction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 overflow-auto max-h-full">
        <h2 className="text-2xl mb-4">Corrected Text</h2>
        <div className="mb-6 whitespace-pre-wrap">
          {correction.corrected}
        </div>
        <h3 className="text-xl mb-2">Errors Found:</h3>
        <ul className="list-disc list-inside">
          {correction.errors.map((error, index) => (
            <li key={index}>
              <strong>{error.sentence}</strong>
              <ul className="list-disc list-inside ml-5">
                {error.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}