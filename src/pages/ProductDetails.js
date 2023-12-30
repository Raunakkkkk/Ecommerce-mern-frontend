import React, { useEffect, useState } from "react";
import Layout from "./../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import'../styles/ProductDetailsStyles.css'
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  //get product
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart,setCart]=useCart();
  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-website-kbm8.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const isItemInCart = cart.find((item) => item._id === product._id);

    if (isItemInCart) {
      toast.error("Item is already in the cart");
    } else {
      const newItem = { ...product, quantity: 1 }; // Adding default quantity
      setCart([...cart, newItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
      toast.success("Item Added to Cart");
    }
  };

  return (
    <Layout>
      {/* {JSON.stringify(product,null,4)} */}

      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`https://ecommerce-website-kbm8.onrender.com/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="400"
            // width={"350px"}
          />
</div>

          <div className="col-md-6 product-details-info ">

          <h1 className="text-center">Product Details</h1>
          <hr/>
          <h3>Name : {product.name}</h3>
          <h4>Description : {product.description}</h4>
          <h4>Price : {product.price}</h4>
          <h4>Category : {product?.category?.name}</h4>
          <button class="btn btn-secondary ms-1" 
           onClick={() => {
            addToCart(product)
          }}
          >ADD TO CART</button>
          </div>
        </div>
      
    </Layout>
  );
};

export default ProductDetails;
