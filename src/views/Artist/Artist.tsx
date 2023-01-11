// Packages
import React, {useEffect, useState, useRef, useReducer} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { SettingsHorizontal } from 'akar-icons';

// StyleSheets
import "./Artist.scss"

// Hooks
import { useAuth } from "../../hooks/AuthContext";
import useOnClickOutside from '../../hooks/useOnClickOutside';

// Components
import TopCarousel from '../../components/TopCarousel';
import DropdownMenu from '../../components/DropDown';

interface UserTopDataInterface{
    limit: number,
    time_range: string,
}

interface ArtistReducerAction{
    type : string
    value : string | number
}

interface TimeRangeMapInterface{
    [key: string]: string
}

let time_range_map : TimeRangeMapInterface = {
    "short_term" : "<= 3 MONTHS",
    "medium_term" : "<= 6 MONTHS",
    "long_term" : " > 12 MONTHS"
}

function reducer(state : UserTopDataInterface, action : ArtistReducerAction): UserTopDataInterface{

    switch (action.type){
        case "limit":
            return {
                ...state,
                limit : action.value as number }
        case "time_range":
            return {
                ...state,
                time_range : action.value as string}
        default:
            throw new Error()
    }

}

const initialArtistParams  = {
    limit: 25,
    time_range: "medium_term"
}

const cookies = new Cookies()

function Artist(){

    const {access_token, setAccessToken} = useAuth();

    const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
    const [settingArtistOpen, setSettingArtistOpen] = useState<boolean>(false);
    const artistSettingRef = useRef(null);

    // use customize hook to turn off setting panel when click outside div
    //
    useOnClickOutside(artistSettingRef, () => setSettingArtistOpen(false))


    const [artistParams, dispatch] = useReducer(reducer, initialArtistParams);

    useEffect(() => {
        getTop("artist", artistParams)
    }, [artistParams]);

    useEffect(()  => {
        // need to check when the cookie expires
        if (access_token === null){
            setAccessToken(cookies.get("access_token"))
        }

        getTop("artist", artistParams)

    }, [access_token]);

    function getTop(mode: string, params: UserTopDataInterface){
        axios.get(`http://localhost:5000/${mode}?access_token=${access_token}`, { params: params})
        .then(res => {
            if (res.status === 200){
                setArtists(res.data.items);
            }
        })
    }


    return (
        <div
        className="
        flex
        h-auto w-full
        p-60
        mb-4
        items-stretch
        "
        id="top_artist"
        >
            <div
            className="
            w-7/12
            md:pl-32 xxl:pl-96
            text-5xl md:text-9xl
            text-white text-left
            "
            id="top_artist_text" >
                <p className="p-0">
                    MENG'S <br />
                    TOP <br />
                    {artistParams.limit} ARTISTS <br />
                    FROM {time_range_map[artistParams.time_range]}
                </p>
            </div>

            <div
            className="
            w-5/12
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