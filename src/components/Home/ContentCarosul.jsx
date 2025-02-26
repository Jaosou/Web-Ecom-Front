import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const ContentCarosul = () => {
    //Todo : Wrong infitine loop
    const [data, setData] = useState([])

    useEffect(() => {
        hdlGetImages()
    }, [])

    const hdlGetImages = async () => {
        await axios.get('https://picsum.photos/v2/list?page=1&limit=15')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }

    return (
        <div className='h-7/20'>
            <div className='h-full'>
                <Swiper pagination={true}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper mb-6 h-80 rounded-lg"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}>
                    {
                        data?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <img src={item.download_url} alt="" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <Swiper
                    navigation={{
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    }}
                    slidesPerView={3}
                    spaceBetween={10}
                    pagination={true}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper object-cover rounded-lg relative"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}>
                    {
                        data?.map((item, index) => (
                            <SwiperSlide className='flex justify-center' key={index}>
                                <img className='w-10/12 h-4/5  rounded-lg' src={item.download_url} alt="" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="button-next top-[59%] right-[15%] absolute z-10 rounded-2xl grid place-items-center text-white bg-black h-10 w-10">
                <ChevronRight className='text-xl' />
            </div>
            <div className="button-prev top-[59%] left-[15%] absolute z-10 rounded-2xl grid place-items-center text-white bg-black h-10 w-10">
                <ChevronLeft className='text-xl' />
            </div>
        </div>
    )
}

export default ContentCarosul