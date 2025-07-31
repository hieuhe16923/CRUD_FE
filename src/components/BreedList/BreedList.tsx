import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "../../features/dogs/breedSlice";
import { AppDispatch, RootState } from "../../store";

const BreedList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { breeds, loading, error } = useSelector(
		(state: RootState) => state.breeds
	);
	const [page, setPage] = React.useState(1);
	console.log(breeds);
	useEffect(() => {
		const fetchData = setTimeout(() => {
			dispatch(fetchBreeds({ page: 29, size: 10 }));
		}, 1000);
	}, [dispatch]);

	if (loading) return <div>Loading breeds...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="p-10">
			<h2 className="mb-4 text-2xl font-bold">Breeds</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
				{breeds.map((breed) => (
					<div
						key={breed.id}
						className="flex flex-col p-4 mb-2 bg-white rounded shadow"
					>
						<div className="mb-5 font-semibold">{breed?.attributes.name}</div>
						{breed?.attributes.description && (
							<div className="mb-5 text-gray-600">
								{breed?.attributes.description}
							</div>
						)}
						<div className="mt-auto ">
							{breed?.attributes.life && (
								<div className="mb-5 text-gray-600">
									<h3>Life:</h3>
									{breed?.attributes.life.min} - {breed?.attributes.life.max}
								</div>
							)}
							{breed?.attributes.female_weight && (
								<div className="mb-5 text-gray-600">
									<h3>Female Weight:</h3>
									{breed?.attributes.female_weight.min} -{" "}
									{breed?.attributes.female_weight.max}
								</div>
							)}
							{breed?.attributes.male_weight && (
								<div className="mb-5 text-gray-600">
									<h3>Male Weight:</h3>
									{breed?.attributes.male_weight.min} -{" "}
									{breed?.attributes.male_weight.max}
								</div>
							)}
							{breed?.attributes.hypoallergenic !== undefined && (
								<div className="text-gray-600 ">
									<h3>Hypoallergenic:</h3>
									{breed?.attributes.hypoallergenic ? "Yes" : "No"}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BreedList;
