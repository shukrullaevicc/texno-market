import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";

import { Card, Button, Carousel } from "antd";

import { addToCart } from "../../redux/slices/cartSlice";
import { deleteFavorite } from "../../redux/slices/favoriteSlice";

import Container from "../../components/container/Container";
import NotInFavorite from "../../components/not-in-favorite/NotInFavorite";

const { Meta } = Card;

const Favorites = () => {
  const favorite = useSelector((state) => state.favorite.favorite);
  const dispatch = useDispatch();

  return (
    <Container>
      <div className='mt-8 flex flex-col gap-12'>
        {
          favorite.length !== 0 ? (<h1 className="text-3xl font-semibold text-left">Favorites</h1>) : null
        }
        <div className="">
          {favorite.length === 0 ? (<NotInFavorite /> ) : (
            <div className="max-w-[1400px] mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favorite.map((product) => (
                <Card key={product._id} className="relative shadow-lg border rounded-lg" style={{ width: 300 }}>
                  <button className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-600 transition" onClick={() => dispatch(deleteFavorite(product))}>
                    <AiFillHeart />
                  </button>

                  <Carousel autoplay arrows dots={false}>
                    {product.product_images.map((image) => (<img key={image} src={image} alt={product.product_name}className="h-60 object-cover rounded-t-lg"/>))}
                  </Carousel>

                  <div className="p-4">
                    <h2 className="text-[17px] font-semibold">{product.product_name}</h2>
                    <div className="bg-yellow-100 text-yellow-600 mt-2 px-2 py-1 text-sm rounded-md">
                      dan {product.sale_price.toLocaleString()} so'm/oyga
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-gray-400 line-through text-sm">
                        {product.original_price.toLocaleString()} so'm
                      </p>
                      <p className="text-red-500 font-semibold text-lg">
                        {product.sale_price.toLocaleString()} so'm
                      </p>
                    </div>

                    <Button
                      className="mt-4 w-full text-white bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 transition-colors py-2"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      <AiOutlineShoppingCart className="mr-2" />
                      Savatga
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Favorites;
