import type { Pet } from "../Types/pet";

import defaultImgPet from "../assets/cat.png";
import { Tag } from "./Tag";
interface PetCardProps {
  petData: Pet | null;
}
const PetInfo: React.FC<PetCardProps> = ({ petData }) => {
  if (!petData) {
    return <div>Không có dữ liệu pet.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Main info section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pet image */}
        <div className="md:col-span-1">
          {petData.photoUrls.length > 0 ? (
            <img
              src={petData.photoUrls[0]}
              alt={petData.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <figure>
                <img
                  src={defaultImgPet}
                  className="w-full h-full object-cover"
                  alt={petData.name}
                />
              </figure>
            </div>
          )}
        </div>

        {/* Pet details */}
        <div className="md:col-span-2">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{petData.name}</h2>
              <p className="text-gray-600">ID: {petData.id}</p>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  petData.status === "available"
                    ? "bg-green-100 text-green-800"
                    : petData.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {petData.status}
              </span>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Category</h3>
              <p>{petData.category?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tags section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {petData.tags.length > 0 ? (
            petData.tags.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.name} />
            ))
          ) : (
            <p className="text-gray-500">No tags</p>
          )}
        </div>
      </div>

      {/* Additional photos */}
      {petData.photoUrls.length > 1 && (
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Additional Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {petData.photoUrls.slice(1).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${petData.name} ${index + 2}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetInfo;
