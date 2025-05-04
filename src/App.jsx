import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import useUserStore from "./components/store";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/Sign-in");
    }
    console.log(token);
  }, [token]);

  return (
    
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="ProductDetailPage/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="Category-Page" element={<CategoryPage />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="Sign-up" element={<SignUp />} />
        <Route path="Sign-in" element={<SignIn />} />
      </Routes>
 
  );
}

export default App;
