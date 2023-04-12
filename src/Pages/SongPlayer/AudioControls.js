import React from "react";
import { ReactComponent as Play } from "./assets/play.svg";
import { ReactComponent as Pause } from "./assets/pause.svg";
import { ReactComponent as Next } from "./assets/next.svg";
import { ReactComponent as Prev } from "./assets/prev.svg";
import { ReactComponent as Download } from "./assets/download.svg";
import { ReactComponent as Loop } from "./assets/loop.svg";

const AudioControls = ( {
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
    onDownloadClick,
    handleLoop,
} ) => (
    <div className="audio-controls">
        <button
            type="button"
            className="download"
            aria-label="Download"
            onClick={onDownloadClick}
        >
            <Download />
        </button>
        <button
            type="button"
            className="prev"
            aria-label="Previous"
            onClick={onPrevClick}
        >
            <Next />
        </button>
        {isPlaying ? (
            <button
                type="button"
                className="pause"
                onClick={() => onPlayPauseClick( false )}
                aria-label="Pause"
            >
                <Pause />
            </button>
        ) : (
            <button
                type="button"
                className="play"
                onClick={() => onPlayPauseClick( true )}
                aria-label="Play"
            >
                <Play />
            </button>
        )}
        <button
            type="button"
            className="next"
            aria-label="Next"
            onClick={onNextClick}
        >
            <Prev />
        </button>
        <button
            type="button"
            className="loop"
            aria-label="Loop"
            onClick={handleLoop}
        >
            <Loop />
        </button>

    </div>
);

export default AudioControls;
