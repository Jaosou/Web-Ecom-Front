import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './showProduct.css'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const ShowProduct = ({ children }) => {
    return (
        <div className='relative w-full h-full'>
            <div className=''>
                <Swiper
                    navigation={{
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    }}
                    slidesPerView={5}
                    spaceBetween={50}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 1,
                        },
                        470: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        660: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                        },
                        910: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper lg:py-[3.75rem]"
                >
                    {children}
                </Swiper>
            </div>
            <div className='button-next'>
                <ChevronRight className='text-xl' />
            </div>
            <div className='button-prev'>
                <ChevronLeft className='text-xl' />
            </div>
        </div>
    )
}

export default ShowProduct