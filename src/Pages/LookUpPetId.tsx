import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import petImg from "../assets/cat.png";
import { getPetById } from "../services/petService"; // Assuming you have an API function to fetch pet data
import type { Pet } from "../Types/pet";
import PetInfo from "../Component/PetInfo";
import CircularProgress from "@mui/material/CircularProgress";
function App() {
  const [petId, setPetId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState<Pet | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setPetId(petId);
    setSearched(true);
    try {
      const petData = await getPetById(petId);
      setPet(petData);
    } catch (error) {
      console.error("Error fetching pet:", error);
      setPet(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col bg-[#fafafb] pt-8 px-8">
      {/* Heading */}
      <div className="w-full mb-[30px]">
        <h1 className="text-3xl font-bold text-[#171A1FFF] mb-[18px]">
          Pet ID Lookup
        </h1>
        <p className="text-[18px] text-[#565D6DFF]">
          Quickly find pet details by entering their unique identification
          number.
        </p>
      </div>

      {/* Search Card */}
      <div className="w-full bg-white rounded-md shadow p-6 mb-6">
        <h2 className="text-[#171A1FFF] text-[20px] font-semibold mb-1">
          Enter Pet ID
        </h2>
        <p className="text-[14px] text-[#565D6DFF]">
          Provide the numeric ID to retrieve pet information.
        </p>
        <div className=" flex flex-col lg:flex-row mt-4 gap-4">
          <TextField
            label="Pet ID"
            fullWidth
            variant="outlined"
            type="Number"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            placeholder="e.g., 1001"
          />
          <Button
            disabled={!petId.trim()}
            loading={loading}
            onClick={handleSearch}
            variant="contained"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div>
      </div>

      <div className="w-full bg-white rounded-md shadow p-6 flex flex-col gap-4 items-center">
        {loading ? (
          <>
            <CircularProgress />
            <span className="mt-4 text-gray-500">Đang tìm kiếm...</span>
          </>
        ) : pet ? (
          <PetInfo petData={pet} />
        ) : (
          <>
            <figure className="size-[192px]">
              <img src={petImg} alt="Search Pet" className="w-full h-full" />
            </figure>
            <h3 className="text-lg font-semibold text-[24px] text-[#171A1FFF]">
              Search for a Pet
            </h3>
            {searched && !loading && !pet ? (
              <p className="text-[#565D6DFF] text-[16px] font-normal text-center">
                No pet found with the provided ID
              </p>
            ) : (
              <p className="text-[#565D6DFF] text-[16px] font-normal text-center">
                Enter a pet ID above to view detailed information.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
