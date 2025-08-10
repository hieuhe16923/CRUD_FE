import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import OrderForm from './Pages/PlaceOrder/Placeorder.tsx';
import Navbar from './Components/Navbar/index.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place-order" element={<OrderForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
