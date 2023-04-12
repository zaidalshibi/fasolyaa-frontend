import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import data from "../HomeSongs/data.json";
import { useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ( { handleReRender } ) => {
    const nav = useNavigate();
    const tracks = data.data;
    const [ trackIndex, setTrackIndex ] = useState( 0 );
    const [ trackProgress, setTrackProgress ] = useState( 0 );
    const [ isPlaying, setIsPlaying ] = useState( false );
    const waveformRef = useRef();

    useEffect( () => {
        if ( !waveformRef.current ) return;
        const wavesurfer = WaveSurfer.create( {
            container: waveformRef.current,
            waveColor: 'violet',
            progressColor: 'purple'
        } );
        wavesurfer.load( tracks[ trackIndex ].audioFile );
    }, [ trackIndex ] );



    const { title, author, audioFile } = tracks[ trackIndex ];

    const audioRef = useRef( new Audio( audioFile ) );
    const intervalRef = useRef();
    const isReady = useRef( false );
    const { duration } = audioRef.current;
    const currentPercentage = duration
        ? `${( trackProgress / duration ) * 100}%`
        : "0%";

    const handleDownload = () => {
        fetch( audioFile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/.mp3',
            },
        } ).then( ( response ) => {
            response.blob()
                .then( ( blob ) => {
                    const url = window.URL.createObjectURL(
                        new Blob( [ blob ] ),
                    );
                    const link = document.createElement( "a" );
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `${title} - ${author}.mp3`,
                    );
                    document.body.appendChild( link );
                    link.click();
                } );
        } ).catch( ( err ) => {
            console.log( err );
        } );
    };

    const handleLoop = () => {
        if ( audioRef.current.loop ) {
            audioRef.current.loop = false;
        } else {
            audioRef.current.loop = true;
        }
    };

    const startTimer = () => {
        clearInterval( intervalRef.current );
        intervalRef.current = setInterval( () => {
            if ( audioRef.current.ended ) {
                toNextTrack();
            } else {
                setTrackProgress( audioRef.current.currentTime );
            }
        }, [ 1000 ] );
    };

    const onScrub = ( value ) => {
        clearInterval( intervalRef.current );
        audioRef.current.currentTime = value;
        setTrackProgress( audioRef.current.currentTime );
    };

    const onScrubEnd = () => {
        if ( !isPlaying ) {
            setIsPlaying( true );
        }
        startTimer();
    };

    const toPrevTrack = () => {
        if ( trackIndex - 1 < 0 ) {
            setTrackIndex( tracks.length - 1 );
            nav( `/songs/${tracks[ tracks.length - 1 ].id}` );
            handleReRender();
        } else {
            setTrackIndex( trackIndex - 1 );
            nav( `/songs/${tracks[ trackIndex - 1 ].id}` );
            handleReRender();
        }
    };

    const toNextTrack = () => {
        if ( trackIndex < tracks.length - 1 ) {
            setTrackIndex( trackIndex + 1 );
            nav( `/songs/${tracks[ trackIndex + 1 ].id}` );
            handleReRender();
        } else {
            setTrackIndex( 0 );
            nav( `/songs/${tracks[ 0 ].id}` );
            handleReRender();
        }
    };

    useEffect( () => {
        if ( isPlaying ) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [ isPlaying ] );

    useEffect( () => {
        audioRef.current.pause();
        audioRef.current = new Audio( audioFile );
        setTrackProgress( audioRef.current.currentTime );
        if ( isReady.current ) {
            audioRef.current.play();
            setIsPlaying( true );
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [ trackIndex ] );

    useEffect( () => {
        return () => {
            audioRef.current.pause();
            clearInterval( intervalRef.current );
        };
    }, [] );

    return (
        <>
            <div className="audio-player">
                <div className="track-info">
                    <div ref={waveformRef}></div>
                    <AudioControls
                        isPlaying={isPlaying}
                        onPrevClick={toPrevTrack}
                        onNextClick={toNextTrack}
                        onPlayPauseClick={setIsPlaying}
                        onDownloadClick={handleDownload}
                        handleLoop={handleLoop}
                    />
                </div>
            </div>
        </>
    );
};

export default AudioPlayer;
