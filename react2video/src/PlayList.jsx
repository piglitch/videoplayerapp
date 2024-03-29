import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function PlayList({ src, setSrc, playlistItems, setPlaylistItems, videoItem, setVideoItem }) {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleVidPreview = (item, e) => {
    if (e.type === 'mouseover') {
      e.target.src = item.prev;
    } else if (e.type === 'mouseout') {
      e.target.src = item.thumbnail;
    }
  };
  

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    const draggedIndex = playlistItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = playlistItems.findIndex(item => item.id === targetItem.id);

    const newPlaylistItems = [...playlistItems];
    newPlaylistItems.splice(draggedIndex, 1);
    newPlaylistItems.splice(targetIndex, 0, draggedItem);

    setPlaylistItems(newPlaylistItems);
    setDraggedItem(null); // Reset draggedItem after drop
  };

  return (
    <div className="playlist pl-8">
      <h2 className='mt-4'>Now playing</h2>
      <div className="playlistcard my-4">
        <img
          src={videoItem.thumbnail}
          alt={videoItem.title}
          className="nowplaying h-24 w-44 rounded-md"
        />
        <span className="text-xs">{videoItem.title}</span>
      </div>
      <h2>Playlist</h2>
      <ul className="mt-2 mb-4">
        {playlistItems.map(item => (
          <li
            key={item.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, item)}
            className='playlistcard mt-2'
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              onClick={() => {
                setSrc(item.src);
                setVideoItem(item);
              }}
              onMouseOver={(e) => handleVidPreview(item, e)}
              onMouseOut={(e) => handleVidPreview(item, e)}
              className="h-24 w-44 cursor-pointer"
            />
            <span className="text-xs">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

PlayList.propTypes = {
  src: PropTypes.string,
  setSrc: PropTypes.func,
  playlistItems: PropTypes.array,
  setPlaylistItems: PropTypes.func,
  videoItem: PropTypes.object,
  setVideoItem: PropTypes.func,
};

export default PlayList;
