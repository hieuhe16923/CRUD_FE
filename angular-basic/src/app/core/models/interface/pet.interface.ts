import { PET_STATUS } from "../../enum/pet.enum";
import { CategoryType } from "./category.interface";
import { TagType } from "./type.interface";



export interface PetType {
    id: number;
    category: CategoryType;
    name: string;
    photoUrls: string[];
    tags: TagType[];
    status: PET_STATUS
}
