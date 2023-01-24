import axios from "axios"
export const BACKEND_URL = "https://spotify-dashboard-backend.herokuapp.com"
export const REDIRECT_URI =  "https://synthboard.onrender.com/home"

interface ITopParam {
    access_token: string | null,
    limit: number,
    time_range: string,
}

interface ITopAction{
    type : string
    value : string | number
}

type callback = (val : any) => void

export function isArtist(item: SpotifyApi.ArtistObjectFull | SpotifyApi.AlbumObjectFull | SpotifyApi.TrackObjectFull){
    return (item as SpotifyApi.ArtistObjectFull).images !== undefined;
}

export function getSpotifyTop(mode : string, params: ITopParam, callback : callback){

    axios.get(`${BACKEND_URL}/${mode}?`, { params: params})
        .then(res => {
            if (res.status === 200){
                callback(res.data.items);
            }
        })
        .catch(error => {
            console.log(error);
        } )
}

export function getSpotifyUser(params : ITopParam, callback : callback){
        axios.get(`${BACKEND_URL}/user?`, { params : params})
        .then(res => {
            if (res.status === 200){
                callback(res.data)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

export function reducer(state : ITopParam, action : ITopAction): ITopParam{

    switch (action.type){
        case "access_token":
            return {
                ...state,
                access_token : action.value as string}
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