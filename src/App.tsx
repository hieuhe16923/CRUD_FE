// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Link import as buttons are removed
import Navbar from './Components/Navbar';
import AddPetPage from './Pages/AddPetPage';
import UpdatePetPage from './Pages/UpdatePetPage';
import PetListPage from './Pages/PetListPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        {/* Navbar will always be visible */}
        <Navbar />
        <main>
          <Routes>
            <Route path="/add-pet" element={<AddPetPage />} />
            <Route path="/update-pet/:petId" element={<UpdatePetPage />} />
            <Route path="/pets" element={<PetListPage />} />
            <Route path="/" element={<PetListPage />} />{' '}
            {/* Default route to pet list */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
