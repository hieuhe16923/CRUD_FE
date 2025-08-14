// src/components/Main/Main.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { getPets } from '../../redux/reducers/petReducer';
import { addToCart } from '../../redux/cartSlice';
import PetItem from '../PetItem/PetItem';
import Pagination from '../Pagination/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Main.css';
interface Pet {
  id: number;
  name: string;
  status: string;
  image?: string;
}

const Main: React.FC = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector((state: RootState) => state.pets);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const petsPerPage = 12;

  // Lấy danh sách thú cưng từ Redux
  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  // Chuyển trang có loading
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setPageLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  // Thêm thú cưng vào giỏ hàng
  const handleSelectPet = (pet: Pet) => {
    dispatch(addToCart({
      id: pet.id,
      name: pet.name,
      status: pet.status,
      image: pet.image,
    }));

    toast.success(`🎉 Đã thêm "${pet.name}" vào giỏ hàng!`, {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Phân trang
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="main-container">
      <h2>🐾 Danh sách thú cưng</h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      {pageLoading ? (
        <p className="page-loading">Đang tải trang...</p>
      ) : (
        <div className="pet-grid">
          {currentPets.map((pet, index) => (
            <PetItem
              key={`${pet.id}-${index}`}
              pet={pet}
              onSelect={() => handleSelectPet(pet)}
            />
          ))}
        </div>
      )}

      <Pagination
        totalItems={pets.length}
        itemsPerPage={petsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Main;
