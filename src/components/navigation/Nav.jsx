import React from 'react';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-gray-800 px-14 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full animate-spin">
              <NavLink to="/" className="text-white text-xl font-bold absolute inset-0 flex items-center justify-center">M</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <NavLink
          to="/favorite"
          className="text-white flex items-center gap-2 hover:text-gray-400 transition-colors"
        >
          <HeartOutlined className="text-xl" />
          <span>Favorites</span>
        </NavLink>
        <NavLink
          to="/cart"
          className="text-white flex items-center gap-2 hover:text-gray-400 transition-colors"
        >
          <ShoppingCartOutlined className="text-xl" />
          <span>Cart</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;