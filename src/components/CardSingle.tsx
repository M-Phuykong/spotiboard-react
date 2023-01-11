import * as React from 'react';

import { Palette } from 'color-thief-react';

type TopItem = SpotifyApi.ArtistObjectFull | SpotifyApi.TrackObjectFull

function CardSingle({ prop } : { prop : TopItem }) {

    function isArtist(item: TopItem){
        return (item as SpotifyApi.ArtistObjectFull).images !== undefined;
    }

    let data : any = []

    if (typeof prop != 'undefined') {

        if (isArtist(prop)) {
            data = (
                <div
                id="artist_card">
                    <Palette src={(prop as SpotifyApi.ArtistObjectFull).images[0].url}
                    crossOrigin="anonymous"
                    format="hex"
                    colorCount={2}>

                        {({ data, loading }) => {


                            if (loading) return <h1>Loading</h1>;

                            return (

                                <div
                                style = {{ background: data?.at(0)}}
                                className="
                                relative
                                top-0
                                transition ease-in duration-500
                                hover:-top-5
                                max-w-sm m-5
                                rounded-lg
                                dark:bg-gray-800 dark:border-gray-700
                                "
                                >

                                    <img className='
                                    h-96 max-h-96
                                    w-96 max-w-96
                                    object-cover
                                    rounded-t-lg'
                                    src={(prop as SpotifyApi.ArtistObjectFull).images[0].url}
                                    alt={prop.name}
                                    draggable="false"/>

                                    <div className="p-5">
                                        {/* Need to do stuff with this? */}
                                        <a href="#">
                                            <h5 style={{color : data?.at(1)}} className="mb-2 text-center text-2xl font-bold tracking-tight">
                                                {prop.name}
                                            </h5>
                                        </a>
                                    </div>

                                    <div
                                    className="
                                    px-6 pb-2
                                    text-center
                                    ">
                                        {(prop as SpotifyApi.ArtistObjectFull).genres
                                        .sort(function(a,b) {
                                            return a.length - b.length || a.localeCompare(b);
                                        })
                                        .slice(0,3).map((genre: string, ind: number) => {
                                            return (
                                                <span
                                                style = {{ background: data?.at(1),
                                                    color: data?.at(0)}}
                                                className="
                                                    inline-block
                                                    rounded-full
                                                    px-3 py-1
                                                    text-sm font-semibold
                                                    mr-2 mb-2"
                                                    key={ind}>
                                                    {genre}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    {/* <div>
                                        Palette:
                                        <ul>
                                            {data?.map((color, index) => (
                                            <li key={index} style={{ color: color }}>
                                                <strong>{color}</strong>
                                            </li>
                                            ))}
                                        </ul>
                                    </div> */}
                                </div>
                            );
                        }}
                    </Palette>
                </div>
                )
        }

        else {

            data = (
                <Palette src={(prop as SpotifyApi.TrackObjectFull).album.images[0].url}
                crossOrigin="anonymous"
                format="hex"
                colorCount={2}>

                    {({ data, loading }) => {


                        if (loading) return

                            <div
                            className="
                            w-32 h-full
                            "
                            >
                                Loading
                            </div>;

                        return (

                            <div
                            style = {{ background: data?.at(0), borderColor: data?.at(1)}}
                            className="
                            grid
                            border-2
                            w-full h-full
                            rounded-lg
                            "
                            >
                                <div className='flex min-w-full min-h-full'>

                                    <img className='
                                        w-auto h-auto
                                        max-h-24 max-w-24
                                        object-cover
                                        place-self-center
                                        p-2 px-2
                                        rounded-t-lg'
                                        src={(prop as SpotifyApi.TrackObjectFull).album.images[1].url}
                                        alt={prop.name}
                                        draggable="false"/>

                                    <div
                                    className="
                                    flex justify-center content-center flex-col
                                    noselect
                                    h-full w-48 text-center
                                    ">
                                        <h5 style={{color : data?.at(1)}}
                                        className="
                                        mt-3
                                        w-full
                                        overflow-hidden whitespace-nowrap text-ellipsis
                                        text-base font-bold
                                        ">
                                            {prop.name}
                                        </h5>
                                        <span
                                                style = {{ background: data?.at(1),
                                                    color: data?.at(0)}}
                                                className="
                                                    inline-block
                                                    w-fit
                                                    place-self-center
                                                    rounded-full
                                                    px-2 py-1 mt-2
                                                    text-sm font-semibold
                                                    mr-2 mb-2"
                                                    >
                                                    {(prop as SpotifyApi.TrackObjectFull).artists[0].name}
                                            </span>
                                    </div>

                                </div>



                            </div>
                        );
                    }}
                </Palette>
            )
        }

    }


    return (
        data
    );
}

export default CardSingle;