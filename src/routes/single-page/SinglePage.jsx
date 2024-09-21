import { Carousel } from 'antd';

import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useGetProductDetailsQuery } from '../../redux/api/productsApi';

import Container from "../../components/container/Container";
import { Loading } from "../../utils";

const SinglePage = () => {
  const carousel = useRef(null);
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailsQuery(id);
  const [mainImageIndex, setMainImageIndex] = useState(0);

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
          <div className="flex gap-5">
            <div className="flex flex-col gap-3">
              {product.payload.product_images &&
                product.payload.product_images.map((img, index) => (
                  <div key={index} onClick={() => handleImageClick(index)} className={`w-24 h-24 p-2 bg-gray-100 rounded-xl cursor-pointer ${mainImageIndex === index ? "border-2 border-yellow-500" : ""}`}>
                    <img src={img} alt={`Product Image ${index + 1}`} className="w-full h-full object-contain" />
                  </div>
              ))}
            </div>

            <div className='w-[500px] h-[500px] bg-gray-100 rounded-2xl'>
              {product.payload.product_images && (
                <Carousel ref={carousel}  arrows autoplay afterChange={(current) => setMainImageIndex(current)}>
                  {product.payload.product_images.map((img, index) => (<div key={index}> <img src={img} alt={`Main Product Image ${index + 1}`} className='w-full h-full object-cover rounded-2xl' /></div>))}
                </Carousel>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <h1 className="text-3xl font-semibold">{product.payload.product_name}</h1>
            <div className="mt-3">
              <p className='text-gray-600 text-[17px]'>Price</p>
              <p className="text-red-500 font-semibold text-[28px]">{product.payload.sale_price}$</p>
              <p className="text-gray-400 line-through text-[15px]">{product.payload.original_price}$</p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SinglePage;