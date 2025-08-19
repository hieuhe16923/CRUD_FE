/* eslint-disable @typescript-eslint/no-inferrable-types */
// services/petService.ts
import { Pet, Category, Tag } from '../types';

const BASE_URL = 'https://petstore.swagger.io/v2/pet';

// Function to handle API calls with exponential backoff
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  maxRetries: number = 5
): Promise<T> {
  let currentRetry = 0;
  while (currentRetry < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error(`Attempt ${currentRetry + 1} failed:`, error);
      currentRetry++;
      if (currentRetry < maxRetries) {
        const delay = Math.pow(2, currentRetry) * 1000;
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded.');
}

export const petService = {
  /**
   * Adds a new pet to the store.
   * @param petData The pet object to add. ID should typically be omitted.
   * @returns The added pet object from the API.
   */
  addPet: async (petData: Pet): Promise<Pet> => {
    return fetchWithRetry<Pet>(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
  },

  /**
   * Updates an existing pet in the store.
   * @param petData The pet object with updated information. ID is required.
   * @returns The updated pet object from the API.
   */
  updatePet: async (petData: Pet): Promise<Pet> => {
    if (!petData.id) {
      throw new Error('Pet ID is required for updating a pet.');
    }
    return fetchWithRetry<Pet>(BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
  },

  /**
   * Finds pets by status.
   * @param status The status of pets to find ('available' | 'pending' | 'sold').
   * @returns An array of pet objects.
   */
  findPetsByStatus: async (
    status: 'available' | 'pending' | 'sold'
  ): Promise<Pet[]> => {
    return fetchWithRetry<Pet[]>(`${BASE_URL}/findByStatus?status=${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  /**
   * Deletes a pet by ID.
   * @param petId The ID of the pet to delete.
   * @returns A confirmation object.
   */
  deletePet: async (petId: number): Promise<any> => {
    return fetchWithRetry<any>(`${BASE_URL}/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  /**
   * Gets a pet by ID.
   * @param petId The ID of the pet to retrieve.
   * @returns The pet object.
   */
  getPetById: async (petId: number): Promise<Pet> => {
    return fetchWithRetry<Pet>(`${BASE_URL}/${petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  /**
   * Finds pets by tags.
   * @returns A list of Tag objects.
   */
  getTags: async (): Promise<Tag[]> => {
    try {
      const availablePets = await petService.findPetsByStatus('available');
      const allTags: Tag[] = [];
      const uniqueTagIds = new Set<number>();

      availablePets.forEach(pet => {
        if (pet.tags) {
          pet.tags.forEach(tag => {
            if (tag.id && !uniqueTagIds.has(tag.id)) {
              allTags.push(tag);
              uniqueTagIds.add(tag.id);
            }
          });
        }
      });
      return allTags;
    } catch (error) {
      console.error('Failed to fetch unique tags from available pets:', error);
      return [];
    }
  },

  /**
   * Gets a list of categories
   * @returns A list of Category objects.
   */
  getCategories: async (): Promise<Category[]> => {
    // sử dụng categories cố định.
    console.log('Fetching hard-coded categories.');
    const categories: Category[] = [
      { id: 1, name: 'Dogs' },
      { id: 2, name: 'Cats' },
      { id: 3, name: 'Reptiles' },
      { id: 4, name: 'Birds' },
      { id: 5, name: 'Fish' },
    ];
    return categories;
  },
};
