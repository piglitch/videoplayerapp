import { useState } from 'react';
import './App.scss'
import PlayList from './PlayList'
import VideoPlayer from './VideoPlayer'
import vid from './assets/video.mp4'
import vid1 from "./assets/video1.mp4";
import vid2 from "./assets/video2.mp4";
import vidGif from './assets/video.gif';
import vid1Gif from './assets/video1.gif';
import vid2Gif from './assets/video2.gif';
import vidThumb from './assets/vidThumbnail.jpeg';
import vidThumb1 from './assets/vidThumbnail1.png';
import vidThumb2 from './assets/vidThumbnail2.jpg';
import Navbar from './Navbar';

function App() {
  const array = [
    { 
      id: 1, 
      title: 'Comedian perfectly re-enacts slow motion goal celebrations', 
      src: vid, 
      prev: vidGif, 
      thumbnail: vidThumb,
    },
    { 
      id: 2, 
      title: 'Interior Crocodile Alligator', 
      src: vid1, 
      prev: vid1Gif, 
      thumbnail: vidThumb1,
    },
    { 
      id: 3, 
      title: 'Amad Diallo LATE Winner! | Manchester United 4-3 Liverpool | Quarter-final | Emirates FA Cup 2023-24', 
      src: vid2, 
      prev: vid2Gif, 
      thumbnail: vidThumb2,
    },
  ];
  const [playlistItems, setPlaylistItems] = useState(array);
  const [src, setSrc] = useState(playlistItems[0].src);
  const [videoItem, setVideoItem] = useState(playlistItems[0])
  return (
    <div>
      <Navbar playlistItems={playlistItems} setVideoItem={setVideoItem} />
      <div className='lg:flex lg:mt-2 lg:ml-16 lg:space-x-2'>
      <VideoPlayer 
        src={src} 
        setSrc={setSrc} 
        playlistItems={playlistItems} 
        videoItem={videoItem} 
        setVideoItem={setVideoItem}  
      />
      <PlayList 
        src={src} 
        setSrc={setSrc}  
        playlistItems={playlistItems}
        videoItem={videoItem} 
        setVideoItem={setVideoItem}
        setPlaylistItems={setPlaylistItems}
      />
    </div>
    </div>
  )
}

export default App
