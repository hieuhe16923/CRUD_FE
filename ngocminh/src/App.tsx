import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DogBreedsApp from "./page/DogBreedsApp";

function App() {
    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path='/' element={<DogBreedsApp />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;