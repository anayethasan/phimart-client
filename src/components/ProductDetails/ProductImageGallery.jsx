
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Thumbs } from 'swiper/modules';
import defaultImage from "../../assets/default_product.jpg";
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductImageGallery = ({images, ProductName}) => {
    const [thumbsSwiper] = useState(null);

    const displayImages = images.length > 0 ? images : [{ image: defaultImage }];
    return (
        <div className="rounded-lg border overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="product-main-slider"
      >
        {displayImages.map((imageObj, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square bg-base-100">
              <img
                src={imageObj.image}
                alt={ProductName}
                className="h-full w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    );
};

export default ProductImageGallery;