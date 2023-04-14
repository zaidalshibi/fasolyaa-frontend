import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import data from "../HomeSongs/data.json";
import song from "./assets/SoundHelix-Song-1.mp3";
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
        global.wavesurfer = WaveSurfer.create( {
            container: waveformRef.current,
            waveColor: '#ffae62',
            progressColor: '#fff',
            barWidth: 3,
            cursorWidth: 1,
            cursorHeight: 1,
            cursorColor: '#62c058',
            barHeight: 1,
            barGap: 5,
            responsive: true,
            barRadius: 3,
            cursorRadius: 3,
            hideScrollbar: true,
            normalize: true,
            height: 100,
            rtl: true,
        } );
        global.wavesurfer.load( song );
        global.wavesurfer.on( 'audioprocess', () => {
            setTrackProgress( global.wavesurfer.getCurrentTime() );
        } );
        global.wavesurfer.on( 'seek', () => {
            setTrackProgress( global.wavesurfer.getCurrentTime() );
        } );
        global.wavesurfer.on( 'finish', () => {
            toNextTrack();
        } );
        return () => global.wavesurfer.destroy();
    }, [ trackIndex ] );



    const { title, author } = tracks[ trackIndex ];

    const audioRef = useRef( new Audio( song ) );
    const intervalRef = useRef();
    const isReady = useRef( false );

    const handleDownload = () => {
        fetch( song, {
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
            global.wavesurfer.play();
            startTimer();
        } else {
            global.wavesurfer.pause();
        }
    }, [ isPlaying ] );

    useEffect( () => {
        global.wavesurfer.pause();
        audioRef.current = new Audio( song );
        setTrackProgress( audioRef.current.currentTime );
        if ( isReady.current ) {
            global.wavesurfer.play();
            setIsPlaying( true );
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [ trackIndex ] );

    useEffect( () => {
        return () => {
            global.wavesurfer.pause();
            clearInterval( intervalRef.current );
        };
    }, [] );

    return (
        <>
            <div className="audio-player">
                <div className="track-info">
                    <div ref={waveformRef}></div>
                    <div className="track-dur">
                    <p className='track-duration'>
                        {Math.floor( trackProgress / 60 )}:{parseInt( trackProgress ) % 60 < 10 ? '0' + parseInt( trackProgress ) % 60 : parseInt( trackProgress ) % 60}
                    </p>
                    <p className='track-full-duration'>
                        {Math.floor( audioRef.current.duration / 60 )}:{parseInt( audioRef.current.duration ) % 60 < 10 ? '0' + parseInt( audioRef.current.duration ) % 60 : parseInt( audioRef.current.duration ) % 60}
                    </p>
                    </div>
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
