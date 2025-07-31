import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from '../../redux/api/api';
import Loading from '../../Components/Loading';
import ErrorPage from '../../Components/Errors';
import PaginationComponent from '../Pagination';
import { RootState, AppDispatch } from '../../redux/store';
import BreedItem from './BreedItem';

const BreedsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const breeds = useSelector((state: RootState) => state.breeds.breeds);
  const status = useSelector((state: RootState) => state.breeds.status);
  const meta = useSelector((state: RootState) => state.breeds.meta);

  useEffect(() => {
    dispatch(fetchBreeds({ page: currentPage }));
  }, [dispatch, currentPage]);

  console.log(breeds);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <ErrorPage />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Dog Breeds</h2>
      {status === 'succeeded' && Array.isArray(breeds) && (
        <ul className="flex flex-col items-center gap-5">
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

export default BreedsList;
