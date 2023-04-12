import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import data from "../HomeSongs/data.json";
import { ReactComponent as Heart } from "../../assets/svg/heart.svg";
import { ReactComponent as Share } from "../../assets/svg/share.svg";
import { ReactComponent as Info } from "../../assets/svg/info.svg";
import { ReactComponent as AddList } from "../../assets/svg/addList.svg";
import "./SongPlayer.css";
import AudioPlayer from "./AudioPlayer";

function SongPlayer () {
    const [ song, setSong ] = useState( {} );
    const [ songs, setSongs ] = useState( [] );
    const [ reRender, setReRender ] = useState( false );
    const id = useParams().id;

    // blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    /* const getSongs = async () => {
        await axios.get( "http://20.98.84.196:4000/api/v1/songs", {
            headers:
            {
                'x-admin': "g84y5n8tye34"
            }
        } ).then( ( response ) => {
            console.log( response );
            console.log( response.data );
            setSongs( response.data );
        } ).catch( ( error ) => {
            console.log( error );
        } );
    }; */

    const getSongs = () => {
        const song = data.data.find( ( song ) => song.id === id );
        setSong( song );
        setSongs( data.data );
    };

    useEffect( () => {
        getSongs();
    }, [reRender] );

    return (
        <>
            <TopBar disabled={true}/>
            <SideBar />
            <div className="song-player">
                <div className='song-image'>
                    <img src={song.coverImg} alt={song.title} />
                </div>
                <div className='icons'>
                    <Heart />
                    <Share />
                    <Info />
                    <AddList />
                </div>
                <div className='song-info'>
                    <h2>{song.title}</h2>
                    <h3>{song.author}</h3>
                </div>
                <div className='song-player-play'>
                    <AudioPlayer
                        tracks={songs}
                        handleReRender={() => setReRender( !reRender )}
                    />
                </div>
            </div>
        </>
    );
}

export default SongPlayer;