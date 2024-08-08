import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import Starter from "./views/Starter";
import Order from "./views/ui/Order";
import Process from "./views/ui/Process";
import Submit from "./views/ui/Submit";
import Done from "./views/ui/Done";
import Apply from "./views/ui/Apply";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FormUpdate from "./views/ui/Gyomade/Product/components/FormUpdate";
import ProductVariants from "./views/ui/Gyomade/Product/components/ProductVariants";
import Media from "./views/ui/Gyomade/Media";
import Product from "./views/ui/Gyomade/Product";
import Blog from "./views/ui/Gyomade/Blog";
import Listblog from "./views/ui/Gyomade/Blog/list";
import Categories from "./views/ui/Gyomade/Blog/categories";
import EditBlog from "./views/ui/Gyomade/Blog/edit";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FullLayout />}>
            <Route path="/" element={<Starter />} />
            <Route path="dashboard" element={<Starter />} />
            <Route path="product" element={<Product />} />
            <Route path="media" element={<Media />} />
            <Route path="form/:id" element={<FormUpdate />} />
            <Route path="variants/:slug" element={<ProductVariants />} />
            <Route path="blog/add" element={<Blog />} />
            <Route path="blog/list" element={<Listblog />} />
            <Route path="blog/categories" element={<Categories />} />
            <Route path="blog/edit/:id" element={<EditBlog />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
