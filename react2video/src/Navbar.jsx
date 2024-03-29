import { useState } from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = ({ playlistItems, setVideoItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    // Filter playlist items based on search query
    const filteredItems = playlistItems.filter(item =>
      item.title.toLowerCase().includes(query)
    );
    // Update search results
    setSearchResults(filteredItems);
  };

  const handleFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    // Delay hiding results to allow click events to occur
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <nav className="navbar flex justify-around bg-teal-600 p-4 text-black space-x-1">
      <div 
        className='md:ml-10 max-w-max my-auto text cursor-pointer font-extrabold text-xl' 
        onClick={() => {window.location.reload()}}>
          Play Da Clip
      </div>
      <div className="container my-auto mx-auto relative max-w-96">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
        />
        {showResults && (
          <div className="absolute top-full left-0 bg-white shadow-md z-10 max-w-96">
            {searchResults.map((item, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setVideoItem(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='my-auto md:mr-20'><a href="https://github.com/piglitch" target="_blank" rel="noopener noreferrer"><GitHubIcon fontSize='large' /></a></div>
    </nav>
  );
};

Navbar.propTypes = {
  playlistItems: PropTypes.array.isRequired,
  setVideoItem: PropTypes.func.isRequired,
};

export default Navbar;
