/* eslint-disable no-irregular-whitespace */
// pages/UpdatePetPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PetForm from '../Components/PetForm';
import { Pet } from '../types';
import { petService } from '../services/petService';
import Toast from '../Components/Toast';

const UpdatePetPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const [petToUpdate, setPetToUpdate] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      if (!petId || isNaN(Number(petId))) {
        // Handle invalid ID in URL
        setError('ID thú cưng không hợp lệ. Vui lòng kiểm tra lại URL.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await petService.getPetById(Number(petId));
        setPetToUpdate(data);
      } catch (err: any) {
        console.error('Failed to fetch pet data:', err);
        setError(`Không thể tải dữ liệu thú cưng. Vui lòng kiểm tra ID.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetData();
  }, [petId]);

  const handleSuccess = () => {
    // Show success toast and navigate back
    setToast({
      message: 'Đã cập nhật thông tin thú cưng thành công!',
      type: 'success',
    });
    setTimeout(() => {
      navigate('/pets');
    }, 1500); // Allow user to see the success message
  };

  // Render states
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-600">
        <p className="text-lg font-semibold">{error}</p>
        <button
          onClick={() => navigate('/pets')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-150"
        >
                    Quay lại danh sách thú cưng
        </button>
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
        // This block handles cases where petToUpdate is null after loading (e.g., fetch failed)
        // It's a fallback for the error state above, providing a clearer message.
        <div className="text-gray-700">
          Không tìm thấy thú cưng để cập nhật.
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
