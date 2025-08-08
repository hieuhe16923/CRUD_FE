// pages/AddPetPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PetForm from '../Components/PetForm';

const AddPetPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSuccess = () => {
    // Logic to run after a successful pet addition
    // console.log('Pet added successfully! Navigating to pet list.');
    // Display success message (handled by PetForm's internal Toast)
    // Then, navigate to the pet list page after a short delay for the toast to be seen
    setTimeout(() => {
      navigate('/pets'); // Navigate to the pet list page
    }, 3000); // Delay for 1.5 seconds to allow user to see the toast
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* PetForm is designed to be centered by its own max-width and mx-auto */}
      <PetForm formType="add" onSuccess={handleSuccess} />
    </div>
  );
};

export default AddPetPage;
