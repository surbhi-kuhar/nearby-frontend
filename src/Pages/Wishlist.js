import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../FixedUrl";
import { FaTrash, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./styles/Wishlist.css";

const Wishlist = () => {
  const [wishlistItems, setwishlistItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(
        `${server}/user/wishlistItems/${userId}`
      );
      console.log(data);
      if (data.success) {
        setwishlistItems(data.wishlistItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovetoCart = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const productId = id;
    console.log(userId, productId);

    try {
      const { data } = await axios.post(
        `${server}/user/wishlistToCart/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setwishlistItems((prevWishlist) =>
          prevWishlist.filter((product) => product.productId.id !== productId)
        );

        fetchItems();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItemFromWishlist = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    console.log(id);
    const productId = id;
    console.log(userId, productId);

    try {
      const { data } = await axios.delete(
        `${server}/user/removefromwishlist/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setwishlistItems((prevwishlist) =>
          prevwishlist.filter((product) => product.productId.id !== productId)
        );

        fetchItems();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <div className="wishlist-page">
        {wishlistItems.map((product) => (
          <div key={product.productId._id} className="wishlist-item">
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

              <div className="footer-div">
                <div>
                  <button
                    className="cart-btn"
                    onClick={() => handleMovetoCart(product.productId._id)}
                  >
                    Move To Cart &nbsp;
                    <FaShoppingCart />
                  </button>
                </div>

                <div>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      deleteItemFromWishlist(product.productId._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
