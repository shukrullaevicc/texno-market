import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { addToCart, removeFromCart, calculateTotals, deleteCart } from '../../redux/slices/cartSlice';

import x from "../../images/x.svg";

import NotInCart from '../../components/not-in-cart/NotInCart';
import Container from '../../components/container/Container';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const total = useSelector(state => state.cart.total) || 0;

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  if (cart.length === 0) {
    return <NotInCart />;
  }

  return (
    <Container>
      <div className="flex flex-col lg:flex-row justify-between p-5">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-5">Savat</h1>
          <div className="bg-white rounded-lg p-5">
            {cart.map((product) => (
              <div key={product._id} className="flex justify-between gap-8 items-center border-b border-gray-200 py-4">
                <div className="flex items-center gap-4">
                  <img src={product.product_images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-500">Narx: {product.sale_price.toLocaleString()}$</p>
                    <p className="text-gray-500">Yetkazib berish muddati: Tashkent bo'ylab 24 soat ichida</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => dispatch(removeFromCart(product))} className="p-2 bg-gray-200 rounded">
                    <AiOutlineMinus />
                  </button>

                  <span className="text-lg">{product.quantity}</span>
                  
                  <button onClick={() => dispatch(addToCart(product))} className="p-2 bg-gray-200 rounded">
                    <AiOutlinePlus />
                  </button>
                </div>

                <div className="text-lg font-semibold">
                  {(product.sale_price * product.quantity).toLocaleString()}$
                </div>

                <button onClick={() => dispatch(deleteCart(product))} className="p-2 bg-gray-100 rounded-full">
                  <img src={x} alt="Remove" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 mt-10">
          <div className="rounded-lg bg-gray-100 p-5">
            <h2 className="text-2xl font-bold mb-5">Jami</h2>

            <div className="flex justify-between text-lg mb-3">
              <span>Tovarlar soni</span>
              <span>{cart.length} dona</span>
            </div>

            <div className="flex justify-between text-lg mb-3">
              <span>Yetkazib berish</span>
              <span className="text-green-500">Bepul</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Jami</span>
              <span>{total.toLocaleString()}$</span>
            </div>

            <button className="bg-yellow-400 text-white w-full py-3 mt-5 rounded-lg text-lg font-bold">
              Muddatsiz to'lovga olish
            </button>

            <button className="bg-white border border-gray-300 text-black w-full py-3 mt-3 rounded-lg text-lg">
              Karta orqali sotib olish
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;