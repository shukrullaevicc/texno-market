import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Card, Carousel, Button, notification } from "antd";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import { useGetProductsQuery, useLikeProductMutation, useUnLikeProductMutation } from '../../redux/api/productsApi';
import { addToCart } from '../../redux/slices/cartSlice';

import { Loading } from '../../utils';
import Container from '../../components/container/Container';
import NotInFavorite from '../../components/not-in-favorite/NotInFavorite';

const { Meta } = Card;

const Favorite = () => {
  const dispatch = useDispatch();
  const [likedProducts, setLikedProducts] = useState([]);
  const { username } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetProductsQuery();
  const [like] = useLikeProductMutation();
  const [unlike] = useUnLikeProductMutation();

  const unlikeProduct = async (id) => {
    try {
      await unlike(id);
      notification.success({
        message: `You have unliked ${username}'s product!`,
      });
    } catch (error) {
      console.error("Error unliking the product:", error);
    }
  };

  useEffect(() => {
    if (data && data.payload) {
      const filteredProducts = data.payload.filter(product => product.likedby.includes(username));
      setLikedProducts(filteredProducts);
    }
  }, [data, username]);

  return (
    <div className='mt-8 flex flex-col gap-12'>
      <Container>
        <div className="mt-8">
          {
            likedProducts.length !== 0 && <h1 className="text-3xl font-semibold">Favorites</h1>
          }
          {isLoading ? (<Loading />) : (likedProducts.length === 0 ? (<NotInFavorite />) :
            <div className="max-w-[1400px] mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {likedProducts.map((product) => (
                <Card key={product._id} className="relative shadow-lg border rounded-lg" style={{ width: 300 }}>
                  
                  <button className="absolute top-2 right-2 text-xl text-red-700 transition">
                    <AiFillHeart onClick={() => unlikeProduct(product._id)} className='top-4 right-4 text-2xl text-red-600' />
                  </button>

                  <Link to={`/single-product/${product._id}`}>
                    <Carousel autoplay arrows dots={false}>
                      {product.product_images.map((image) => (
                        <img key={image} src={image} alt={product.product_name} className="h-60 object-cover rounded-t-lg" />
                      ))}
                    </Carousel>

                    <div className="p-4">
                      <h2 className="text-[17px] font-semibold">{product.product_name}</h2>

                      <div className="bg-yellow-100 text-yellow-600 mt-2 px-2 py-1 text-sm rounded-md">dan {product.sale_price} so'm/oyga</div>

                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-gray-400 line-through text-sm">{product.original_price}$</p>
                        <p className="text-red-500 font-semibold text-lg">{product.sale_price}$</p>
                      </div>
                    </div>
                  </Link>

                  <Button className="mt-4 w-full text-white bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 transition-colors py-2"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <AiOutlineShoppingCart className="mr-2" /> Savatga
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Favorite;