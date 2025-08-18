import axios from 'axios';
import { Pet } from '../dto/pets.dto';

const api = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
});

export const PetService = {
  async fetchPets(): Promise<Pet[]> {
    const res = await api.get<Pet[]>('/pet/findByStatus?status=available');
    return res.data;
  },
};
