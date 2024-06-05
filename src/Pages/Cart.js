import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../FixedUrl";
import { FaTrash, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/Cart.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // const user = useSelector((state) => state.userreducer);
  // console.log(user);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${server}/user/cartitems/${userId}`);
      console.log(data);
      if (data.success) {
        setCart(data.cartItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItemFromCart = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    console.log(id);
    const productId = id;
    console.log(userId, productId);

    try {
      const { data } = await axios.delete(
        `${server}/user/removefromcart/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setCart((prevCart) =>
          prevCart.filter((product) => product.productId.id !== productId)
        );

        fetchItems();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMoveFromCartToWishlist = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const productId = id;
    console.log(userId, productId);

    try {
      const { data } = await axios.post(
        `${server}/user/cartToWishlist/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setCart((prevCart) =>
          prevCart.filter((product) => product.productId.id !== productId)
        );

        fetchItems();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderNow = () => {
    navigate("/placeOrder", { state: { cart } });
  };

  return (
    <div className="main-container">
      <div className="cart-page">
        {cart.map((product) => (
          <div key={product.productId._id} className="cart-item">
            <div className="product-image">
              <img
                src="https://assets.shopkund.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acu8056-1-printed-weaving-silk-saree-in-pink-sr23494.jpg"
                alt={product.productId.name}
              />
            </div>
            <div className="product-desc">
              <div>
                <h2>{product.productId.name}</h2>
              </div>
              <div className="eve">
                <p>
                  Rs.
                  {product.productId.discountPrice}{" "}
                  <strike>Rs.{product.productId.actualPrice}</strike>
                </p>
              </div>

              <div className="quantity-button">
                <button className="quantity-btn" onClick={handleDecrease}>
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={handleIncrease}>
                  +
                </button>
              </div>

              <div>
                <button
                  className="wishlist-btn"
                  onClick={() =>
                    handleMoveFromCartToWishlist(product.productId._id)
                  }
                >
                  Wishlist &nbsp;
                  <FaHeart />
                </button>
              </div>
            </div>
            <div className="delete-btn">
              <div>
                <FaTrash
                  onClick={() => deleteItemFromCart(product.productId._id)}
                />
              </div>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <button className="order-now-btn" onClick={handleOrderNow}>
            Order Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
