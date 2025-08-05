import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from '../../redux/api/api';
import Loading from '../../Components/Loading';
import ErrorPage from '../../Components/Errors';
import PaginationComponent from '../../Components/Pagination';
import { RootState, AppDispatch } from '../../redux/store';
import BreedItem from './../../Components/Breeds/BreedItem';

const BreedsApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breeds = useSelector((state: RootState) => state.breeds.breeds);
  const status = useSelector((state: RootState) => state.breeds.status);
  const meta = useSelector((state: RootState) => state.breeds.meta);
  const error = useSelector((state: RootState) => state.breeds.error);

  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = sessionStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage) : 1;
  });

  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    console.log('Dispatching fetchBreeds at page:', currentPage);
    dispatch(fetchBreeds({ page: currentPage }));
  }, [dispatch, currentPage]);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <ErrorPage message={error} />;

  return (
    <div className="w-full mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Dog Breeds</h2>
      {status === 'succeeded' && Array.isArray(breeds) && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {breeds.map(breed => (
            <BreedItem
              key={breed.id}
              name={breed.attributes.name}
              description={breed.attributes.description}
              life={breed.attributes.life}
              male_weight={breed.attributes.male_weight}
              female_weight={breed.attributes.female_weight}
            />
          ))}
        </ul>
      )}
      {meta?.pagination && (
        <PaginationComponent
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BreedsApp;
