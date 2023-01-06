import * as React from 'react';

import { Palette } from 'color-thief-react';

import './ArtistCardSingle.scss'

function ArtistCardSingle({ artist } : { artist : SpotifyApi.ArtistObjectFull}) {

    return (

        <div
        className="
        relative
        top-0
        transition ease-in duration-500
        hover:-top-5
        "
        id="artist_card">
            <Palette src={artist.images[0].url} crossOrigin="anonymous"
            format="hex"
            colorCount={2}>

                {({ data, loading }) => {


                    if (loading) return <h1>Loading</h1>;

                    return (

                        <div
                        style = {{ background: data?.at(0)}}
                        className="
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
                            src={artist.images[0].url}
                            alt={artist.name}/>

                            <div className="p-5">
                                {/* Need to do stuff this? */}
                                <a href="#">
                                    <h5 style={{color : data?.at(1)}} className="mb-2 text-center text-2xl font-bold tracking-tight">
                                        {artist.name}
                                    </h5>
                                </a>
                            </div>

                            <div
                            className="
                            px-6 pb-2
                            text-center
                            ">
                                {artist.genres
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
    );
}

export default ArtistCardSingle;