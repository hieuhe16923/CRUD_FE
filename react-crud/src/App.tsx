import React from 'react';
import PetList from './pages/PetList/PetList';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import Banner from './components/Banner/Banner';

function App() {

    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <Banner brand='Pet Shop'
                    title="The friendly and caring small pet store"
                    subtitle='At et vehicula sodales est proin turpis pellentesque sinulla a aliquam amet rhoncus quisque eget sit'
                    imageUrl="https://cdn.britannica.com/85/235885-050-C8CC6D8B/Samoyed-dog-standing-snow.jpg"
                />
                <PetList />
            </div>
        </BrowserRouter>
    );
}

export default App;
