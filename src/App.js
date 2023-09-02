
import "./App.css";
import Cart from "./components/Buyer/Cart/Cart";
import HomePage from "./pages/Buyer/Homepage/HomePage";
import LandingPage from "./pages/Seller/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sell" element={<LandingPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
