import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import "./categoriesdeals.css"
import DealCard1 from "./dealcard1";
import DealCard2 from "./dealcard2";
import DealCard3 from "./dealcard3";
import DealCard4 from "./dealcard4";

import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import rgram from '../../assets/creator/retail-gram.jpeg'
import beauty from '../../assets/creator/freepik-4.jpeg'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';




const CategoriesDeals = () => {

    
    return (

        <div className="bg-[#10194d] text-[#fff] h-[100vh]">
            
            <div className="catdeals grid">
                <div>
                    <p style={{fontSize: '3rem', color:'rgb(247 225 53 / var(--tw-text-opacity))'}}>Categories</p>
                    <div className="cat grid">
                        <div className="r grid">
                            <div className="bgimg1" id='first' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Retail</p>
                            </div>
                            <div className="bgimg1" id='second' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Beauty</p>
                            </div>
                            <div className="bgimg1" id='third' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Fitness</p>
                            </div>
                            <div className="bgimg1" id='fourth' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Men's</p>
                            </div>
                            <div className="bgimg1" id='fifth' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Women's</p>
                            </div>
                        </div>
                        <div className="r grid">
                        <div className="bgimg1" id='sixth' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Fashion</p>
                            </div>
                            <div className="bgimg1" id='seventh' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Babies</p>
                            </div>
                            <div className="bgimg1" id='eigth' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Health & Nutrition</p>
                            </div>
                            
                            <div className="bgimg1" id='ninth' style={{borderRadius: 100, maxWidth: 300, maxHeight: 100, borderColor:'rgb(247 225 53 / var(--tw-text-opacity))', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '2rem', textAlign: 'center', color: 'white'}}>Browse More...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p style={{fontSize: '3rem', color:'rgb(247 225 53 / var(--tw-text-opacity))'}}>Deals</p>
                   <div style={{maxWidth: 1200}}>
                   <div className="flex-container">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                          <SwiperSlide style={{minWidth:100}}>          
                        <DealCard1/>
                        </SwiperSlide >

                        <SwiperSlide style={{minWidth:100}}>          
                        <DealCard2/>
                        </SwiperSlide>

                        <SwiperSlide style={{minWidth:100}}>
                         <DealCard3/>
                        </SwiperSlide>

                        <SwiperSlide style={{minWidth:100}}>          
                        <DealCard4/>
                        </SwiperSlide>
                    </Swiper>
                    <div className="see-all-button">
                        <Link
                            to="/creator/participate" // Update this with the actual path you want to redirect to
                            className="bg-[#10163F] text-white md:text-xl text-lg font-normal px-5 py-3 rounded-lg w-full md:w-32 md:self-start self-center flex items-center justify-center"
                        >
                            See All
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            
    
    );
}

export default CategoriesDeals;





     