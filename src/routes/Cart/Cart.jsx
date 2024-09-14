import { useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import x from "../../images/x.svg";

import { addToCart, removeFromCart, calculateTotals, deleteCart } from '../../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const total = useSelector(state => state.cart.total) || 0;
  const shippingFee = 20;

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  return (
    <div className="flex flex-col items-end p-5 min-h-screen">
      <table className="w-full border-collapse mb-5">

        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-4 text-center border border-gray-300">Product</th>
            <th className="p-4 text-center border border-gray-300">Price</th>
            <th className="p-4 text-center border border-gray-300">Quantity</th>
            <th className="p-4 text-center border border-gray-300">Total</th>
            <th className="p-4 text-center border border-gray-300">Remove</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((product) => (
            <tr key={product._id} className="bg-white">

              <td className="p-4 flex items-center gap-2 justify-center border border-gray-300">
                <img src={product.product_images[0]} alt="" width="50" height="50" className="object-cover" />
                {product.name}
              </td>

              <td className="p-4 text-center border border-gray-300">${product.sale_price}</td>

              <td className="p-4 text-center border border-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => dispatch(removeFromCart(product))} className="flex items-center justify-center p-2 bg-gray-200 text-blue-400 rounded">
                    <AiOutlineMinus />
                  </button>
                  
                  <p className="text-lg">{product.quantity}</p>

                  <button onClick={() => dispatch(addToCart(product))} className="flex items-center justify-center p-2 bg-gray-200 text-blue-400 rounded">
                    <AiOutlinePlus />
                  </button>
                </div>
              </td>
              <td className="p-4 text-center border border-gray-300"> ${(product.sale_price * product.quantity).toFixed(2)} </td>

              <td className="p-4 text-center border border-gray-300">
                <button className="p-2 bg-red-100 rounded-full"> <img onClick={() => dispatch(deleteCart(product))} src={x} alt="Remove" /> </button>
              </td>

            </tr>
          ))}
        </tbody>
        
      </table>

      <div className="w-full max-w-xs bg-white p-5 rounded-lg shadow-lg mt-5 text-right">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-base text-gray-600">Subtotal</span>
          <span className="text-base text-blue-500">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-base text-gray-600">Shipping Fee</span>
          <span className="text-base text-blue-500">${shippingFee}</span>
        </div>
        <div className="flex justify-between py-2 font-bold text-lg">
          <span className="text-base text-gray-600">Total</span>
          <span className="text-blue-500">${(total + shippingFee).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;