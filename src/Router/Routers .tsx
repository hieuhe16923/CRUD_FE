import { Routes, Route, Navigate } from "react-router-dom";
import LookUpPetId from "../Pages/LookUpPetId";
import MainLayout from "../Layout/MainLayout";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lookup-pet-id" />} />
      <Route
        path="/lookup-pet-id"
        element={
          <MainLayout>
            <LookUpPetId />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default Routers;
