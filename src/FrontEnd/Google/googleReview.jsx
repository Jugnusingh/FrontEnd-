import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GoogleReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=CW-j3RK-e_6FEBM&fields=name,rating,reviews&key=AIzaSyC0qv0Yo_jL1LRubYue4lScqyHTfor-eFc`
      );
      setReviews(response.data.result.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.author_name}>
            <h3>{review.author_name}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleReviews;
