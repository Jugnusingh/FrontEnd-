import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './YouTubeVideo.css';

function YouTubeVideo() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 5;
  const totalPages = Math.ceil(videos.length / videosPerPage);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCilEr1rW-SIrJlJ5_ioKQfw&maxResults=10&order=date&type=video&key=AIzaSyC0qv0Yo_jL1LRubYue4lScqyHTfor-eFc`
        );
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const renderVisibleVideos = () => {
    const startIndex = currentPage * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const visibleVideos = videos.slice(startIndex, endIndex);

    return visibleVideos.map((video) => (
      <div key={video.id.videoId} className="video-card">
        <div
          className="video-thumbnail"
          onClick={() =>
            window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')
          }
        >
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
        </div>
        <div className="video-details">
          <h3>{video.snippet.title}</h3>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="video-slider">{renderVisibleVideos()}</div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default YouTubeVideo;
