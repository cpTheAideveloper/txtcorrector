'use client';

import { useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import Modal from '@/components/ui/Modal';
import Loading from '@/components/ui/Loading';
import { Correction } from '@/types';

export default function HomePage() {
  const [correction, setCorrection] = useState<Correction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (texto: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/corregir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto }),
      });

      if (!response.ok) {
        throw new Error('Error obtaining the correction.');
      }

      const data: Correction = await response.json();
      setCorrection(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert('There was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCorrection(null);
  };

  return (
    <div className="relative">
      <TextInput onSubmit={handleSubmit} />
      {isLoading && <Loading />}
      <Modal isOpen={isModalOpen} onClose={closeModal} correction={correction} />
    </div>
  );
}