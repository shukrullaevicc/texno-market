import { GiHamburgerMenu } from "react-icons/gi"; 
import './Nav.css';
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import NavIMG from "../../images/navigationIMG.jpg";

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import Container from "../container/Container";

import { useGetProfileQuery } from "../../redux/api/userApi";

const Nav = () => {
  const cartLength = useSelector((state) => state.cart.cart);
  const [isUzbek, setIsUzbek] = useState(false);
  const [favouriteLength, setFavouriteLength] = useState(0);
  const { data } = useGetProfileQuery();

  useEffect(() => {
    if (data && data.payload) {
      setFavouriteLength(data.payload.liked);
    }
  }, [data]);

   const toggleLanguage = () => {
    setIsUzbek((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-white py-4">
        <NavLink to="/" >
          <img src={NavIMG} alt="" />
        </NavLink>

        <div className='bg-gray-100'>
          <Container>
            <div className='flex items-center justify-between pt-4 pb-4'>
              <div className='flex gap-1 font-bold'>
                <p className=''>ELEKTRONIKA MAHSULOTLARI </p>
                <span className='text-orange-500'>ZO'R NARXLARDA</span>
              </div>

              <div className="flex gap-5">
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

                <div className="flex items-center justify-center gap-1">
                  <AiOutlineUser />
                  <NavLink to="/auth" className="hover:text-orange-500 transition">Kirish</NavLink>
                  <p>/</p>
                  <NavLink to="/auth/register" className="hover:text-orange-500 transition">Ro'yxatdan o'tish</NavLink>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="flex justify-between items-center w-full mb-4 mt-4">
            <NavLink to="/" className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-center gap-1 text-4xl font-medium">
                <p>ONLINE</p>
                <p className="text-orange-600">SHOP</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-xs font-bold">
                <p>ELEKTRONIKALAR</p>
                <p className="text-orange-600">ZO'R NARXDA</p>
              </div>
            </NavLink>

            <div className="flex items-center bg-orange-400 rounded-lg border-2 overflow-hidden border-orange-400">
              <input type="text" placeholder="Mahsulotlarni qidirish" className="px-4 py-2 w-96 border-none outline-none"/>
              <button className="px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19a8 8 0 100-16 8 8 0 000 16zm6.83-3.41l3.58 3.58"/>
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-6">

              <div className="flex items-center justify-center gap-4 px-5 border-r-2 ">
                <AiOutlinePhone className="text-4xl"/>
                <div>
                  <p>Bizga qo'ng'iroq qilish</p>
                  <p className="font-bold">+998 71 123 45 67</p>
                </div>
              </div>
              
              <NavLink to="/cart" className="text-black flex flex-col items-center hover:text-gray-400 transition-colors relative">
                <div className="relative">
                  <ShoppingCartOutlined className="text-3xl" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartLength.length ? <p>{cartLength.length}</p> : "0"}
                  </div>
                </div>
                <span>Savat</span>
              </NavLink>

              <NavLink to="/favorite" className="text-black flex flex-col items-center justify-center hover:text-gray-400 transition-colors relative">
                <div className="relative">
                  <HeartOutlined className="text-3xl" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {favouriteLength.length ? <p>{favouriteLength.length}</p> : "0"}
                  </div>
                </div>
                <span>Sevimlilar</span>
              </NavLink>
            </div>
          </div>
        </Container>
      </nav>

      <div className="border-t-2 border-b-2 border-gray-200 bg-white sticky top-0 z-50 transition-shadow duration-300">
        <Container>
          <div className="flex items-center justify-start gap-7">
            <div className="flex gap-3 items-center justify-center p-4 border-gray-300 border-x-[1px] text-gray-800 font-bold">
              <GiHamburgerMenu />
              <p>BARCHA KATEGORIYALAR</p>
            </div>

            <ul className="flex gap-4 font-semibold">
              <li className="hover:text-orange-500"><NavLink to="/">Bosh sahifa</NavLink></li>
              <li className="hover:text-orange-500"><NavLink>Bizning manzil</NavLink></li>
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Nav;