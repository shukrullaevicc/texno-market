import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { useGetProductsQuery } from '../../redux/api/productsApi';

import Container from '../../components/container/Container';

import { addToFavorite } from '../../redux/slices/favoriteSlice';
import { addToCart } from '../../redux/slices/cartSlice';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data } = useGetProductsQuery();

  useEffect(() => {
    if (data && data.payload) {
      setProducts(data.payload);
    }
  }, [data]);

  return (
    <>
      <div className='mt-14 flex flex-col gap-12 text-center'>
        <Container>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Products</h1>
            <div className="grid grid-cols-4 gap-7 mt-14">
              {products.map((product) => (
                <div className='max-w-xs flex flex-col items-center justify-center gap-2 relative overflow-hidden group' key={product._id}>
                  <div className="relative w-full transition-transform duration-300 transform group-hover:scale-110">
                    <img src={product.product_images[0]} alt="" className="w-full h-72 object-contain" />
                    <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20">
                      <button 
                        onClick={() => dispatch(addToFavorite(product))} 
                        className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300`}>
                        <FaHeart size={20} />
                      </button>
                      <button 
                        onClick={() => dispatch(addToCart(product))} 
                        className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300`}>
                        <AiOutlineShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 px-7">
                    <h3 className="text-lg font-bold text-blue-800">{product.title}</h3>
                    <div className="w-full flex items-center justify-between gap-2">
                      <p className="text-lg font-bold text-blue-400">${product.sale_price}</p>
                      <p className="text-sm font-normal line-through text-gray-500">${product.original_price}</p>
                      <div className="flex items-center justify-center gap-1">
                        <AiOutlineShoppingCart />
                        <p className="text-sm font-normal text-black">{product.number_in_stock}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Home