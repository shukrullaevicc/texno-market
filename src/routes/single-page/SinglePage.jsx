import { AiFillPhone, AiFillCreditCard } from "react-icons/ai"; 
import { BsTelegram, BsCart4 } from "react-icons/bs"; 
import { MdOutlineShoppingCart } from "react-icons/md"; 
import { Carousel } from 'antd';

import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useGetProductDetailsQuery } from '../../redux/api/productsApi';

import Container from "../../components/container/Container";
import { Loading } from "../../utils";

const SinglePage = () => {
  const { id } = useParams();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { data: product, isLoading } = useGetProductDetailsQuery(id);
  const carousel = useRef(null);

  const handleImageClick = (index) => {
    setMainImageIndex(index);
  };

  useEffect(() => {
    if (carousel.current) {
      carousel.current.goTo(mainImageIndex, true);
    }
  }, [mainImageIndex]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      {product && (
        <div className="flex flex-col md:flex-row mt-5 gap-8">
          <div className="flex gap-5 flex-col">
            <div className='w-[500px] h-[500px] bg-gray-100 rounded-2xl'>
              {product.payload.product_images && (
                <Carousel ref={carousel}  arrows autoplay afterChange={(current) => setMainImageIndex(current)}>
                  {product.payload.product_images.map((img, index) => (<div key={index}> <img src={img} alt={`Main Product Image ${index + 1}`} className='w-full h-full object-cover rounded-2xl' /></div>))}
                </Carousel>
              )}
            </div>

            <div className="flex gap-3">
              {product.payload.product_images &&
                product.payload.product_images.map((img, index) => (
                  <div key={index} onClick={() => handleImageClick(index)} className={`w-24 h-24 p-2 bg-gray-100 rounded-xl cursor-pointer ${mainImageIndex === index ? "border-2 border-yellow-500" : ""}`}>
                    <img src={img} alt={`Product Image ${index + 1}`} className="w-full h-full object-contain" />
                  </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-semibold">{product.payload.product_name}</h1>

            <div className='flex items-center gap-7 mt-6'>
              <div>
                <p className='p-3 border-[1px] text-2xl border-gray-200 rounded-lg'>Brend</p>
              </div>
              <div className='flex gap-2 flex-col'>
                <div className='flex gap-2'>
                  <p className='text-gray-600 text-base'>Mahsulot brenddi:</p>
                  <span className='text-gray-400 text-base'>{product.payload.product_type}</span>
                </div>
                <div className='flex gap-2'>
                  <p className='text-gray-600 text-base'>Mahsulot kategoriyasi:</p>
                  <span className='text-orange-500 font-bold text-base'>#{product.payload._id}</span>
                </div>
              </div>
            </div>

            <div className='border-t-[1px] border-b-[1px] border-gray-200 mt-8'>
              <div className="flex items-end mt-6 gap-3">
                <p className="text-black font-semibold text-4xl">{product.payload.sale_price}$</p>
                <p className="text-gray-400 line-through font-semibold text-xl">{product.payload.original_price}$</p>
              </div>
              <div className='mb-6 mt-3'>
                <p className='text-xl font-bold   text-black'>dan 100 USD / Oylik to'lov</p>
              </div>
            </div>

            <div className="mt-8 border-b-[1px] border-gray-200">
              <div className="flex gap-4 justify-between items-center">
                <div className="flex items-center gap-4 p-4 border-[1px] rounded-lg bg-orange-600 text-white">
                  <MdOutlineShoppingCart className="text-2xl"/>              
                  <p className="text-lg font-bold">BUYURTMA QOLDIRISH</p>
                </div>
                <div className="flex items-center gap-4 p-4 border-[1px] rounded-lg bg-orange-600 text-white">
                  <BsCart4 className="text-3xl"/>
                  <p className="text-xl font-bold">SAVATGA QO'SHISH</p>
                </div>
              </div>
              <div className="p-4 border-[1px] rounded-lg flex items-center gap-4 justify-center mt-4 bg-red-600 text-white mb-8">
                <AiFillCreditCard className="text-2xl"/>
                <p className="text-lg font-bold">BO'LIB TO'LASH</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-center gap-2 mt-8">
                <p className="text-2xl font-bold">Yordam kerakmi?</p><span className="text-orange-500 text-2xl font-bold">Biz sizga yordam beramiz!</span>
              </div>
              <div>
                <div className="p-3 mt-4 border-[1px] rounded-lg border-blue-500 text-blue-500 flex justify-center items-center gap-4">
                  <BsTelegram className="text-3xl"/>
                  <p className="text-xl font-bold">Telegram orqali bog'lanish</p>
                </div>
                <div className="p-3 mt-4 border-[1px] rounded-lg border-green-500 text-green-500 flex justify-center items-center gap-4">
                  <AiFillPhone className="text-3xl"/>
                  <p className="text-xl font-bold">Telegram orqali bog'lanish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SinglePage;