import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import TodoList from './Pages/Todolist';
import WatchStop from './Pages/stopwatch';
import Home from './Pages/Home/Home';
import BreedsApp from './Pages/Breedlist/Breed.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/watchstop" element={<WatchStop />} />
        <Route path="/breed" element={<BreedsApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
