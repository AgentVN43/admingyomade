import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function ProductVariants() {
  const [productVariants, setProductVariants] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    fetchProductVariants();
  }, [slug]);

  const fetchProductVariants = async () => {
    try {
      const response = await fetch(
        `https://gyomade.vn/mvc/products/variants/${slug}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const variants = await response.json();
      setProductVariants(variants);
    } catch (error) {
      console.error("Error fetching product variants:", error);
    }
  };

  console.log(productVariants);

  return (
    <>
      <h1>Product Details</h1>

      <ProductCard product={productVariants} />
    </>
  );
}
