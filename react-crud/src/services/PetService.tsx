import axios from "./axios"

const findPetByStatus = (petStatus = "available") => {
    return axios.get(`/pet/findByStatus?status=${petStatus}`);
}

export const PetService = {
    findPetByStatus
}