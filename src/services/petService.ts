import axios from "axios";
import type { Pet } from "../Types/pet";

export const getPetById = async (petId: string | number): Promise<Pet> => {
  const response = await axios.get(
    `https://petstore.swagger.io/v2/pet/${petId}`
  );
  return response.data;
};
