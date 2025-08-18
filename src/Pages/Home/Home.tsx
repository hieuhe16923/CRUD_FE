import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyPet, fetchPets } from '../../redux/slices/petsSlice';
import { addToCart } from '../../redux/slices/ordersSlice';
import PaginationComponent from './../../Components/Pagination';
import BreedItem from './../../Components/Breeds/BreedItem';
import Loading from '../../Components/Loading';
import ErrorPage from '../../Components/Errors';

const Home = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state: any) => state.pets);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(fetchPets() as any); // ✅ dùng thunk, không gọi PetService trực tiếp
  }, [dispatch]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = list.slice(indexOfFirstRecord, indexOfLastRecord);

  const meta = {
    pagination: {
      records: list.length,
      recordsPerPage,
    },
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Pet Store</h1>

      {currentRecords.length === 0 ? (
        <div className="text-center text-gray-600 py-8">No pets available</div>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentRecords.map((pet, index) => (
              <div key={`${pet.id || 'noid'}-${indexOfFirstRecord + index}`}>
                <BreedItem
                  name={pet.name || 'Unnamed'}
                  description={pet.category?.name || 'No description available'}
                  life={pet.life || null}
                  male_weight={pet.male_weight || null}
                  female_weight={pet.female_weight || null}
                  onBuy={() => {
                    dispatch(buyPet(pet));
                    dispatch(addToCart(pet));
                  }}
                />
              </div>
            ))}
          </ul>

          <PaginationComponent
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
