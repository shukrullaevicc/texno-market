import { AiFillHeart, AiFillEye, AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Container from '../../components/container/Container';
import { Loading } from '../../utils';

import { useGetProductsQuery } from '../../redux/api/productsApi';
import { addToFavorite } from '../../redux/slices/favoriteSlice';
import { addToCart } from '../../redux/slices/cartSlice';

import { Card, Carousel, Button } from "antd";

const { Meta } = Card;

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { data, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (data && data.payload) {
      setProducts(data.payload);
    }
  }, [data]);

  return (
    <>
      <div className='mt-14 flex flex-col gap-12'>
        <Container>
          <h1 className="text-3xl font-semibold text-center">All Products</h1>
          <div className="mt-14">
            {isLoading ? (<Loading />) : (
              <div className="max-w-[1400px] mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products && products.map((product) => (
                  <Card key={product._id} style={{width: 300}}
                    cover={
                      <Carousel arrows autoplay dots={false} fadeSpeed={1000} style={{ height: "300px" }}>
                        {product.product_images.map((image) => (<img key={image} alt="example" src={image} />))}
                      </Carousel>
                    }
                  >
                    <div>
                      <h1 className="text-[17px] text-gray-900 font-bold">{product.product_name}</h1>
                      <p className="text-[14px] text-gray-500">{product.product_type}</p>
                      <strong className="text-blue-500 text-[20px]">${product.sale_price}</strong>
                      <p className="text-red-500 text-[16px] line-through">${product.original_price}</p>
                    </div>
                    <div className="mt-4">
                      {product.likes > 0 ? (<p className="text-[14px] text-gray-500">{product.likes} likes</p>) : null}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button 
                        className="text-[15px] p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:bg-red-700 active:bg-red-800 transition-all duration-300"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to cart
                      </button>
                      <Button 
                        type="text"
                        style={{border: "none", boxShadow: "none", backgroundColor: "gray-200", fontSize: "20px", color: "red", padding: "20px 10px", cursor: "pointer"}}
                        onClick={() => dispatch(addToFavorite(product))}
                        className=" bg-slate-200 rounded-lg"
                      >
                        {product.likedby ? (<AiFillHeart />) : (<AiOutlineHeart />)}
                      </Button>
                      <button className="text-[25px] p-2 text-gray-600 bg-slate-200 rounded-lg">
                        <Link to={`/product/${product._id}`}><AiFillEye /></Link>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}

export default Home