
import React from 'react';

const DownloadPage = ({ matchData }) => {
  console.log(matchData,"my yahoo")
  if (matchData === null) {
    return <div>Loading...</div>; // or any other loading state indicator
  }

  if (matchData.length === 0) {
    return <div>No matching products found.</div>;
  }

  return (
    <div>
      {matchData.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
};

export default DownloadPage;
