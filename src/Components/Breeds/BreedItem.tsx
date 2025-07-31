import React from 'react';

interface BreedItemProps {
  name: string;
  description: string;
  life?: {
    max: number;
    min: number;
  };
  male_weight?: {
    min: number;
    max: number;
  };
  female_weight?: {
    min: number;
    max: number;
  };
}

const BreedItem: React.FC<BreedItemProps> = ({
  name,
  description,
  life,
  male_weight,
  female_weight,
}) => {
  return (
    <li className="w-full max-w-3xl h-full p-4 border rounded-md shadow-md">
      <p className="font-semibold text-xl">{name}</p>
      <p className="text-md text-gray-600">{description}</p>
      {life && (
        <p className="text-md text-gray-600">
          Life: {life.min} - {life.max} years
        </p>
      )}
      <p className="text-md text-gray-600">
        Male weight: {male_weight.min} - {male_weight.max} kg
      </p>
      <p className="text-md text-gray-600">
        Female weight: {female_weight.min} - {female_weight.max} kg
      </p>
    </li>
  );
};

export default BreedItem;
