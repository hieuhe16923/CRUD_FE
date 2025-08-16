import type { Pet } from "../Types/pet";

import defaultImgPet from "../assets/cat.png";
import { Tag } from "./Tag";
interface PetCardProps {
  petData: Pet | null;
}
const PetInfo: React.FC<PetCardProps> = ({ petData }) => {
  if (!petData) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header section with name and status */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{petData.name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            petData.status === "available"
              ? "bg-green-100 text-green-800"
              : petData.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {petData.status.toUpperCase()}
        </span>
      </div>

      {/* ID - less prominent */}
      <p className="text-gray-500 text-sm mb-6">ID: {petData.id}</p>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pet image - larger and centered */}
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <figure className="max-w-xs">
              <img
                src={
                  petData.photoUrls.length > 0 &&
                  petData.photoUrls[0] !== "string"
                    ? petData.photoUrls[0]
                    : defaultImgPet
                }
                alt={petData.name}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        </div>

        {/* Details section */}
        <div className="md:col-span-2 space-y-4">
          {/* Category */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500 mb-1">Category</h3>
            <p className="text-lg">{petData.category?.name || "Unknown"}</p>
          </div>

          {/* Tags */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {petData.tags.length > 0 ? (
                petData.tags.map((tag) => (
                  <Tag key={tag.id} id={tag.id} name={tag.name} />
                ))
              ) : (
                <p className="text-gray-400">No tags available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional photos only if exist */}
      {petData.photoUrls.length > 1 && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {petData.photoUrls.slice(1).map((url, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={url}
                  alt={`${petData.name} photo ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetInfo;
