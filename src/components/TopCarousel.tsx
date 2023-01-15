import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Mousewheel, Keyboard, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Components
import CardSingle from './CardSingle';

// Helper
import { isArtist } from '../utils/helper';

function TopCarousel({ items } : { items: SpotifyApi.ArtistObjectFull[] |
                                        SpotifyApi.AlbumObjectFull[]}) {

    let data : any = []
    if (typeof items !== 'undefined' && items.length > 0) {

        // the array is defined and has at least one element
        if (isArtist(items[0])){
            data = items.map((item : any, ind: number) => {
                    return (
                        <SwiperSlide
                        className="
                        flex
                        min-h-full
                        items-center
                        justify-items-center
                        "
                        key={ind}>
                            <CardSingle prop={item}></CardSingle>
                        </SwiperSlide>
                    )})
        }
        else{
            data = items.map((item : any, ind: number) => {
                    return (
                        <SwiperSlide
                        className="
                        flex
                        items-center
                        justify-items-center
                        "
                        key={ind}>

                            <img src={item.album.images[0].url} alt="" />
                        </SwiperSlide>
                )})
        }
    }

    return (
    <div 
    draggable="false"
    className="
    h-full
    bg-transparent
    align-middle
    "
    id="top_carousel">

        <Swiper
            effect={"cards"}
            grabCursor={true}
            centeredSlides={true}
            keyboard={{
                enabled: true,
            }}
            mousewheel={true}
            modules={[Autoplay, Keyboard, Mousewheel, EffectCards]}
            rewind={true}
            // autoplay={{
            //     delay: 3500,
            //     disableOnInteraction: false
            // }}
            className="h-full w-3/5">

            {data}

        </Swiper>

    </div>
  );
}

export default TopCarousel;
