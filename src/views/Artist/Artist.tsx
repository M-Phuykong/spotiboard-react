// Packages
import React, {useEffect, useState, useRef, useReducer} from 'react';
import Cookies from 'universal-cookie';
import { SettingsHorizontal } from 'akar-icons';

// StyleSheets
import "./Artist.scss"

// Hooks
import { useAuth } from "../../hooks/AuthContext";
import useOnClickOutside from '../../hooks/useOnClickOutside';

// Helper
import { getSpotifyTop, getSpotifyUser, reducer } from '../../utils/helper';

// Components
import TopCarousel from '../../components/TopCarousel';
import DropdownMenu from '../../components/DropDown';


interface ITimeRangeMap{
    [key: string]: string
}

let time_range_map : ITimeRangeMap = {
    "short_term" : "<= 3 MONTHS",
    "medium_term" : "<= 6 MONTHS",
    "long_term" : " > 12 MONTHS"
}


const cookies = new Cookies()

function Artist(){

    const {access_token, setAccessToken} = useAuth();

    const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
    const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>();

    const [settingArtistOpen, setSettingArtistOpen] = useState<boolean>(false);
    const artistSettingRef = useRef(null);

    // use customize hook to turn off setting panel when click outside div
    //
    useOnClickOutside(artistSettingRef, () => setSettingArtistOpen(false))

    const initialArtistParams  = {
        access_token: access_token,
        limit: 25,
        time_range: "medium_term"
    }

    const [artistParams, dispatch] = useReducer(reducer, initialArtistParams);

    useEffect(() => {
        
        getSpotifyTop("artist", artistParams, (val) => {
            setArtists(val);
        } )

        getSpotifyUser(artistParams, (val) => {
            setUser(val)
        })

    }, [artistParams]);

    useEffect(()  => {
        
        if (access_token){

            dispatch({type : "access_token", value : access_token})
            
            // console.log("access token not null")
        }
        else {
            // need to check when the cookie expires
            const cur_access_token = cookies.get("access_token")
            
            // Cookie is still valid
            //
            if (cur_access_token){

                dispatch({type : "access_token", value : cur_access_token})
                setAccessToken(cur_access_token)

            } else {

                console.log(access_token, "cookies expired")
            }
        }

    }, [access_token]);
    return (
        <div
        className="
        before:fixed before:w-full before:h-full before:top-0 before:left-0 before:blur-[3px] before:-z-20
        flex
        min-h-full h-full
        w-full
        p-56
        items-stretch
        "
        id="top_artist"
        >   

            <div
            className="
            w-7/12
            md:pl-32 xxl:pl-96
            text-xl md:text-8xl
            text-white text-left
            "
            id="top_artist_text" >
                <h1
                data-text = {`
                    ${user?.display_name}'S TOP ${artistParams.limit} ARTISTS FROM ${time_range_map[artistParams.time_range]}`}

                className={"noselect relative block text-[110px] text-left font-bold uppercase " + (user ? "afa" : "hide")}
                id="artist_text">
                    {user?.display_name}'S TOP {artistParams.limit} ARTISTS FROM {time_range_map[artistParams.time_range]}
                </h1>
            </div>

            <div
            className="
            w-5/12
            h-max
            md:mr-32 xxl:mr-64
            "
            id="top_artist_carousel">

                <TopCarousel items={artists}></TopCarousel>

                <div
                ref={artistSettingRef}
                className="
                relative
                float-right
                right-10
                "
                id='configure_setting'>
                    <button

                    className="
                    opacity-75
                    hover:opacity-100 hover:scale-105
                    "
                    onClick={() => setSettingArtistOpen(!settingArtistOpen)}>

                        <SettingsHorizontal strokeWidth={2} size={34} style={{color: 'white'}}/>
                    </button>

                    <div  className={settingArtistOpen ? "active" : "hide"}>
                        <DropdownMenu
                        callback={(key: string, val: string | number) => {dispatch({type : key, value : val})}}></DropdownMenu>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Artist;