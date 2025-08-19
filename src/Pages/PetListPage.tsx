/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
// pages/PetListPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { petService } from '../services/petService';
import { Pet } from '../types';
import Toast from '../Components/Toast';

const PetListPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Local state for search term
  const navigate = useNavigate();

  const fetchPets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch available, pending, and sold pets to get a comprehensive list
      const availablePets = await petService.findPetsByStatus('available');
      const pendingPets = await petService.findPetsByStatus('pending');
      const soldPets = await petService.findPetsByStatus('sold');

      // Combine and filter out duplicates if any (though unlikely with unique IDs)
      const allPets = [...availablePets, ...pendingPets, ...soldPets];
      const uniquePets = Array.from(
        new Map(allPets.map(pet => [pet.id, pet])).values()
      );

      // 💡 THÊM ĐOẠN CODE NÀY VÀO ĐÂY 💡
      // Sắp xếp danh sách thú cưng theo ID giảm dần để pet mới nhất luôn ở đầu.
      // Sử dụng `|| 0` để đảm bảo không bị lỗi nếu pet không có ID.
      const sortedPets = uniquePets.sort((a, b) => (b.id || 0) - (a.id || 0));

      setPets(sortedPets);
    } catch (err: any) {
      console.error('Failed to fetch pets:', err);
      setError(
        `Không thể tải danh sách thú cưng: ${
          err.message || 'Lỗi không xác định'
        }`
      );
      setToast({
        message: `Lỗi tải danh sách: ${err.message || 'Vui lòng thử lại.'}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleDeletePet = async (petId: number | undefined) => {
    if (typeof petId === 'undefined') {
      setToast({
        message: 'Không tìm thấy ID thú cưng để xóa.',
        type: 'error',
      });
      return;
    }

    // Confirmation dialog (using a simple browser confirm for now, but ideally a custom modal)
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa thú cưng có ID: ${petId} không?`
      )
    ) {
      return;
    }

    setIsLoading(true); // Show loading while deleting
    try {
      await petService.deletePet(petId);
      setToast({
        message: `Đã xóa thú cưng ID: ${petId} thành công!`,
        type: 'success',
      });
      fetchPets(); // Refresh the list after deletion
    } catch (err: any) {
      console.error('Failed to delete pet:', err);
      setToast({
        message: `Lỗi xóa thú cưng: ${err.message || 'Vui lòng thử lại.'}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter pets based on search term (case-insensitive, checks name and category name)
  const filteredPets = pets.filter(pet => {
    const searchLower = searchTerm.toLowerCase();

    // Kiểm tra pet.name có tồn tại trước khi gọi toLowerCase()
    const petName = pet.name ? pet.name.toLowerCase() : '';
    const nameMatch = petName.includes(searchLower);

    // Kiểm tra pet.category và pet.category.name có tồn tại trước khi gọi toLowerCase()
    const categoryNameMatch = pet.category?.name
      ? pet.category.name.toLowerCase().includes(searchLower)
      : false;

    return nameMatch || categoryNameMatch;
  });

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
        Đang tải danh sách thú cưng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Danh sách thú cưng
        </h1>

        {/* Search Input for Pet List */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm thú cưng theo tên hoặc danh mục..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPets.length === 0 ? (
          <p className="text-center text-gray-600">
            Không tìm thấy thú cưng nào phù hợp.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Danh mục
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPets.map(pet => (
                  <tr key={pet.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pet.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {pet.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {pet.category?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                      {pet.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/update-pet/${pet.id}`}
                          className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
                        >
                          Chỉnh sửa
                        </Link>
                        <button
                          onClick={() => handleDeletePet(pet.id)}
                          className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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

export default PetListPage;
