import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const groupedCart = updatedCart.reduce((accumulator, current) => {
      const itemInAccumulator = accumulator.find(
        (item) => item._id === current._id
      );

      if (itemInAccumulator) {
        itemInAccumulator.quantity += current.quantity;
      } else {
        accumulator.push(current);
      }

      return accumulator;
    }, []);

    setCart(groupedCart);
    localStorage.setItem("cart", JSON.stringify(groupedCart));
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-3">
                    <img
                      src={`https://ecommerce-website-kbm8.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height="130px"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4>{p.name}</h4>
                        <h6>{p.description.substring(0, 30)}</h6>
                        <h6>Price : ${p.price}</h6>
                      </div>
                      <div className="d-flex align-items-center">
                      <h6 className="me-3 mb-0">Quantity: {p.quantity || 1}</h6>
                        <button
                          className="btn btn-outline-secondary ml-1 me-2"
                          onClick={() => updateQuantity(p._id, p.quantity - 1)}
                          disabled={p.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() =>
                            updateQuantity(p._id, (p.quantity || 1) + 1)
                          }
                        >
                          +
                        </button>
                        <div className="cart-remove-btn">
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => removeCartItem(p._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                    <button
                      className="btn btn-success ms-3 button-outline"
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
