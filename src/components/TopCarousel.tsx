import React, { useState, useEffect } from 'react';
import { SettingsHorizontal } from 'akar-icons';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Mousewheel, Keyboard, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import ArtistCardSingle from './ArtistCardSingle';

function TopCarousel({ items } : { items: SpotifyApi.ArtistObjectFull[] |
                                        SpotifyApi.AlbumObjectFull[]}) {

    // type guard
    function isArtist(item: SpotifyApi.ArtistObjectFull | SpotifyApi.AlbumObjectFull){
        return (item as SpotifyApi.ArtistObjectFull).images !== undefined;
    }

    let data : any = []
    if (typeof items !== 'undefined' && items.length > 0) {

        // the array is defined and has at least one element
        if (isArtist(items[0])){
            data = items.map((item : any, ind: number) => {
                    return (
                        <SwiperSlide
                        className="
                        flex
                        items-center
                        justify-items-center
                        "
                        key={ind}>
                            <ArtistCardSingle artist={item}></ArtistCardSingle>
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
    <div className="
    h-full
    bg-black
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
