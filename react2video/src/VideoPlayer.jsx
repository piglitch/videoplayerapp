import { useState, useRef, useEffect } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PropTypes from 'prop-types';

const VideoPlayer = ({ src, setSrc, playlistItems, videoItem, setVideoItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Initial volume set to 100%
  const [currVol, setCurrVol] = useState(0);
  const videoRef = useRef(null);
  const videocontainer = useRef(null);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.code === 'Space') {
        // Toggle play/pause when Space key is pressed
        event.preventDefault();
        togglePlay();
      } else if (event.code === 'KeyF') {
        // Toggle fullscreen when F key is pressed
        toggleFullScreen();
      }
      else if (event.code === 'KeyL'){
        gotoNextVid();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [isPlaying]);

  const togglePlay = () => { 
    setIsPlaying(!isPlaying);
    console.log("Is playing:", !isPlaying);
    if (isPlaying) {
      videoRef.current.pause();
      console.log('pausing');
    } else {
      videoRef.current.play();
      console.log('playing');
    }
  };
  
  const toggleFullScreen = () => {
    const videoElement = videocontainer.current.querySelector('video');
    if (!document.fullscreenElement) {
      videoElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  const handlePlaybackSpeed = (rate) => {
    videoRef.current.playbackRate = rate;
  }

  const handleTimeUpdate = () => {
    setCurrentTime((videoRef.current.currentTime).toFixed(2));
    setDuration((videoRef.current.duration).toFixed(2));
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const volumeLevel = e.target.value;
    videoRef.current.volume = volumeLevel;
    setVolume(volumeLevel);
    setCurrVol(volumeLevel);
  };
  
  const handleMute = () => {
    if (volume==0) {
      videoRef.current.volume = 1;      
      return console.log(volume);
    }
    videoRef.current.volume = 0;
  }

  const gotoNextVid = () => {
    if (index === playlistItems.length - 1) {
      // Reset to the first video in the playlist
      setIndex(0);
      setVideoItem(playlistItems[0]);
      setSrc(playlistItems[0].src);
    } else {
      // Move to the next video in the playlist
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setVideoItem(playlistItems[nextIndex]);
      setSrc(playlistItems[nextIndex].src);
    }
  }

  return (
    <div className='video-container' ref={videocontainer}>
      {videoItem.src ? <video
        ref={videoRef}
        src={videoItem.src}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => gotoNextVid()} 
        onLoadedMetadata={() => {
          setDuration((videoRef.current.duration / 60).toFixed(2));
        }}       
      /> : <div>Loading...</div>
      }
      <div className='videocontroller h-14 pl-4 py-2 flex justify-start space-x-5 bg-teal-600'>
        <button className='text-xl my-auto' onClick={togglePlay}>{isPlaying ? <PauseIcon fontSize='large' /> : <PlayArrowIcon fontSize='large' />}</button>
        <button><SkipNextIcon fontSize='large' onClick={() => gotoNextVid()} /></button>
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleSeek}
          className='my-auto'
        />
        {duration > 0 && (
          <span className='w-28 my-auto text-sm'>{(currentTime / 60).toFixed(2)} / {(duration / 60).toFixed(2)}</span>
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className='my-auto'
        />
        {volume > 0 ? (
          <VolumeUpIcon className='cursor-pointer my-auto' onClick={()=> {
            setVolume(0);
            handleMute();
          }} />
        ) : (
          <VolumeOffIcon className='cursor-pointer my-auto' 
            onClick={() => {
              currVol==0 ? setVolume(1) : setVolume(currVol);
              handleMute()
              console.log(volume, currVol);
            }} />
        )}
        <select className='bg-transparent cursor-pointer my-auto' onChange={(e) => handlePlaybackSpeed(parseFloat(e.target.value))}>
          <option className='text-black' value="0.5">🐌</option>
          <option className='text-black' value="1" selected>1x</option>
          <option className='text-black' value="1.5">1.5x</option>
          <option className='text-black' value="2">2x</option>
        </select>
        <div className='my-auto' onClick={toggleFullScreen}>
          <span className='cursor-pointer' id='toggleFullScreen'><FullscreenIcon fontSize='large' /></span>
        </div>
      </div>      
      <div className='p-4 font-semibold text-lg bg-teal-500'>{videoItem.title}</div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string,
  setSrc: PropTypes.func,
  playlistItems: PropTypes.array,
  videoItem: PropTypes.object,
  setVideoItem: PropTypes.func,
}

export default VideoPlayer;
