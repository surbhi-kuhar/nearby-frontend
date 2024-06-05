import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import shop from "../images/shopimage.jpg";
import "./styles/Home.css";
import HomeMain from "./mainsection/HomeMain";
import BestSelling from "./mainsection/BestSelling";
import Products from "./mainsection/Products";
import Events from "./mainsection/Events";
import Faqs from "./mainsection/Faqs";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Footer from "./Footer";
import axios from "axios";
import { server } from "../FixedUrl";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const handlebecomeseller = async (e) => {
    navigate("/mainsellerpage");
  };
  const handleShopNow = async (e) => {
    navigate("/productPage");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query) {
      try {
        const response = await axios.get(
          `${server}/product/search?searchTerm=${query}`
        );
        console.log(response);
        setSearchResults(response.data.products);
        setShowResults(true);

        console.log(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleDocumentClick = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Fragment>
      <div className="navbar">
        <div className="logo">
          <img src={shop} alt="nearByStore" />
        </div>
        <div className="secondclass">
          <div className="searchbox" ref={searchInputRef}>
            <input
              type="text"
              className="search-input"
              onChange={handleSearchChange}
              value={searchText}
              placeholder="Search..."
            />
            {searchText && (
              <div className="result-container">
                {searchResults.map((result) => (
                  <Link to="/product">
                    <div key={result.id} className="search-result-div">
                      <img
                        src="https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg"
                        className="search-result-image"
                      />
                      {result.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="becomeseller">
            <button className="become-seller-btn" onClick={handlebecomeseller}>
              Become Seller
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <div className="navbar2">
        <div className="allpages">
          <p>All Categories</p>
        </div>
        <div className="allpages">
          <p></p>
        </div>
        <div onClick={(e) => setActive(1)} className="allpages">
          <p>Home</p>
        </div>
        <div onClick={(e) => setActive(2)} className="allpages">
          <p>Best Selling</p>
        </div>
        <div onClick={(e) => setActive(3)} className="allpages">
          <p>Products</p>
        </div>
        <div onClick={(e) => setActive(4)} className="allpages">
          <p>Events</p>
        </div>
        <div onClick={(e) => setActive(5)} className="allpages">
          <p>FAQ</p>
        </div>

        <div className="allpages">
          <Link to="/userprofile">
            <CgProfile />
          </Link>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
          <Link to="/wishlist">
            <FaHeart />
          </Link>
        </div>
        <div className="allpages">
          <Link to="/sign-up">
            <img className="loginimg" src={shop} />
          </Link>
        </div>
        <div className="allpages">
          <Link to="/userprofile">
            <img className="loginimg" src={shop} />
          </Link>
        </div>
      </div>
      {active === 1 && <HomeMain />}
      {active === 2 && <BestSelling />}
      {active === 3 && <Products />}
      {active === 4 && <Events />}
      {active === 5 && <Faqs />}
      <Footer />
    </Fragment>
  );
};
export default Home;
