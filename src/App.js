import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import Starter from "./views/Starter";
import Blog from "./views/ui/Gyomade/Blog";
import Categories from "./views/ui/Gyomade/Blog/categories";
import EditBlog from "./views/ui/Gyomade/Blog/edit";
import Listblog from "./views/ui/Gyomade/Blog/list";
import Media2 from "./views/ui/Gyomade/Media2";
import Product from "./views/ui/Gyomade/Product";
import FormUpdate from "./views/ui/Gyomade/Product/components/FormUpdate";
import ProductVariants from "./views/ui/Gyomade/Product/components/ProductVariants";
import ImageEditor from "./views/ui/Gyomade/Media2";
import { Media } from "reactstrap";
import Upload from "./views/ui/Gyomade/Upload";
import UploadImgs from "./views/ui/Gyomade/Upload";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FullLayout />}>
            <Route path="/" element={<Starter />} />
            <Route path="dashboard" element={<Starter />} />
            <Route path="product" element={<Product />} />
            <Route path="media" element={<Media2 />} />
            <Route path="upload" element={<UploadImgs />} />
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
