// import axios from "axios";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import data from "./data.json";
import "./Songs.css";
import Song from "./Song/Song";
import CategoryCard from "./CategoryCard/CategoryCard";

function Songs () {
    const [ songs, setSongs ] = useState( [] );
    const [ shuffle, setShuffle ] = useState( false );

    // blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    // const getSongs = async () => {
    //     await axios.get( "http://20.98.84.196:4000/api/v1/songs", {
    //         headers:
    //         {
    //             'x-admin': "g84y5n8tye34"
    //         }
    //     } ).then( ( response ) => {
    //         console.log( response );
    //         console.log( response.data );
    //         setSongs( response.data );
    //         return response.data;
    //     } ).catch( ( error ) => {
    //         console.log( error );
    //     } );
    // };

    const getSongs = async () => {
        setSongs( data.data );
        console.log( data.data );
    };

    // const handleSearch = async( e ) => {
    //     const searchValue = e.target.value;
    //     const allSongs = await getSongs();
    //     const filteredSongs = allSongs.filter( ( song ) => song.title.toLowerCase().includes( searchValue ) );
    //     setSongs( filteredSongs );
    // };

    const handleSearch = ( e ) => {
        const searchValue = e.target.value;
        const filteredSongs = data.data.filter( ( song ) => song.title.toLowerCase().includes( searchValue ) );
        setSongs( filteredSongs );
    };

    const handleShuffle = () => {
        const shuffleArrayOfSongs = songs.sort( () => Math.random() - 0.5 );
        console.log( shuffleArrayOfSongs );
        setSongs( shuffleArrayOfSongs );
        setShuffle( !shuffle );
    };

    useEffect( () => {
        getSongs();
    }, [] );

    return (
        <>
            <TopBar search={handleSearch} />
            <SideBar />
            <div className="songs">
                <CategoryCard num={songs?.length} shuffle={handleShuffle} />
                <div className="songs-card">
                    {songs?.length > 0 ? songs.map( ( song, idx ) => (
                        <>
                            <Song key={idx} id={song.id} image={song.coverImg} title={song.title} author={song.author} />
                            <div className="vl"></div>
                        </>
                    ) ) : <p>No songs found</p>}
                </div>
            </div>
        </>
    );
}

export default Songs;