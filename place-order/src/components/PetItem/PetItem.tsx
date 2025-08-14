import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducer';
interface Pet {
  id: number;
  name: string;
  status: string;
  image?: string;
  category?: {
    id: number;
    name: string;
  };
}

interface PetItemProps {
  pet: Pet;
  onSelect: () => void;
}

const PetItem: React.FC<PetItemProps> = ({ pet, onSelect }) => {
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/616/616408.png'; // ảnh dấu chân thú cưng

  const imageUrl = pet.image || defaultImage;

  return (
    <div className="pet-item">
      <div className="pet-image-wrapper">
        <img
          src={imageUrl}
          alt={pet.name}
          className="pet-image"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <h3>{pet.name}</h3>
      <p>ID: {pet.id}</p>
      <p>category: {pet.category?.name?? 'Không xác định'}</p>
      <p>Trạng thái: {pet.status}</p>

      <p>Giá bán: <strong>Liên hệ</strong></p>
      <button onClick={onSelect}>🛒 Thêm vào giỏ</button>
    </div>
  );
};

export default PetItem;
