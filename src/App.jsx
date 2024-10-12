import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Head from "./components/head/Head.jsx";
import ProductForm from "./components/productForm/ProductForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Head" />}></Route>
        <Route path="Head/" element={<Head />}></Route>
        <Route
          path="ProductForm/"
          element={<ProductForm isCreate={true} />}
        ></Route>
        <Route
          path="ProductForm/:id"
          element={<ProductForm isCreate={false} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
