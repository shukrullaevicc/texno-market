import './Nav.css';

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import Container from "../container/Container";

import { useGetProfileQuery } from "../../redux/api/userApi";

const Nav = () => {
  const cartLength = useSelector((state) => state.cart.cart);
  const [hasShadow, setHasShadow] = useState(false);
  const [isUzbek, setIsUzbek] = useState(false);
  const [favouriteLength, setFavouriteLength] = useState(0);
  const { data } = useGetProfileQuery();

  useEffect(() => {
    if (data && data.payload) {
      setFavouriteLength(data.payload.liked);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

   const toggleLanguage = () => {
    setIsUzbek((prev) => !prev);
  };

  return (
    <nav className={`bg-white py-4 sticky top-0 z-50 transition-shadow duration-300 ${hasShadow ? "shadow-md" : ""}`}>
      <Container>
        <div className="flex justify-between items-center w-full">

          <div className="flex items-center">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-yellow-400 rounded-full animate-spin">
                  <NavLink to="/" className="text-white text-xl font-bold absolute inset-0 flex items-center justify-center">M</NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-yellow-400 rounded-lg border-2 overflow-hidden border-yellow-400">
            <input type="text" placeholder="Search products" className="px-4 py-2 w-96 border-none outline-none"/>
            <button className="px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19a8 8 0 100-16 8 8 0 000 16zm6.83-3.41l3.58 3.58"/>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-6">
            
            <NavLink to="/cart" className="text-black flex items-center gap-2 hover:text-gray-400 transition-colors relative">
              <div className="relative">
                <ShoppingCartOutlined className="text-xl" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartLength.length ? <p>{cartLength.length}</p> : "0"}
                </div>
              </div>
              <span>Cart</span>
            </NavLink>

            <NavLink to="/favorite" className="text-black flex items-center gap-2 hover:text-gray-400 transition-colors relative">
              <div className="relative">
                <HeartOutlined className="text-xl" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {favouriteLength.length ? <p>{favouriteLength.length}</p> : "0"}
                </div>
              </div>
              <span>Favorite</span>
            </NavLink>

            <button className="border border-yellow-400 px-3 py-1 rounded text-black hover:bg-yellow-400 hover:text-white transition">
              <NavLink to="/auth">Login</NavLink>
            </button>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isUzbek} onChange={toggleLanguage} className="sr-only"/>
                <div className={`w-16 h-8 rounded-full ${isUzbek ? "bg-yellow-400" : "bg-gray-400"} transition duration-300 flex items-center`}>
                  <div className={`w-8 h-8 bg-white rounded-full transition-transform duration-300 ${isUzbek ? "translate-x-8" : "translate-x-0"} flex items-center justify-center`}>
                    <span className={`text-xs font-semibold ${isUzbek ? "text-black" : "text-black"}`}>
                      {isUzbek ? "РУС" : "UZB"}
                    </span>
                  </div>
                </div>
              </label>
            </div>

          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;