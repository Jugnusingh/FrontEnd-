import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './YouTubeVideo.css'
const apiKey = '';
const channelId = '';

function YouTubeVideo() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const renderVideos = () => {
    const videoCount = videos.length;
  
    if (videoCount === 0) {
      return <p>Loading videos...</p>;
    }
  
    const duplicatedVideos = videos.concat(videos); // Duplicate the videos array
  
    return duplicatedVideos.map((video, index) => (
      <div
        key={video.id.videoId + '_duplicate_' + index}
        className="video-card"
        onClick={() =>
          window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')
        }
      >
        <div className="video-thumbnail">
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
        </div>
        <div className="video-details">
          <h3>{video.snippet.title}</h3>
        </div>
      </div>
    ));
  };
  return (
    <div className="video-slider">
      {videos.length > 0 ? (
        <div className="slider-content">{renderVideos()}</div>
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
}

export default YouTubeVideo;
