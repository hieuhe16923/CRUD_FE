// components/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600 text-2xl font-bold">🐾 PetStore</div>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
            >
              Trang chủ
            </Link>
            <Link
              to="/pets" // Link to the pet list page
              className={`font-medium transition duration-150 ease-in-out ${
                isActive('/pets')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Danh sách thú cưng
            </Link>
            <Link
              to="/add-pet"
              className={`font-medium transition duration-150 ease-in-out ${
                isActive('/add-pet')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Thêm thú cưng
            </Link>
            {/* You might remove or modify this link in a real app, as update is usually from list */}
            <Link
              to="/update-pet/12345"
              className={`font-medium transition duration-150 ease-in-out ${
                isActive('/update-pet')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cập nhật thú cưng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
