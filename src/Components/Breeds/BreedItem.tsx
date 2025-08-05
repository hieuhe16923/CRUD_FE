import React from 'react';
import { BreedItemProps } from '../../Types/Breeds';

const BreedItem: React.FC<BreedItemProps> = ({
  name,
  description,
  life,
  male_weight,
  female_weight,
}) => {
  return (
    <li className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6 space-y-4">
        {/* Header with name */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-emerald-700 transition-colors duration-200">
            {name}
          </h3>
          <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
          {description}
        </p>

        {/* Stats grid */}
        <div className="space-y-3 pt-2">
          {life && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-semibold">🕐</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Lifespan
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {life.min} - {life.max} years
                </p>
              </div>
            </div>
          )}

          {male_weight && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-xs font-semibold">♂</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Male Weight
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {male_weight.min} - {male_weight.max} kg
                </p>
              </div>
            </div>
          )}

          {female_weight && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600 text-xs font-semibold">♀</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Female Weight
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {female_weight.min} - {female_weight.max} kg
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </li>
  );
};

export default BreedItem;
