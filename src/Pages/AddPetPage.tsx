/* eslint-disable import/no-duplicates */
// pages/AddPetPage.tsx hiển thị form thêm mới pet
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../Components/PetForm';
import Toast from '../Components/Toast'; // Import Toast component
import { useState } from 'react';

const AddPetPage: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSuccess = () => {
    setToast({ message: 'Pet added successfully!', type: 'success' });
    setTimeout(() => {
      navigate('/pets');
    }, 1500); // Wait for the toast to be seen
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <PetForm formType="add" onSuccess={handleSuccess} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AddPetPage;
