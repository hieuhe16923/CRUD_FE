// pages/UpdatePetPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import PetForm from '../Components/PetForm';
import { Pet } from '../types';
import { petService } from '../services/petService';
import Toast from '../Components/Toast'; // Import Toast component

const UpdatePetPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>(); // Lấy petId từ tham số URL
  const [petToUpdate, setPetToUpdate] = useState<Pet | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchPetData = async () => {
      if (!petId) {
        setError('Không có ID thú cưng để cập nhật.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const idAsNumber = parseInt(petId, 10);
        if (isNaN(idAsNumber)) {
          throw new Error('ID thú cưng không hợp lệ.');
        }
        const data = await petService.getPetById(idAsNumber);
        setPetToUpdate(data);
      } catch (err: any) {
        console.error('Failed to fetch pet data:', err);
        setError(
          `Không thể tải dữ liệu thú cưng: ${
            err.message || 'Lỗi không xác định'
          }`
        );
        setToast({
          message: `Error loading pet data: ${
            err.message || 'Please try again.'
          }`,
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetData();
  }, [petId]); // Sẽ fetch lại dữ liệu nếu petId từ URL thay đổi

  const handleSuccess = () => {
    console.log('Pet updated successfully! Navigating to pet list.');
    setToast({ message: 'Pet updated successfully!', type: 'success' }); // Ensure toast message is shown
    // Navigate to the pet list page after a short delay for the toast to be seen
    setTimeout(() => {
      navigate('/pets'); // Navigate to the pet list page
    }, 1500); // Delay for 1.5 seconds to allow user to see the toast
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <svg
          className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Đang tải thông tin thú cưng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600">
        <p>{error}</p>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {petToUpdate ? (
        <PetForm
          formType="update"
          initialPetData={petToUpdate}
          onSuccess={handleSuccess}
        />
      ) : (
        <div className="text-gray-700">
          Không tìm thấy thú cưng để cập nhật hoặc ID không hợp lệ.
        </div>
      )}
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

export default UpdatePetPage;
